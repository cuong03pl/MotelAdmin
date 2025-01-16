import React from "react";
import ReportItem from "./ReportItem";

export default function Reports({ reports, onDelete }) {
  return reports.map((item, key) => {
    return <ReportItem onDelete={onDelete} report={item} key={key} />;
  });
}
