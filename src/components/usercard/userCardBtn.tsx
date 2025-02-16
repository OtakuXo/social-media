"use client";
import React from "react";
import { post } from "@/utilles/post";
import { TUserCardBtn } from "@/type";

function UserCardBtn({
   userInCardId,
   userInCardName,
   userId,
   userName,
   btns,
}: {
   userInCardId: string;
   userInCardName?: string;
   userId: string;
   userName?: string;
   btns: TUserCardBtn;
}) {
   const handleClick = async () => {
      const res = await post(btns.url, { userInCardId, userInCardName, userId, userName });
      console.log(res)
      alert(res.msg);
   };
   return (
      <button className="styledBtn" onClick={handleClick}>
         {btns.text}
      </button>
   );
}

export default UserCardBtn;
