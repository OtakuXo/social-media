import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
   _req: Request,
   { params }: { params: Promise<{ user_id: string }> },
) => {
   console.log(params);
   const id = (await params).user_id;
   try {
      const userFriends = await prisma.user.findUnique({
         where: {
            id: id,
         },
         select: {
            friends: {
               select: {
                  friendId: true,
                  friendName: true,
               },
            },
         },
      });
      console.log(userFriends)
      return NextResponse.json(userFriends?.friends);
   } catch (err) {
      console.log("got error while getting firends");
      return NextResponse.json({ msg: "got error while find your friends" });
   }
};
