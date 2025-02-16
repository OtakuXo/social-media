"use client";
import React, { useEffect, useState } from "react";
import Btn from "./Btn";
import { post } from "@/utilles/post";
import { TLikeDislike } from "@/type";

function DislikeBtn({ postId, number, userId }: TLikeDislike) {
  const [disLikes, setlikes] = useState<number>(number);
  const [isDisLiked, setIsliked] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await post(
          "http://localhost:3000/api/post/dislike/getdislike",
          {
            postId: postId,
            userId: userId,
          }
        );
        setIsliked(res.msg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [disLikes, postId, userId]);

  const incrementLike = async () => {
    const res = await post("http://localhost:3000/api/post/dislike", {
      postId,
      userId,
      disLikes,
      isDisLiked,
    });
    console.log(res);
    setlikes(res.disLike);
  };
  return (
    <Btn
      active={isDisLiked}
      btnText={disLikes + " dislike"}
      fn={incrementLike}
    />
  );
}

export default DislikeBtn;
