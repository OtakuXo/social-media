import axios from "axios";

export const get = async (url: string, userId?: string) => {
   try {
      const res = await axios.get(url, { headers: { id: userId } });
      return res.data;
   } catch (err) {
      console.log("api end point not found");
   }
};
