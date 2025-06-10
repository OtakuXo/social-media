// import { usePathname } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SidebarBasic from "./sidebarSections/sidebarBasic";
import SidebarFriends from "./sidebarSections/sidebarFriends";

async function Sidebar() {
   const session = await getServerSession(options)
   if (!session) return
   // const pathname = usePathname();
   // if (pathname === "/auth/signup") {
   //    return;
   // }

   return (
      <div className=" z-20 bg-color4 w-full h-[100vh] flex justify-center ">
         <div className=" w-[90%]  ">
            <SidebarBasic />
            <hr />
            <SidebarFriends userId={session?.user.id} />
         </div>
      </div>
   );
}

export default Sidebar;
