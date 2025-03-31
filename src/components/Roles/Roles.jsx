import React from "react";
import RoleItem from "./RoleItem";

export default function Roles({ roles, onDelete, onUpdate }) {
  return roles.map((item, key) => {
    return (
      <RoleItem onDelete={onDelete} onUpdate={onUpdate} role={item} key={key} />
    );
  });
}
