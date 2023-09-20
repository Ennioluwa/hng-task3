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
import useStore from "@/store/store";
import { useDebounce } from "@/hooks/use-debounce";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Image[]>([]);

  const { search } = useStore();
  const debouncedValue = useDebounce<string>(search, 500);

  function searchImages(items: Image[], query: string) {
    return items
      .filter((item) => {
        // Exact tag match
        const hasExactMatch = item.tags.includes(query);

        // Partial tag match
        const hasPartialMatch = item.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        );

        // Prioritize exact matches
        if (hasExactMatch) return true;

        // Partial matches second
        if (hasPartialMatch) return true;

        return false;
      })
      .sort((a, b) => {
        // Sort exact matches first
        return a.tags.includes(query) ? -1 : 1;
      });
  }

  useEffect(() => {
    const order = localStorage.getItem("galleryOrder");

    if (!order) {
      setItems(images);
      setLoading(false);
      return;
    }
    let newOrder = JSON.parse(order);

    if (newOrder.length === 18) {
      setItems(newOrder);
    } else {
      setItems(images);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!debouncedValue) return;
    let items = searchImages(images, debouncedValue);
    setItems(items);
  }, [debouncedValue]);

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
      if (updatedItems.length === 18)
        localStorage.setItem("galleryOrder", JSON.stringify(updatedItems));
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (!items.length)
    return (
      <p className="container mx-auto p-5 text-white text-3xl font-black py-20">
        No pictures found
      </p>
    );

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
