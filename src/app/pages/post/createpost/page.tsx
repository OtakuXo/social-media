import React from "react";
import Form from "./form";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function page() {
  const session = await getServerSession(options);
  if (!session) return;
  return (
    <section className="flex gap-[20px] ">
      <div className="flex flex-col">
        <header>create a post</header>
        <Form userId={session.user.id} />
      </div>
    </section>
  );
}

export default page;
