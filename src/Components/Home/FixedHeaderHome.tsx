import React, { useState } from "react";
import { clsx } from "clsx";
import { FaSearch, FaFilter } from "react-icons/fa";
import Link from "next/link";
import { CommonHeaderContainer } from "../shared/CommonHeaderContainer";
import { Row } from "../shared/Row";

export type ClassName = {
  className?: string;
};
export type ReactWithChildren = {
  children: React.ReactNode;
};

export const FixedHeaderHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CommonHeaderContainer
      title="Minha lista"
      rendeRight={() => (
        <Row className="space-x-4 text-gray-200 ">
          <button onClick={() => console.log("TODO")}>
            <FaSearch stroke="1" />
          </button>
          <button onClick={() => console.log("TODO")}>
            <FaFilter stroke="1" />
          </button>
        </Row>
      )}
      renderLeft={() => (
        <Link href={"/"}>
          <a
            href="#"
            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white "
          >
            📕
          </a>
        </Link>
      )}
    />
  );
};
export const PanelCommonHeader = ({ children, className = "" }) => {
  return <div className={clsx("py-2", className)}>{children}</div>;
};
