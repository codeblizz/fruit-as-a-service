import React from "react";
import { cn } from "@/packages/helpers/src/utils";
import { AlertCircle, Camera, Trash2 } from "lucide-react";

function ImagePreviewer({
  className,
  MIN_IMAGES,
  removeImage,
  selectedFiles,
  imagePreviews,
  handleImageChange,
}: any) {
  const isActualImageLength = selectedFiles.length === MIN_IMAGES;
  return (
    <div
      className={cn(
        "bg-ghost-apple p-6 rounded-lg border border-slate-100",
        className
      )}
    >
      <div className="w-full flex justify-between items-center gap-x-2">
        <label
          className={cn(
            "aspect-square w-24 p-3 text-center bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center transition-all group",
            isActualImageLength
              ? "hover:border-slate-200 hover:bg-slate-50/50 cursor-not-allowed"
              : "hover:border-emerald-400 hover:bg-emerald-50/50 cursor-pointer"
          )}
        >
          <Camera
            className={cn(
              "w-6 h-6 transition-colors",
              isActualImageLength
                ? "text-slate-200 group-hover:text-slate-200"
                : "text-slate-300 group-hover:text-emerald-500"
            )}
          />
          <span className="text-[8px] w-full font-black text-slate-400 mt-2">
            ADD PHOTO
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className={cn(
              "hidden",
              isActualImageLength ? "cursor-not-allowed" : "cursor-pointer"
            )}
            onChange={handleImageChange}
            disabled={isActualImageLength ? true : false}
          />
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full">
          {imagePreviews.map((src: any, idx: number) => (
            <div key={idx} className="relative aspect-square w-auto group">
              <img
                src={src}
                alt="Preview"
                className="w-24 h-full object-cover rounded-2xl border-2 border-white shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 cursor-pointer bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs">
        <AlertCircle
          className={`w-4 h-4 ${
            selectedFiles.length < MIN_IMAGES
              ? "text-amber-500"
              : "text-emerald-500"
          }`}
        />
        <span
          className={`font-bold ${
            selectedFiles.length < MIN_IMAGES
              ? "text-slate-400"
              : "text-emerald-600"
          }`}
        >
          {selectedFiles.length} of {MIN_IMAGES} required high-res images
          uploaded
        </span>
      </div>
    </div>
  );
}

export default ImagePreviewer;
