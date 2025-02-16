"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  if (pathname === "/auth/signup") {
    return;
  }

  const sidebarItems = [
    { link: "/", text: "Home" },
    { link: "/pages/post/createpost", text: "Create Post" },
    { link: "/pages/post/userpost", text: "Your Post" },
    { link: "/pages/friends", text: "Friends" },
    { link: "/pages/friends/friendrequest", text: "Friend Request" },
  ];

  return (
    <div className=" z-20 bg-color4 w-full h-[100vh]  ">
      <ul className="w-full h-full">
        {sidebarItems.map((items, index) => {
          return (
            <li
              key={index}
              className="w-full py-[4px] hover:bg-color3 flex justify-center "
            >
              <Link href={items.link} className="w-full flex justify-center">
                {items.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
