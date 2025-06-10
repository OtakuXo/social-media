import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;
    const user = await prisma.user.findUnique({
      select: {
        name: true,
        profileAvatar: true,
        id: true,
      },
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      user,
    });
  } catch (err) {
    console.log("error while seraching userlist");
    return NextResponse.json({
      msg: "internal server error",
    });
  }
};
