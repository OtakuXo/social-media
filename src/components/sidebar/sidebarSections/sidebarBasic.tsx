"use client"

import React from 'react'
import Link from 'next/link';

export default function SidebarBasic() {
   const sidebarItems = [
      { link: "/", text: "Home" },
      { link: "/pages/post/createpost", text: "Create Post" },
      { link: "/pages/post/userpost", text: "Your Post" },
      { link: "/pages/friends", text: "Friends" },
      { link: "/pages/friends/friendrequest", text: "Friend Request" },
   ];
   return (
      <div>
         <p className="w-full py-[4px] flex justify-center font-bold">General</p>
         <ul className="w-full">
            {sidebarItems.map((items, index) => {
               return (
                  <li
                     key={index}
                     className="w-full p-[4px] hover:bg-color3">
                     <Link href={items.link} className="w-full flex">
                        {items.text}
                     </Link>
                  </li>
               );
            })}
         </ul>
      </div>
   )
}

