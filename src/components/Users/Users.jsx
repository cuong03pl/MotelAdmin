import React from "react";
import UserItem from "./UserItem";

export default function Users({ users, onDelete, onSetRole }) {
  return users.map((item, key) => {
    return (
      <UserItem
        onDelete={onDelete}
        onSetRole={onSetRole}
        user={item}
        key={key}
      />
    );
  });
}
