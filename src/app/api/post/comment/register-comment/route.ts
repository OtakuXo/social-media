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
    const userComments = await prisma.usercomments.findUnique({
      where: {
        userId: body.data.userId,
      },
    });
    
    if (!userComments) {
      return Response.json({
        msg: "user comment record not found",
      });
    }

    console.log(userComments)
    const checkIfUserHasAlredyCommented =
      userComments?.commentedPostId.filter((i) => i === body.data.postId);

    if (checkIfUserHasAlredyCommented[0]) {
      return Response.json({
        msg: "you have alredy commented in this post",
      });
    }

    await prisma.comment.create({
      data: {
        authorId: body.data.userId,
        postId: body.data.postId,
        comment: body.data.comment,
      },
    });

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
    console.log(err);
    return Response.json({
      msg: "internel server error",
    });
  }
};
