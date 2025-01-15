import React from "react";
import PostItem from "./PostItem";

export default function Posts({ posts, onDelete }) {
  return posts.map((item, key) => {
    return <PostItem onDelete={onDelete} post={item} key={key} />;
  });
}
