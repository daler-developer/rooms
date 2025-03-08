import { supabaseClient } from "@/shared/lib/superbase";
import AddProfilePictureDTO from "./dto/AddProfilePictureDTO.ts";
import { v4 as uuidv4 } from "uuid";
import SupabaseError from "../../SupabaseError.ts";

const BUCKET_NAME = "profile_images";

class SuperbaseProfilePictureRepository {
  async addOne({ file }: AddProfilePictureDTO) {
    const path = uuidv4();

    const { error, data } = await supabaseClient.storage.from(BUCKET_NAME).upload(path, file);

    if (error) {
      throw new SupabaseError(error.message);
    }

    return supabaseClient.storage.from(BUCKET_NAME).getPublicUrl(data!.path).data.publicUrl;
  }
}

export default new SuperbaseProfilePictureRepository();
