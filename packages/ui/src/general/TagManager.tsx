import * as React from "react";
const { useState } = React;
import { LocalTag } from "@nofrixion/utils/types";
import { AddTag } from "./AddTag";
import { Tag } from "./Tag";
import { AnimatePresence } from "framer-motion";

interface TagManagerProps {
  tags: LocalTag[];
  availableTags: LocalTag[];
  onDeleted: (id: string) => void;
  onAdded: (tag: LocalTag) => void;
  onCreated: (tag: LocalTag) => void;
}

export const TagManager = ({ tags, availableTags, onDeleted, onAdded, onCreated }: TagManagerProps) => {
  const [tagsArray, setTagsArray] = useState(tags);

  const handleDelete = (id: string) => {
    setTagsArray(tagsArray.filter((item) => item.id !== id));

    onDeleted(id);
  };

  const handleTagAdded = (tag: LocalTag) => {
    const index = tagsArray.findIndex((item) => item.name === tag.name);

    setTagsArray([...tagsArray, tag]);

    if (index === -1) {
      onAdded(tag);
    }
  };

  const handleTagCreated = (tag: LocalTag) => {
    setTagsArray([...tagsArray, tag]);

    onCreated(tag);
  };

  return (
    <div className="flex flex-wrap w-auto gap-x-2 gap-y-2">
      <AnimatePresence>
        {tagsArray.map((tag) => (
          <Tag key={tag.id} id={tag.id!} label={tag.name} onDelete={handleDelete} />
        ))}
        <AddTag
          key="addtag"
          tags={tagsArray}
          availableTags={availableTags}
          onTagAdded={handleTagAdded}
          onTagCreated={handleTagCreated}
        />
      </AnimatePresence>
    </div>
  );
};
