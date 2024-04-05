import { Card } from "@tremor/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AnalyticsTab() {
  return (
    <div>
      <div>
        <Card>
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Einwände
          </p>
          <div className="mt-2 flex items-baseline space-x-2.5">
            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              14,036
            </p>
            <span
              className={classNames(
                "positive" == "positive"
                  ? "text-emerald-700 dark:text-emerald-500"
                  : "text-red-700 dark:text-red-500",
                "text-tremor-default font-medium"
              )}
            >
              +12,3%
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
