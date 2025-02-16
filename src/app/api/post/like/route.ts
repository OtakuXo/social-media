import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  if (!body.data.userId || !body.data.postId) {
    return NextResponse.json({
      msg: "user id, like, post id is missing",
    });
  }

  // decrement likes
  if (body.data.isLiked) {
    const likedPostIds = await prisma.like.findUnique({
      where: {
        userId: body.data.userId,
      },
    });
    try {
      await prisma.like.update({
        where: {
          userId: body.data.userId,
        },
        data: {
          likedPostId: {
            set: likedPostIds?.likedPostId.filter((e) => e != body.data.postId),
          },
        },
      });
      const post = await prisma.post.update({
        where: {
          id: body.data.postId,
        },
        data: {
          likes: body.data.like - 1,
        },
      });
      return NextResponse.json({
        like: post.likes,
      });
    } catch (err) {
      console.log("gg");
      return NextResponse.json({
        msg: "fk",
      });
    }
  }

  // increment likes
  if (!body.data.isLiked) {
    try {
      await prisma.like.update({
        where: {
          userId: body.data.userId,
        },
        data: {
          likedPostId: {
            push: body.data.postId,
          },
        },
      });
      const post = await prisma.post.update({
        where: {
          id: body.data.postId,
        },
        data: {
          likes: body.data.like + 1,
        },
      });
      return NextResponse.json({
        like: post.likes,
      });
    } catch (err) {
      console.log("gg");
      return NextResponse.json({
        msg: "fk",
      });
    }
  }
};
