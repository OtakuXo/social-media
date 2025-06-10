import prisma from "@/lib/db";

export const GET = async (
   _req: Request,
   { params }: { params: Promise<{ id: string }> },
) => {
   const id = (await params).id;
   if (!id) {
      return Response.json({
         msg: "postId is not provided",
      });
   }
   try {
      const comments = await prisma.comment.findMany({
         where: {
            postId: id
         }
      })
      return Response.json({
         comments
      });
   } catch (err) {
      console.log(err);
      return Response.json({
         msg: "internel server error",
      });
   }
};
