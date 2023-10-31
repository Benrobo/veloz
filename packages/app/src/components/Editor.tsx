import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import MonacoEditor from "@monaco-editor/react";
import { twMerge } from "tailwind-merge";

interface EditorProps {
  defaultValue?: string;
  onChangeText: (event: Event) => void;
  className?: React.ComponentProps<"div">["className"];
  theme?: "vs-dark" | "vs-light";
  language?: string;
}

export default function Editor({
  onChangeText,
  className,
  defaultValue,
  language,
  theme,
}: EditorProps) {
  useEffect(() => {
    setEditorTheme(monaco);
  }, []);
  return (
    <MonacoEditor
      className={twMerge("h-[30vh] bg-dark-200", className)}
      defaultLanguage={language ?? "typescript"}
      defaultValue={defaultValue ?? "// some comment"}
      //   theme={theme ?? "vs-dark"}
      onChange={(e: any) => {
        onChangeText(e.target.value);
      }}
      beforeMount={setEditorTheme}
    />
  );
}

function setEditorTheme(monaco: any) {
  monaco.editor.defineTheme("onedark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "comment",
        foreground: "#5d7988",
        fontStyle: "italic",
      },
      { token: "constant", foreground: "#e06c75" },
    ],
    colors: {
      "editor.background": "#24202d",
    },
  });
}
