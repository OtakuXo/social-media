import React from 'react'
import Avatatr from "../avatar";
import { TpostUserId } from "@/type";

export const Comment = ({ postId, userId }: TpostUserId) => {
   console.log(postId)
   return (
    <div className=" flex flex-col gap-[8px]">
      <div className="flex items-center gap-[8px] pt-[12px] ">
        <Avatatr userId={userId} width="50px" height="50px" />
        <p>name</p>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias numquam
        explicabo delectus eum cupiditate a qui cum fugit doloribus voluptas.
      </div>
    </div>
   )
}
