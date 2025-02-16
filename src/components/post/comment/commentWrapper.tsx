import React from "react";
import { TpostUserId } from "@/type";
import { Comment } from "./comment"

export function CommentWrapper({ postId, userId }: TpostUserId) {
   console.log(postId);
   return (
      <div className="max-h-[70vh] overflow-y-scroll">
         <Comment postId={postId} userId={userId} />
      </div>
   );
}

