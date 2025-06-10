"use client";
import React, { useState } from "react";
import { TpostUserId } from "@/type";
import { post } from "@/utilles/post";

function CommentInput({ userId, postId }: TpostUserId) {
   const [input, setInput] = useState<string>();

   const registerComment = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await post(
         "http://localhost:3000/api/post/comment/register-comment",
         { userId, postId, comment: input }
      );
      alert(res.msg);
   };

   return (
      <form onSubmit={registerComment} className="flex my-[12px] items-center ">
         <div className="bg-white mr-[8px] h-[40px] w-[80%] flex border border-black rounded-[40px]">
            <div className="w-[20px] h-full "></div>
            <textarea
               id="comment-input"
               onChange={(e) => setInput(e.target.value)}
               value={input}
               className="w-full border-gray-400 rounded-[40px] focus:outline-none "
            />
         </div>
         <input className="cursor-pointer styledBtn" type="submit" value={"ok"} />
      </form>
   );
}

export default CommentInput;
