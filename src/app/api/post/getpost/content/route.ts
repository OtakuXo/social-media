import prisma from "@/lib/db";
import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { options } from "../../../auth/[...nextauth]/options";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const content = await prisma.postContent.findUnique({
      where: {
        postId: body.data,
      },
    });
    return NextResponse.json({
      content,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "fucked up",
    });
  }
};
