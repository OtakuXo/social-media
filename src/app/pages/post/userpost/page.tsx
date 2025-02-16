import React from "react";
import { get } from "@/utilles/get";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Post from "@/components/post/post";

async function Page() {
  const session = await getServerSession(options);
  if (!session) {
    return <div>you are not loggedin</div>;
  }
  console.log(session);
  const data = await get(
    "http://localhost:3000/api/user/user-posts/" + session?.user.id
  );
  if (!data) return <div></div>;
  const post: [] = data.usersPost;
  return (
    <section className="p-[8px]">
      <h3>your posts</h3>
      <div className="w-full flex flex-wrap justify-center gap-[8px]">
        {post.map((i, index) => {
          return (
            <div
              key={index}
              style={{ width: "calc(20vw - 16px)", minWidth: "200px" }}
            >
              <Post item={i} />;
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Page;
