import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body);

  if (!body.data.image || !body.data.id.userId) {
    return Response.json({ msg: "Image or userId is missing" });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: body.data.id.userId,
      },
      data: {
        avatar: body.data.image,
      },
    });

    console.log(user);
    return Response.json({
      msg: "your avatar has beem updated",
    });
  } catch (err) {
    console.log(err);
    return Response.json({
      msg: "internal server error",
    });
  }
};
