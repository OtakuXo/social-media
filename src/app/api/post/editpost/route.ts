import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  // console.log(body);

  if (!body.data.id) {
    return NextResponse.json({
      msg: "id not provided",
    });
  }

  try {
    await prisma.post.update({
      where: {
        id: body.data.id,
      },
      data: {
        title: body.data.title,
      },
    });

    const post = await prisma.postContent.findUnique({
      where: {
        postId: body.data.id,
      },
    });

    if (post) {
      await prisma.postContent.update({
        where: {
          postId: body.data.id,
        },
        data: {
          image: body.data.image,
        },
      });
    } else {
      await prisma.postContent.create({
        data: {
          image: body.data.image,
          postId: body.data.id,
        },
      });
    }

    return NextResponse.json({
      msg: "post content is sucessfully updated",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "fucked up",
    });
  }
};
