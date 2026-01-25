"use client";

import React from "react";
import NextImage from "@/packages/ui/src/atoms/image";
import Section from "@/packages/ui/src/atoms/section";
import { X } from "lucide-react";

function FruitImageView({
  imageSrc,
  title,
  onDeleteImage,
  isEditCard,
}: {
  title: string;
  imageSrc: string;
  isEditCard: boolean;
  onDeleteImage: (imageSrc: string) => void;
  }) {
  return (
    <Section className="relative group overflow-hidden rounded-2xl aspect-square bg-stone-50 border border-emarald-200">
      <NextImage
        width={180}
        height={180}
        src={imageSrc}
        alt={title || "Fruit image"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120"
      />
      {isEditCard && (
        <div className="absolute top-1 right-1 z-20 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <X
            className="cursor-pointer rounded-full text-ghost-apple w-7 h-7 p-1 shadow-lg group-hover:bg-watermelon transition-colors"
            onClick={() => onDeleteImage(imageSrc)}
          />
        </div>
      )}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <span className="text-white text-[10px] font-bold uppercase tracking-widest">
          View Full Resolution
        </span>
      </div>
    </Section>
  );
}

export default FruitImageView;
