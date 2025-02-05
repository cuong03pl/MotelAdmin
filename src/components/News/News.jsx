import React from "react";
import NewsItem from "./NewsItem";

export default function News({ news, onDelete, onUpdate }) {
  return news?.map((item, key) => {
    return (
      <NewsItem onDelete={onDelete} onUpdate={onUpdate} news={item} key={key} />
    );
  });
}
