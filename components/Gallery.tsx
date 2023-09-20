"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { images } from "@/data/categories";
import { useEffect, useState } from "react";
import { SortableItem } from "./SortableItem";
import Loader from "./Loader";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Image[]>([]);

  useEffect(() => {
    const order = localStorage.getItem("galleryOrder");

    console.log(order);

    if (order) {
      setItems(JSON.parse(order));
    } else {
      setItems(images);
    }

    setLoading(false);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const ids = items.map((item) => item.id);
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over.id);
      const updatedItems = arrayMove(items, oldIndex, newIndex);
      setItems(updatedItems);
      localStorage.setItem("galleryOrder", JSON.stringify(updatedItems));
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="container mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {items.map((item) => (
            <SortableItem key={item.id} {...item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Gallery;
