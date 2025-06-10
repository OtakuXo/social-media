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
    const post = await prisma.post.findMany({take:5});
    return NextResponse.json({
      post,
    });
  } catch (err) {
    return NextResponse.json({
      msg: "fucked up",
    });
  }
};
