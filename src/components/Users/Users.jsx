import React from "react";
import UserItem from "./UserItem";

export default function Users({ users, onDelete, onSetRole, onApprove }) {
  return users.map((item, key) => {
    return (
      <UserItem
        onDelete={onDelete}
        onSetRole={onSetRole}
        onApprove={onApprove}
        user={item}
        key={key}
      />
    );
  });
}
