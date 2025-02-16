"use client";
import React from "react";
import { Formik, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { signupSechma } from "./signup-sechma";
import axios from "axios";

const Page: React.FC = () => {
  const route = useRouter();
  const inititaValue = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };

  return (
    <div className=" h-screen flex items-center justify-center ">
      <div className=" bg-color1 text-black p-10 rounded-lg ">
        <h2 className="w-full text-3xl flex justify-center">Sign up</h2>
        <Formik
          initialValues={inititaValue}
          validationSchema={signupSechma}
          onSubmit={async (values) => {
            try {
              const res = await axios.post(
                "http://localhost:3000/api/auth/user-register",
                values
              );
              alert(res.data.msg);
              if (res.data.msg === "successful user created") {
                route.push("/");
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {(props) => (
            <form
              onSubmit={props.handleSubmit}
              className="flex flex-col gap-[12px]"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={props.values.name}
                onChange={props.handleChange}
              />
              <ErrorMessage
                name="name"
                component={"p"}
                className="text-red-500 "
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={props.values.email}
                onChange={props.handleChange}
              />
              <ErrorMessage
                name="email"
                component={"p"}
                className="text-red-500"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={props.values.password}
                onChange={props.handleChange}
              />
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-500"
              />
              <label htmlFor="cpassword">conform password</label>
              <input
                type="password"
                name="cpassword"
                value={props.values.cpassword}
                onChange={props.handleChange}
              />
              <ErrorMessage
                name="cpassword"
                component={"p"}
                className="text-red-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-color2  w-fit p-2 rounded-lg"
                >
                  sign up
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
