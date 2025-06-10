import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
   const body = await req.json();
   try {
      const user = await prisma.user.findUnique({
         where: {
            id: body.data,
         },
      });
      return NextResponse.json({
         image: user?.avatar
      });
   } catch (err) {
      console.log(err);
      return NextResponse.json({
         msg: "fucked up",
      });
   }
};
