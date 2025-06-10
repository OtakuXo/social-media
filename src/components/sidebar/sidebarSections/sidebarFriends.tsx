import { get } from '@/utilles/get';
import React from 'react';
import Link from 'next/link';
import { TFriend } from '@/type';
import Avatatr from '@/components/post/avatar';

export default async function SidebarFriends({ userId }: { userId: string }) {
   const res = await get("http://localhost:3000/api/user/friend-request/get-friends/" + userId)
   const friends: TFriend[] = res

   return (
      <div>
         <p className="w-full py-[4px] flex justify-center font-bold">Friends</p>
         <ul className="w-full">
            {friends.map((items, index) => {
               return (
                  <li
                     key={index}
                     className="w-full p-[4px] hover:bg-color3">
                     <Link href={"/pages/profile/" + items.friendId} className="w-full flex items-center gap-[12px]">
                           <Avatatr userId={items.friendId} width="40px" height="40px" />
                           {items.friendName}
                     </Link>
                  </li>
               );
            })}
         </ul>
      </div>
   )
}

