import prisma from "@/lib/db";
import { TUserFriend } from "@/type";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
   const body: { data: TUserFriend } = await req.json();
   console.log(body);
   //while rejecting request user in card is the request sender
   //userid is the pserso that is deleting the request
   if (!body.data.userInCardId || !body.data.userId) {
      return NextResponse.json({
         msg: "user In CardId or userId is missing",
      });
   }

   try {
      const user = await prisma.userfriendrequest.deleteMany({
         where: {
            AND: [
               { userId: body.data.userId },
               { senderId: body.data.userInCardId },
            ]
         },
      });
      console.log(user)
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
