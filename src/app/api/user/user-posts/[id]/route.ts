import prisma from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  if (!id) return Response.json({ msg: "url is missing params" });

  try {
    const usersPost = await prisma.post.findMany({
      where: {
        authorId: id,
      },
    });
    return Response.json({
      usersPost,
    });
  } catch (err) {
    console.log("fk");
  }
};
