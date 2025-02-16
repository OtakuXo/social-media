"use client";
import React from "react";
import { TPostId } from "@/type";

function Dropdown({ postId }: TPostId) {
  const links = [
    { text: "edit", value: "/post/edit/" + postId },
    { text: "delete", value: "/post/deletepost" },
  ];
  return (
    <select
      onChange={(e) => (window.location.href = e.target.value)}
    >
      <option value="">option</option>
      {links.map((i, index) => {
        return (
          <option key={index} value={i.value}>
            {i.text}
          </option>
        );
      })}
    </select>
  );
}

export default Dropdown;
