import prisma from "@/lib/db";
import { TUserFriend } from "@/type";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
   const body: { data: TUserFriend } = await req.json();

   //while accepting request user in card is the request sender
   //userid is the pserson that is accepting the request
   if (!body.data.userInCardId || !body.data.userId || !body.data.userInCardName) {
      return NextResponse.json({
         msg: "user In CardId or userId is missing",
      });
   }

   try {
      await prisma.userfriendrequest.deleteMany({
         where: {
            AND: [
               { userId: body.data.userId },
               { senderId: body.data.userInCardId },
            ]
         },
      });
      await prisma.userfriends.create({
         data: {
            userId: body.data.userId,
            friendId: body.data.userInCardId,
            friendName: body.data.userInCardName,
         }
      })
      return NextResponse.json({
         msg: "has been removed from your friend list",
      });
   } catch (err) {
      console.log("some internal error");
      return NextResponse.json({
         msg: "gg",
      });
   }
};
