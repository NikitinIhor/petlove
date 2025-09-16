"use client";

import { NextPage } from "next";
import Highlighter from "react-highlight-words";

interface FormatOptionLabelProps {
  label: string;
  searchValue: string;
}

const FormatOptionLabel: NextPage<FormatOptionLabelProps> = ({
  label,
  searchValue,
}) => {
  return (
    <Highlighter
      searchWords={[searchValue]}
      autoEscape={true}
      textToHighlight={label}
    />
  );
};

export default FormatOptionLabel;
