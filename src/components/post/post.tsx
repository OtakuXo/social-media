import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { TPost } from "@/type";
import { CommentWrapper } from "@/components/post/comment/commentWrapper";
import Avatatr from "./avatar";
import PostContent from "./postcontent";
// import Dropdown from "./dropdown";
import LikeBtn from "./btns/likeBtn";
import DislikeBtn from "./btns/dislikeBtn";

async function Post({ item }: { item: TPost }) {
   const session = await getServerSession(options);
   const arr = [1, 2, 3, 4]
   if (!session) return;
   return (
      <div className="bg-color4 p-[12px] w-[60vw] min-w-[360px] min-h-[60vh] flex gap-[12px] mt-[12px]">
         <div className="w-full md:w-[50%] min-h-[60vh]  flex flex-col justify-between items-center">
            <header className="flex w-full items-center justify-between">
               <div className="flex items-center">
                  <Avatatr userId={item.authorId} width="50px" height="50px" />
                  <div className="ml-[8px]">
                     {item.title}
                  </div>
               </div>
               {    // <Dropdown postId={item.id} />
               }
            </header>
            <div className="w-full my-[8px]">
               <PostContent id={item.id} />
            </div>
            <footer className="w-full flex gap-[8px] mb-[8px]">
               <LikeBtn
                  postId={item.id}
                  number={item.likes}
                  userId={session?.user.id}
               />
               <DislikeBtn
                  postId={item.id}
                  number={item.dislike}
                  userId={session?.user.id}
               />
            </footer>
         </div>
         <div className="hidden md:block w-[50%]">
            <CommentWrapper postId={item.id} userId={session.user.id} />
         </div>
         <div className="hidden">
            {
               arr.map((item) => {
                  console.log(item)
                  return <div key={item}>{item}</div>
               })
            }
            hidden
         </div>
      </div>
   );
}

export default Post;
