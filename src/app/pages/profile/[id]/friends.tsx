import React from 'react';
import Avatatr from '@/components/post/avatar';
import Link from 'next/link';
import { get } from '@/utilles/get';
import { TFriend } from '@/type';

async function Friends({ userId }: { userId: string }) {
   const res = await get("http://localhost:3000/api/user/friend-request/get-friends/" + userId)
   const friends: TFriend[] = res
   return (
      <div className="flex flex-wrap gap-[12px]">
         {friends.map((items, index) => {
            return (
               <Link key={index} href={items.friendId} >
                 <div className="bg-color1 hover:bg-color3 p-[12px] rounded-sm">
                     <Avatatr userId={items.friendId} width="75px" height="75px" />
                     <p className="w-full align-middle">{items.friendName}</p>
                  </div>
               </Link>
            )
         })}
      </div >
   )
}

export default Friends
