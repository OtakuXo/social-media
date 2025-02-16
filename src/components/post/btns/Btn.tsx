"use client";
import React from "react";
import { TButton } from "@/type";

function Btn({ active, btnText, fn }: TButton) {
  return (
    <button
      className={`${
        active ? "text-blue-400" : ""
      } w-full hover:bg-background font-bold p-[4px] `}
      onClick={fn}
    >
      {btnText}
    </button>
  );
}

export default Btn;
