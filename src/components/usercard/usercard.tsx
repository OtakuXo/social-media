import React from "react";
import Avatatr from "../post/avatar";
import Link from "next/link";
import UserCardBtn from "./userCardBtn";
import { TUserCard } from "@/type";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function Usercard({ name, id, btns }: TUserCard) {
   const session = await getServerSession(options);
   if (!session) return;
   return (
      <div className="bg-color4  hover:bg-color1 flex justify-between items-center mt-[4px] p-[8px]">
         <Link href={"/pages/profile/" + id} className="w-full">
            <div className="flex items-center w-full ">
               <div>
                  <Avatatr userId={id} width="50px" height="50px" />
               </div>
               <span className="ml-[8px]">{name}</span>
            </div>
         </Link>
         <div className="flex gap-[12px]">
            {btns.map((items) => {
               return (
                  <UserCardBtn
                     key={items.text}
                     userInCardId={id}
                     userInCardName={name}
                     userId={session?.user.id}
                     userName={session.user.name}
                     btns={items}
                  />
               );
            })}
         </div>
      </div>
   );
}

export default Usercard;
