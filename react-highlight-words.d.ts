declare module "react-highlight-words" {
  import { ComponentType } from "react";

  interface HighlighterProps {
    searchWords: string[];
    textToHighlight: string;
    highlightClassName?: string;
    autoEscape?: boolean;
    caseSensitive?: boolean;
    sanitize?: (text: string) => string;
  }

  const Highlighter: ComponentType<HighlighterProps>;

  export default Highlighter;
}
