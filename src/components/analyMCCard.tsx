import { BarChart } from "@tremor/react";
import { Card } from "@tremor/react";
import { useEffect } from "react";

export default function AnalyticalMCCard({
  question,
  answers,
}: {
  question: string;
  answers: Record<string, number>;
}) {
  const chartdata = Object.entries(answers).map(([name, questions]) => ({
    name: name,
    [question]: questions,
  }));

  return (
    <div>
      <Card>
        <BarChart
          data={chartdata}
          index="name"
          categories={[question]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </Card>
    </div>
  );
}

const dataFormatter = (number: number) =>
  Intl.NumberFormat("eu").format(number).toString();
