import { options } from "@/app/api/auth/[...nextauth]/options";
import { get } from "@/utilles/get";
import { getServerSession } from "next-auth";
import React from "react";
import Usercard from "@/components/usercard/usercard";
import { TFriend } from "@/type";


async function Page() {
   const session = await getServerSession(options);
   const res = await get(
      "http://localhost:3000/api/user/friend-request/get-friends/" +
      session?.user.id,
   );
   if (res.msg) return <div>nothing here</div>
   const friends: TFriend[] = res
   return (
      <section>
         <div className="p-[12px]">
            {friends.map((i: TFriend) => {
               return (
                  <Usercard
                     key={i.friendId}
                     id={i.friendId}
                     name={i.friendName}
                     btns={[]}
                  />
               );
            })}
         </div>
      </section>
   );
}

export default Page;
