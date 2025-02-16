"use client";
import React, { useState } from "react";
// import Avatatr from "../avatar";
import { TpostUserId } from "@/type";
import { post } from "@/utilles/post";

function CommentInput({ userId, postId }: TpostUserId) {
   const [input, setInput] = useState<string>();

   const registerComment = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = post(
         "http://localhost:3000/api/post/comment/register-comment",
         { userId, postId, comment: input }
      );
      console.log(res);
   };

   return (
      <form onSubmit={registerComment} className="flex my-[12px] items-center ">
         <label htmlFor="comment-input">
            {        // <Avatatr userId={userId} width="50px" height="50px" />
            }
         </label>
         <div className="bg-white ml-[px] h-[40px] w-[80%] flex border border-black rounded-[40px]">
            <div className="w-[20px] h-full "></div>
            <textarea
               id="comment-input"
               onChange={(e) => setInput(e.target.value)}
               value={input}
               className="w-full border-gray-400 rounded-[40px] focus:outline-none "
            />
         </div>
         <input type="submit" value={"ok"} />
      </form>
   );
}

export default CommentInput;
