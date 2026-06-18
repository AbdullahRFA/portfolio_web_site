"use client";

import { useState } from "react";
import { uploadImage, getImageUrl } from "../lib/supabaseStorage";

interface ImageUploaderProps {
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  bucketName?: string;
  folderName?: string;
}

const ImageUploader = ({ 
  currentImageUrl, 
  onUploadSuccess, 
  bucketName = "portfolio-images",
  folderName = "uploads"
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      // Create a unique file path to prevent overwriting: folder/16283...-myimage.png
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folderName}/${fileName}`;

      // Upload to Supabase
      await uploadImage(file, bucketName, filePath);

      // Retrieve the public URL
      const publicUrl = getImageUrl(bucketName, filePath);
      
      // Pass it back to the parent form
      onUploadSuccess(publicUrl);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-1 flex flex-col gap-3">
      {/* Image Preview */}
      {currentImageUrl ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 group">
          <img 
            src={currentImageUrl} 
            alt="Uploaded preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Image Saved</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-40 rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 flex flex-col items-center justify-center text-zinc-500">
          <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs uppercase tracking-widest font-bold">No image selected</span>
        </div>
      )}

      {/* Upload Controls */}
      <div className="flex items-center gap-4">
        <label className="relative cursor-pointer px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs font-bold text-zinc-200 transition-colors shadow-sm">
          {isUploading ? "Uploading..." : "Choose File"}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
        
        {/* Manual fallback input just in case */}
        <input 
          type="text"
          value={currentImageUrl || ""}
          onChange={(e) => onUploadSuccess(e.target.value)}
          placeholder="Or paste URL here..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 outline-none focus:border-cyan-500"
        />
      </div>
      
      {error && <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">{error}</p>}
    </div>
  );
};

export default ImageUploader;