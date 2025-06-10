import React from 'react'
import Avatatr from "../avatar";
import { TComment, TpostUserId } from "@/type";
import { get } from '@/utilles/get';

export const Comment = async ({ postId }: TpostUserId) => {
   const res: { comments: TComment[] } = await get("http://localhost:3000/api/post/comment/get-comments/" + postId)
   return (
      <div className=" flex flex-col gap-[8px]">
         {res.comments.map((item: TComment) => {
            return (
               <div key={item.id}>
                  <div className="flex items-start gap-[8px] pt-[12px] ">
                     <div className="w-[41px] ">
                        <Avatatr userId={item.authorId} width="40px" height="40px" />
                     </div>
                     {item.comment}
                  </div>
               </div>
            )
         })}
      </div>
   )
}
