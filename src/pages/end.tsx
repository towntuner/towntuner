import Banner from "@/components/Banner";
import { Button, TextInput, Textarea } from "@tremor/react";
import Image from "next/image";

export default function end() {
  return (
    <main>
      <Banner title="Vielen Dank!"></Banner>
      <div className="grid justify-items-center">
        <div className="grid justify-items-center p-5 my-5 bg-green-200 rounded-md">
          <p className="text-xl ">
            Thank you for participating in our survey! Your feedback is
            important to us.
          </p>
          <p className="text-l m-5 text-green-500">
            ✅ Your answers are saved and will be used to improve the project.
          </p>
          <Image alt="log" src="/logo.png" width={100} height={100} />
        </div>
      </div>
      <div className="grid justify-items-center">
        {/*
        TODO: Submit Data and show a thank you message
        */}

        <div className="content-center p-5 my-5 bg-blue-200 rounded-md w-">
          <p className="text-xl m-2 mx-10">
            Would you like to receive information about projects in your area?
          </p>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="email"
                className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
              >
                Your email
              </label>
              <TextInput name="email" placeholder="muster@mann.de" />
            </div>
            <div>
              <label
                htmlFor="postcode"
                className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
              >
                Your postcode
              </label>
              <TextInput name="postcode" placeholder="12345" />
            </div>
            <div className="flex items-end justify-end">
              <input name="question" hidden readOnly></input>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
