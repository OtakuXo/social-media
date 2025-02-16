import prisma from "@/lib/db";
import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { options } from "../../../auth/[...nextauth]/options";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: body.data,
      },
    });
    return NextResponse.json({
      post,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "fucked up",
    });
  }
};
