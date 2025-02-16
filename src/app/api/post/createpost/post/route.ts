import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  if (!body.data.title || !body.data.image || !body.data.userId) {
    return NextResponse.json({
      msg: "title, image or userId is missing",
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.data.title,
        authorId: body.data.userId,
      },
    });
    await prisma.postContent.create({
      data: {
        image: body.data.image,
        postId: post.id,
      },
    });
    return NextResponse.json({
      msg: "successfylly post created ",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "fucked up",
    });
  }
};
