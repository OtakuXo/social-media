"use client";
import React, { useEffect, useState } from "react";
import Btn from "./Btn";
import { post } from "@/utilles/post";
import { TLikeDislike } from "@/type";

function LikeBtn({ postId, number, userId }: TLikeDislike) {
  const [like, setlikes] = useState<number>(number);
  const [isLiked, setIsliked] = useState(false);

  useEffect(() => {
    // checks if user has liked post or not
    const checkLiked = async () => {
      const res = await post("http://localhost:3000/api/post/like/getlike", {
        postId: postId,
        userId: userId,
      });
      setIsliked(res.msg);
    };
    checkLiked();
  }, [like, postId, userId]);

  const likeHandler = async () => {
    // increments like if user has not liked and decreases if user has alredy liked
    const res = await post("http://localhost:3000/api/post/like", {
      postId,
      userId,
      like,
      isLiked,
    });
    setlikes(res.like);
  };
  return <Btn active={isLiked} btnText={like + " like"} fn={likeHandler} />;
}

export default LikeBtn;
