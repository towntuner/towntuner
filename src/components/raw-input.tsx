// Tremor Raw Input [v0.0.0]

import React from "react";
import { RiEyeFill, RiEyeOffFill, RiSearchLine } from "@remixicon/react";
import { tv, type VariantProps } from "tailwind-variants";

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export const focusInput =
  "focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:dark:ring-blue-700/50 focus:dark:border-blue-700";

export const focusRing = [
  // base
  "outline outline-blue-500 outline-offset-2 outline-0",
  // dark
  "dark:outline-blue-500",
  // focus-visible
  "focus-visible:outline-2",
];

export const hasErrorInput =
  "border-red-500 ring-2 ring-red-200 dark:border-red-500 dark:ring-red-400/20";

const inputStyles = tv({
  base: [
    // base
    "relative block w-full appearance-none rounded-md border px-2.5 py-1.5 shadow-sm outline-none sm:text-3xl font-semibold font-sans",
    // border color
    "border-tremor-border dark:border-gray-800",
    // text color
    "text-gray-900 dark:text-gray-50",
    // placeholder color
    "placeholder-gray-400 dark:placeholder-gray-500",
    // background color
    "bg-white dark:bg-gray-950",
    // disabled
    "disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
    "disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500",
    // focus
    focusInput,
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
    // remove search cancel button (optional)
    "[&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
    "hover:bg-tremor-background-muted transition duration-100",
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
    // number input
    enableStepper: {
      true: "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    },
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, hasError, enableStepper, ...props }: InputProps,
    forwardedRef
  ) => {
    return (
      <input
        ref={forwardedRef}
        type="text"
        className={cx(inputStyles({ hasError, enableStepper }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export {
  Input as RawInput,
  inputStyles as rawInputStyles,
  type InputProps as RawInputProps,
};
