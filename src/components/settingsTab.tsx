import { Button } from "@tremor/react";

export default function SettingsTab() {
  return (
    <div>
      <h1 className="text-red-600 font-bold">Danger Zone</h1>
      <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        This action cannot be undone. This will permanently delete the campaign.
      </p>
      <Button color="red" className="mt-4">
        Delete
      </Button>
    </div>
  );
}
