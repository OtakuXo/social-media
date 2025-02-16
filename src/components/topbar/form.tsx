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
        console.log(searchInput);
        router.push("/pages/search/" + searchInput);
      }}
    >
      <input
        type="text"
        className="rounded-s-lg rounded-e-none outline outline-color1 outline-[0.4px] px-[8px]   "
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <input
        type="submit"
        value={"search"}
        className="rounded-s-none rounded-e-lg outline outline-color1 outline-[0.4px] px-[8px] "
      />
    </form>
  );
}

export default SearchForm;
