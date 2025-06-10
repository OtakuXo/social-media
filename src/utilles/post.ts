import axios from "axios";

export const post = async (src: string, body: unknown) => {
   try {
      const res = await axios.post(src, {
         data: body,
      });
      return res.data;
   } catch (err) {
      console.log("not found");
      return { msg: "not found" }
   }
};
