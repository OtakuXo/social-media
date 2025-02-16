import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const userDisLikedPosts = await prisma.disLike.findUnique({
      where: { userId: body.data.userId },
    });
    // checking wether user has disliked the post or not
    const postId = userDisLikedPosts?.disLikedPostId.filter(
      (id) => id === body.data.postId
    );

    if (!postId) {
      return;
    }

    if (postId[0] === undefined) {
      return NextResponse.json({
        msg: false,
      });
    }

    if (postId[0]) {
      return NextResponse.json({
        msg: true,
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "fucked up",
    });
  }
};
