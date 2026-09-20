import { supabase } from "../supabaseClient";

// upload a file
export async function uploadFile(bucketName, path, file) {
  return await supabase.storage.from(bucketName).upload(path, file);
}

// get public URL
export function getPublicUrl(bucketName, path) {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
}

// download a file
export async function downloadFile(bucketName, path) {
  return await supabase.storage.from(bucketName).download(path);
}
