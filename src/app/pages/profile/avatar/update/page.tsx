import React from "react";
import Crop from "./crop";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function Page() {
  const session = await getServerSession(options);
  if (!session) return;

  return (
    <div>
      <Crop userId={session?.user.id} />
    </div>
  );
}

export default Page;
