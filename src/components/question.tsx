import { Question } from "@/types/questions";
import { PlusIcon } from "@heroicons/react/16/solid";
import { TextInput } from "@tremor/react";
import { clsx } from "clsx";
import { useState } from "react";

import { useDebouncedCallback } from "use-debounce";

interface QuestionProps {
  className?: string;
  question: Question;
  children?: React.ReactNode;
  onChange: (question: Question) => void;
  index: number;
}

export default function QuestionBlock({
  className,
  question,
  onChange,
  index,
}: QuestionProps) {
  console.log({ question });

  const [options, setOptions] = useState(
    question.type === "single-select" ? question.options ?? [] : []
  );

  function addOption() {
    setOptions([...options, { value: "" }]);
  }

  function handleChangeOption(index: number, value: string) {
    const updated = options.map((option, i) =>
      i === index ? { value } : option
    );

    setOptions(updated);
    onChange({ ...question, type: "single-select", options: updated });
  }

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      console.log(value);
      onChange({ ...question, question: value });
    },
    700
  );

  return (
    <div
      className={clsx(
        "items-strech flex flex-col rounded-lg border gap-px border-tremor-border",
        className
      )}
    >
      <TextInput
        name={`question/${question.createdAt}/title/${index}`}
        defaultValue={question.question}
        placeholder="Enter your question"
        className={clsx(
          "bg-none ",
          question.type === "single-select" &&
            "rounded-b-none border-l-0 border-r-0 border-t-0 !border-b-tremor-border"
        )}
        onValueChange={(value) => debounced(value)}
      />
      {options.map((option, index) => (
        <TextInput
          key={index}
          name={`question/${question.createdAt}/option/${index}`}
          defaultValue={option.value}
          placeholder="Enter an option"
          className="shadow-none bg-none rounded-none border-none"
          onValueChange={(value) => handleChangeOption(index, value)}
        />
      ))}
      {question.type === "single-select" && (
        <button
          className="w-full flex gap-2 items-center justify-center text-tremor-default pr-3 pl-3 py-2 hover:bg-tremor-background-muted rounded-b-tremor-default"
          type="button"
          onClick={addOption}
        >
          <PlusIcon className="w-4 h-4" /> Add option
        </button>
      )}
    </div>
  );
}
