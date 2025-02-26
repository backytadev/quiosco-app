"use client";

import { useState } from "react";

import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

import { getImagePath } from "@/src/utils";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          if (typeof result.info !== "string" && result.info?.secure_url) {
            widget.close();
            setImageUrl(result.info.secure_url);
          }
        }
      }}
      uploadPreset="preset-next-quiosco"
      options={{
        maxFiles: 1,
        maxFileSize: 5000000,
        folder: "quiosco-images",
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      }}
    >
      {({ open }) => (
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-slate-700 dark:text-white">
            Imagen del Producto
          </label>

          <div
            onClick={() => open()}
            className="relative cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out p-6 
            border-2 border-dashed border-gray-300 dark:border-gray-800 
            flex flex-col justify-center items-center gap-3 text-gray-600 dark:text-gray-300
            bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:ring-2 hover:ring-indigo-500"
          >
            <TbPhotoPlus
              size={50}
              className="text-indigo-600 dark:text-indigo-400"
            />
            <p className="text-lg font-medium">Agregar Imagen</p>

            {imageUrl && (
              <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden dark:bg-slate-800 bg-slate-50">
                <Image
                  src={imageUrl}
                  alt="Imagen del producto"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>

          {image && !imageUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Imagen Actual:
              </p>
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md border border-gray-300 dark:border-gray-700">
                <Image
                  fill
                  src={getImagePath(image)}
                  alt="Imagen del producto"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}

          <input
            type="hidden"
            name="image"
            defaultValue={imageUrl ? imageUrl : image}
          />
        </div>
      )}
    </CldUploadWidget>
  );
}
