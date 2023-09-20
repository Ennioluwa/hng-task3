import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export const SortableItem: FC<Image> = ({ id, src, name, tags }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...attributes}
      {...listeners}
    >
      <div className="relative w-full h-[450px] bg-white rounded">
        <Image
          src={src}
          placeholder="blur"
          blurDataURL="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          alt={name}
          fill
          className="object-cover rounded"
        />
        <div className=" absolute bottom-3 left-3 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              className=" border border-slate-600 text-white p-1 py-[2px] rounded-md bg-slate-600 bg-opacity-50 text-xs font-medium "
              key={i}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
