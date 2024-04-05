"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { createPortal } from "react-dom";
import { Question } from "@/types/questions";
import {
  DraggablePackage,
  DraggablePackageOverlay,
} from "./draggable-questions";

interface SortablePackagesProps {
  questions: Question[];
  onChange?: (questions: Question[]) => void;
  onEditQuestion?: (q: Question) => void;
  id: string;
}

export function getLocalQuestionId(p: Question): UniqueIdentifier {
  return `${p.title}-${p.createdAt}`;
}

export default function SortablePackages({
  questions,
  onChange,
  onEditQuestion,
  id,
}: SortablePackagesProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activePackage, setActivePackage] = useState<Question>();

  function handleDragStart(event: DragStartEvent) {
    const active = questions.find(
      (elem) => getLocalQuestionId(elem) === event.active.id
    );
    if (!active) return;

    setActivePackage(active);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over?.id) return;

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex(
        (elem) => getLocalQuestionId(elem) === active.id
      );
      const newIndex = questions.findIndex(
        (elem) => getLocalQuestionId(elem) === over.id
      );

      const updatedPackages = arrayMove(questions, oldIndex, newIndex).map(
        (elem, index) => ({
          ...elem,
          index,
        })
      );

      onChange?.(updatedPackages);
    }

    setActivePackage(undefined);
  }

  if ((questions ?? []).length === 0) return null;

  return (
    <div className="flex flex-col gap-y-4">
      <DndContext
        id={id}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions.map(getLocalQuestionId)}
          strategy={verticalListSortingStrategy}
        >
          {questions.map((pkg) => (
            <DraggablePackage
              item={pkg}
              key={getLocalQuestionId(pkg)}
              onEdit={() => {
                onEditQuestion?.(pkg);
              }}
            />
          ))}
          {hasMounted &&
            createPortal(
              <DragOverlay adjustScale={false}>
                {activePackage && (
                  <DraggablePackageOverlay item={activePackage} />
                )}
              </DragOverlay>,
              document.body
            )}
        </SortableContext>
      </DndContext>
    </div>
  );
}
