"use client";
import React, { useState } from "react";
import { TOption } from "@/type";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";

function Dropdown({ options }: { options: TOption[] }) {
   const [display, setDisplay] = useState<string>("hidden")
   return (
      <section className="relative inline-block">
         <button onClick={() => { display === "hidden" ? setDisplay("block") : setDisplay("hidden") }}><SlOptionsVertical /></button>
         <ul className={`${display} absolute  py-[12px] left-[-8px] w-[200px] bg-color1 rounded-md`}>
            {options.map((item, index) => {
               console.log(item)
               return (
                  <li key={index} className="hover:bg-color2 py-[4px] cursor-pointer">
                     <Link href={item.src} className="p-[12px]">{item.text}</Link>
                  </li>
               )
            })}

         </ul>
      </section>
   );
}

export default Dropdown;
