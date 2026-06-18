import { supabase } from "./supabase";

/**
 * Uploads an image file to a specific Supabase storage bucket.
 * @param file The image file to upload.
 * @param bucket The name of your Supabase storage bucket (e.g., 'portfolio-images').
 * @param path The path/filename to save it as (e.g., 'projects/ecommerce-app.png').
 */
export const uploadImage = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true, // Overwrite if the file already exists
    });

  if (error) throw error;
  return data;
};

/**
 * Retrieves the public URL of an image stored in Supabase.
 * @param bucket The name of your Supabase storage bucket.
 * @param path The file path inside the bucket.
 */
export const getImageUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
