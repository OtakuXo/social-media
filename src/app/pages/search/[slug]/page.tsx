import { get } from "@/utilles/get";
import React from "react";
import { TUser } from "@/type";
import Usercard from "@/components/usercard/usercard";

async function Page({ params }: { params: { slug: string } }) {
  const res = await get(
    "http://localhost:3000/api/user/get-many-user/" + params.slug,
  );
  if (res.user[0] === undefined) {
    return <div>user with name {params.slug} dosnt exsist. </div>;
  }

  return (
    <section>
      <div className="p-[12px]">
        {res.user.map((i: TUser) => (
          <Usercard
            key={i.id}
            id={i.id}
            name={i.name}
            btns={[
              {
                text: "Request",
                url: "http://localhost:3000/api/user/friend-request/send-request",
              },
            ]}
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
