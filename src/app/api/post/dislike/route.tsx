import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  if (!body.data.userId || !body.data.postId) {
    return NextResponse.json({
      msg: "user id, disLike, post id is missing",
    });
  }

  // decrement likes
  if (body.data.isDisLiked) {
    const disLikedPostIds = await prisma.disLike.findUnique({
      where: {
        userId: body.data.userId,
      },
    });
    try {
      await prisma.disLike.update({
        where: {
          userId: body.data.userId,
        },
        data: {
          disLikedPostId: {
            set: disLikedPostIds?.disLikedPostId.filter(
              (e) => e != body.data.postId
            ),
          },
        },
      });
      const post = await prisma.post.update({
        where: {
          id: body.data.postId,
        },
        data: {
          dislike: body.data.disLikes - 1,
        },
      });
      return NextResponse.json({
        disLike: post.dislike,
      });
    } catch (err) {
      console.log("gg");
      return NextResponse.json({
        msg: "fk",
      });
    }
  }

  // increment dislikes
  if (!body.data.isDisLiked) {
    try {
      await prisma.disLike.update({
        where: {
          userId: body.data.userId,
        },
        data: {
          disLikedPostId: {
            push: body.data.postId,
          },
        },
      });
      const post = await prisma.post.update({
        where: {
          id: body.data.postId,
        },
        data: {
          dislike: body.data.disLikes + 1,
        },
      });
      return NextResponse.json({
        disLike: post.dislike,
      });
    } catch (err) {
      console.log("gg");
      return NextResponse.json({
        msg: "fk",
      });
    }
  }
};
