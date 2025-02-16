import prisma from "@/lib/db";
import { TUserFriend } from "@/type";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
   const body: { data: TUserFriend } = await req.json();
   if (!body.data.userInCardId || !body.data.userId || !body.data.userName) {
      return NextResponse.json({
         msg: "user In CardId or userId is missing",
      });
   }
   try {
      // while sending request user in card is receiving request
      // user is sending request
      // we are recording user both name and id so
      // it will be easy to display them in userCard 
      await prisma.userfriendrequest.create({
         data: {
            senderId: body.data.userId,
            senderName: body.data.userName,
            userId: body.data.userInCardId,
         },
      });

      return NextResponse.json(
         {
            msg: "your request has been sent",
         },
         { status: 200 },
      );
   } catch (err) {
      console.log(err);
      return NextResponse.json(
         {
            msg: "sorry your request was not sent",
         },
         { status: 200 },
      );
   }
};
