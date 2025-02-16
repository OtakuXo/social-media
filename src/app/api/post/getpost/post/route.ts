import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const GET = async () => {
  const headerslist =  headers();
  const id = headerslist.get("id");

  if (!id) {
    return NextResponse.json({
      msg: "your are not loggedin",
    });
  }

  try {
    const userFriends = await prisma.userfriends.findMany({
      where: {
        userId: id,
      },
    });
    // console.log("consoled in getpost/post", userFriends);
    console.log(userFriends);
    const post = await prisma.post.findMany();
    return NextResponse.json({
      post,
    });
  } catch (err) {
    return NextResponse.json({
      msg: "fucked up",
    });
  }
};
