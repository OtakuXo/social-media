import React from "react";
import Image from "next/image";
import { post } from "@/utilles/post";

async function PostContent({ id }: { id: string }) {
  const data = await post("http://localhost:3000/api/post/getpost/content", id);
  // console.log(data);
  if (!data.content) {
    return (
      <Image
        height={0}
        width={0}
        src={"/616reama.jpg"}
        alt="post image"
        sizes="(max-width: 768px) 100vw,
    (max-width: 1200px) 50vw,
    33vw"
        style={{
          width: "100%",
          height: "auto",
          minHeight: "200px",
          // borderRadius: "0.5rem",
          objectFit: "cover",
          objectPosition: "50% 0%",
        }}
      />
    );
  }

  return (
    <Image
      height={0}
      width={0}
      src={data.content.image}
      alt="post image"
      sizes="(max-width: 768px) 100vw,
    (max-width: 1200px) 50vw,
    33vw"
      style={{
        width: "100%",
        height: "auto",
        minHeight: "200px",
        objectFit: "cover",
        objectPosition: "50% 0%",
      }}
    />
  );
}

export default PostContent;
