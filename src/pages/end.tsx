import Banner from "@/components/Banner";
import { Button, TextInput, Textarea } from "@tremor/react";

export default function end() {
  return (
    <main>
      <Banner title="Vielen Dank!"></Banner>
      <div className="m-10 justify-items-center">
        {/*
        TODO: Submit Data and show a thank you message
        */}
        <p className="text-xl m-2">
          Would you like to receive information about projects in your
          neighborhood?
        </p>
        <div className="content-center">
          <div className="m-8">
            <label
              htmlFor="email"
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            >
              Your email
            </label>
            <TextInput name="email" placeholder="muster@mann.de" />
            <label
              htmlFor="postcode"
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            >
              Your postcode
            </label>
            <TextInput name="postcode" placeholder="12345" />
            <input name="question" hidden readOnly></input>
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
