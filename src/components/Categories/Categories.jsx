import React from "react";
import CategoryItem from "./CategoryItem";

export default function Categories({ categories, onUpdate, onDelete }) {
  return categories?.map((item, key) => {
    return (
      <CategoryItem
        category={item}
        onUpdate={onUpdate}
        onDelete={onDelete}
        key={key}
      />
    );
  });
}
