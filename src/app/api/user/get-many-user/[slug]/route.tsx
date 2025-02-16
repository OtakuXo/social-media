import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) => {
  console.log(params);
  try {
    const slug = (await params).slug;
    const user = await prisma.user.findMany({
      select: {
        name: true,
        id: true,
      },
      where: {
        name: slug,
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
