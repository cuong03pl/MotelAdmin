import React from "react";
import BookingItem from "./BookingItem";

export default function Booking({ bookings }) {
  return bookings?.map((item, key) => {
    console.log(item);

    return <BookingItem booking={item} key={key} />;
  });
}
