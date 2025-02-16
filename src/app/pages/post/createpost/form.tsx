"use client";
import { post } from "@/utilles/post";
import { Formik, ErrorMessage } from "formik";
import { createPostSechma } from "./createpost-sechma";
import React, { useState } from "react";
import Image from "next/image";
import { TUserId } from "@/type";

type TInitialValue = {
  title: string;
  image: string | ArrayBuffer | null;
};

const initialValues: TInitialValue = {
  title: "",
  image: "",
};

function Form({ userId }: TUserId) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  console.log(image);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createPostSechma}
      onSubmit={async (values) => {
        console.log(values);
        try {
          const res = await post(
            "http://localhost:3000/api/post/createpost/post",
            {
              title: values.title,
              image: values.image,
              userId,
            }
          );
          if (!res.postId) {
            return alert(res.msg);
          }
          alert("you created a post by id" + res.postId);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {(props) => {
        return (
          <form onSubmit={props.handleSubmit} className="flex flex-col">
            <label htmlFor="title">title of your content</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="title"
              value={props.values.title}
              onChange={props.handleChange}
            />
            <ErrorMessage
              name="title"
              component={"p"}
              className="text-red-500 "
            />

            <label htmlFor="image">choose image</label>
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const fileReader = new FileReader();

                fileReader.onload = () => {
                  setImage(fileReader.result);
                  props.values.image = fileReader?.result;
                };

                if (e.target.files) {
                  fileReader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
            <ErrorMessage
              name="image"
              component={"p"}
              className="text-red-500 "
            />
            {typeof image === "string" && (
              <Image
                width={0}
                height={0}
                src={image}
                alt="post image"
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
            <button type="submit">submit</button>
          </form>
        );
      }}
    </Formik>
  );
}

export default Form;
