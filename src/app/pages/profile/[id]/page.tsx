import React from "react";
import Avatatr from "@/components/post/avatar";
import Link from "next/link";
import { get } from "@/utilles/get";

async function Page({ params }: { params: { id: string } }) {
  const res = await get(
    "http://localhost:3000/api/user/get-single-user/" + params.id
  );
  const user = res.user;
  return (
    <div>
      <Avatatr userId={params.id} width="100px" height="100px" />
      <p>
        name: <samp>{user.name}</samp>
      </p>
      <Link href={"/pages/profile/avatar/update"}>update</Link>
    </div>
  );
}

export default Page;
