import { QuestionText } from "@/types/questions";
import { Card } from "@tremor/react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AnalyticalTextCard({
  question,
}: {
  question: QuestionText;
}) {
  return (
    <div>
      <p className="my-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
        Manage your personal details, workspace governance and notifications.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <Card className="group">
          <div className="flex items-center space-x-4">
            <p className=" text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content-strong">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              commodi iusto atque, nihil dolore reiciendis necessitatibus,
              quaerat, enim provident molestias eaque totam illum est quos
              officia corrupti! Error, voluptate illum.
            </p>
          </div>
        </Card>
        <Card className="group">
          <div className="flex items-center space-x-4">
            <p className=" text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content-strong">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              commodi iusto atque, nihil dolore reiciendis necessitatibus,
              quaerat, enim provident molestias eaque totam illum est quos
              officia corrupti! Error, voluptate illum.
            </p>
          </div>
        </Card>
        <Card className="group">
          <div className="flex items-center space-x-4">
            <p className=" text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content-strong">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              commodi iusto atque, nihil
            </p>
          </div>
        </Card>
        <Card className="group">
          <div className="flex items-center space-x-4">
            <p className=" text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content-strong">
              Lorem ipsum dolor
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
