"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchForm() {
   const [searchInput, setSearchInput] = useState<string>("");
   const router = useRouter();
   return (
         <form
            action=""
            className="bg-white rounded-lg"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
               e.preventDefault();
               if (!searchInput) {
                  return;
               }
               router.push("/pages/search/" + searchInput);
            }}
         >
            <input
               type="text"
               style = {{width: "calc(100% - 110px)"}}
               className="md:w-[40%] rounded-s-lg rounded-e-none outline outline-color1 outline-[0.4px] px-[8px]   "
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="w-[110px] rounded-s-none outline outline-color1 outline-[0.4px] rounded-e-lg px-[8px] ">
               search
            </button>
         </form>
   );
}

export default SearchForm;
