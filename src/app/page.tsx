import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { get } from "@/utilles/get";
import { TPost } from "@/type";
import Post from "@/components/post/post";

async function Page() {
   // if session is not present middleware will rdirect before we reach this place
   // if statement is just there to satisfy typeScript
   const session = await getServerSession(options);
   if (!session) return;
   const data: { post: TPost[] } = await get(
      "http://localhost:3000/api/post/getpost/post",
     session?.user.id,
   );
   if (!data) {
      return <div>hello</div>;
   }
   return (
      <section className="flex flex-col items-center">
         <div>
            {data.post.map((i) => (
               <Post key={i.id} item={i} />
            ))}
         </div>
      </section>
   );
}
export default Page;
