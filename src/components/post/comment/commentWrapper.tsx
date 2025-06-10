import React from "react";
import { TpostUserId } from "@/type";
import { Comment } from "./comment"
import CommentInput from "./comment_input";

export function CommentWrapper({ postId, userId }: TpostUserId) {
   return (
      <div className="max-h-[70vh] overflow-y-scroll">
         <CommentInput userId={userId} postId={postId} />
         <Comment postId={postId} userId={userId} />
      </div>
   );
}

