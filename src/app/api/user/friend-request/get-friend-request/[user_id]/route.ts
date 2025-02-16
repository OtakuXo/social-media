import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
   _req: Request,
   { params }: { params: Promise<{ user_id: string }> },
) => {
   const id = (await params).user_id;
   try {
      const userFriendRequest = await prisma.user.findUnique({
         where: {
            id: id,
         },
         select: {
            friendrequest: {
               select: {
                  senderId: true,
                  senderName: true
               }
            }
         }
      });

      return NextResponse.json(
         userFriendRequest,
         { status: 200 },
      );
   } catch (error) {
      console.log("sorry");
   }
};
