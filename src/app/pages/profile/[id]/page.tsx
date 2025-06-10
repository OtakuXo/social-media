import React from "react";
// import Avatatr from "@/components/post/avatar";
import { get } from "@/utilles/get";
import Dropdown from "@/components/post/dropdown";
import { TOption } from "@/type";
import Friends from "./friends";
import Image from "next/image"

const options: TOption[] = [
   { src: "/pages/profile/avatar/update", text: "update avatar" },
   { src: "", text: "update name" },
   { src: "", text: "sdfdsf" }
]

// <Avatatr userId={params.id} width="20vw" height="20vw" />
async function Page({ params }: { params: { id: string } }) {
   const res = await get(
      "http://localhost:3000/api/user/get-single-user/" + params.id
   );
   const user = res.user;
   console.log(user)
   return (
      <section className=" w-full p-[12px] flex justify-center ">
         <div className=" w-[80%] min-h-[90vh] bg-color4 flex flex-col items-center p-[12px]">
            <div>
               <Image
                  width={0}
                  height={0}
                  src={user.profileAvatar || "/616reama.jpg"}
                  alt="hello"
                  sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
                  style={{
                     width: "20vw",
                     height: "20vw",
                     borderRadius: "50%",
                     objectFit: "cover",
                     objectPosition: "50% 0%",
                  }}
               />
               <div className="w-full flex justify-between mt-[12px]">
                  <p>
                     name: <samp>{user.name}</samp>
                  </p>
                  <Dropdown options={options} />
               </div>
            </div>
            <div className="w-full mt-[12px]">
               <p className="font-bold">Friends</p>
               <Friends userId={params.id} />
            </div>
         </div>
      </section>
   );
}

export default Page;
