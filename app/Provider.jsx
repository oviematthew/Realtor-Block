import React from "react";
import Header from "./_components/Header";

export default function Provider({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-20">{children}</div>
    </div>
  );
}
