"use client";

import { CldUploadWidget } from "next-cloudinary";

export default function LogoUpload({
  onUploadSuccess,
}: {
  onUploadSuccess: (url: string) => void;
}) {
  return (
    <CldUploadWidget
      uploadPreset="festival_poster"
      onSuccess={(result: any) => {
        console.log(
          "CLOUDINARY RESULT:",
          result
        );

        const url =
          result?.info?.secure_url;

        console.log(
          "CLOUDINARY URL:",
          url
        );

        if (url) {
          onUploadSuccess(url);
        } else {
          console.error(
            "Cloudinary URL not found"
          );
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="border p-3 rounded w-full"
        >
          Upload Logo
        </button>
      )}
    </CldUploadWidget>
  );
}