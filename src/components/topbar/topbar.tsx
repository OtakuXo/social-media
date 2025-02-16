import Link from "next/link";
import React from "react";
import SearchForm from "./form";
import Avatatr from "../post/avatar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const topbarItems = [
  { link: "/api/auth/signin", text: "Sign in" },
  { link: "/pages/auth/signup", text: "Sign up" },
];

async function Topbar() {
   const session = await getServerSession(options)
   if (!session)return
  return (
    <nav className="bg-color2 sticky top-0 z-10 w-full py-[8px] px-[40px] flex justify-between items-center">
      {/* left */}
      <Link href={"/pages/profile/" + session?.user.id}>
        <Avatatr userId={session?.user.id} width="60px" height="60px" />
      </Link>

      {/* middle */}
      <div>
        <SearchForm />
      </div>
      {/* right */}
      <div>
        <ul className="flex justify-around gap-[16px] ">
          {topbarItems.map((items, index) => {
            return (
              <li key={index}>
                <Link href={items.link}>{items.text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;
