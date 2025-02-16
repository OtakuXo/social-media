import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body);

  if (!body.data.comment || !body.data.userId || !body.data.postId) {
    return Response.json({
      msg: "comment or userID or postID is not provided",
    });
  }

  try {
    const getUserComments = await prisma.usercomments.findUnique({
      where: {
        userId: body.data.userId,
      },
    });

    const checkIfUserHasAlredyCommented =
      getUserComments?.commentedPostId.filter((i) => i === body.data.postId);

    console.log(checkIfUserHasAlredyCommented);
    if (!checkIfUserHasAlredyCommented) {
      return Response.json({
        msg: "internel error",
      });
    }

    if (checkIfUserHasAlredyCommented[0]) {
      return Response.json({
        msg: "you have alredy commented in this post",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        authorId: body.data.userId,
        postId: body.data.postId,
        comment: body.data.comment,
      },
    });
    console.log(comment);
    await prisma.usercomments.update({
      where: {
        userId: body.data.userId,
      },
      data: {
        commentedPostId: {
          push: body.data.postId,
        },
      },
    });
    return Response.json({
      msg: "successfully comment registerd",
    });
  } catch (err) {
    // console.log("regeser comment error");
    console.log(err);
    return Response.json({
      msg: "internel server error",
    });
  }
};
