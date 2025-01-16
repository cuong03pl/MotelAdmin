import React from "react";
import ReviewItem from "./ReviewItem";

export default function Reviews({ reviews, onDelete }) {
  return reviews.map((item, key) => {
    return <ReviewItem onDelete={onDelete} review={item} key={key} />;
  });
}
