import { supabaseClient } from "@/shared/lib/superbase";
import AddMessageImageDTO from "./dto/AddMessageImageDTO.ts";
import { v4 as uuidv4 } from "uuid";

class SuperbaseMessageImageRepository {
  async addOne({ file }: AddMessageImageDTO) {
    const path = uuidv4();

    const { error, data } = await supabaseClient.storage.from("message_files").upload(path, file);

    if (error) {
      alert("superbase client error");
    }

    return supabaseClient.storage.from("message_files").getPublicUrl(data!.path).data.publicUrl;
  }
}

export default new SuperbaseMessageImageRepository();
