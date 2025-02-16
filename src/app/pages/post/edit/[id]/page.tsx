"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { post } from "@/utilles/post";
import { FormEvent } from "react";

function Page({ params }: { params: { id: string } }) {
  const [postContent, setPostContent] = useState<string | ArrayBuffer | null>(
    null
  );
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    async () => {
      const title = await post(
        "http://localhost:3000/api/post/getpost/singlepost",
        params.id
      );
      setPostTitle(title.post.title);
      const content = await post(
        "http://localhost:3000/api/post/getpost/content",
        params.id
      );
      if (content.content) {
        setPostContent(content.content.image);
      }
    };
  }, [params.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await post("http://localhost:3000/api/post/editpost", {
      id: params.id,
      image: postContent,
      title: postTitle,
    });
    alert(res.msg);
  };

  return (
    <section className="flex gap-[20px] ">
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
          method="POST"
          encType="multipart/form-data"
        >
          {/* title */}
          <div className="flex flex-col">
            <header>edit your post</header>
            <label htmlFor="title">title of your content</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          {/* postContent */}
          <div>
            <header>upload content for your post</header>
            <label htmlFor="postContent">choose postContent</label>
            <input
              id="postContent"
              name="postContent"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const fileReader = new FileReader();

                fileReader.onload = () => {
                  setPostContent(fileReader.result);
                  // props.values.postContent = fileReader?.result;
                };

                if (e.target.files) {
                  fileReader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
            {typeof postContent === "string" && (
              <Image
                width={0}
                height={0}
                src={postContent}
                alt="post postContent"
                sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
                style={{
                  width: "500px",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "50% 0%",
                }}
              />
            )}
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </section>
  );
}

export default Page;
