import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import MonacoEditor from "@monaco-editor/react";
import { twMerge } from "tailwind-merge";

interface EditorProps {
  defaultValue?: string;
  onChangeText?: (event: Event) => void;
  className?: React.ComponentProps<"div">["className"];
  theme?: "vs-dark" | "vs-light";
  language?: string;
  readonly?: boolean;
  lineNumbers?: "off" | "on" | "interval" | "relative";
}

export default function Editor({
  onChangeText,
  className,
  defaultValue,
  language,
  theme,
  readonly,
  lineNumbers,
}: EditorProps) {
  useEffect(() => {
    // setEditorTheme(monaco);
  }, []);
  return (
    <MonacoEditor
      className={twMerge("h-[40vh] bg-dark-200", className)}
      defaultLanguage={language ?? "typescript"}
      defaultValue={"\n" + defaultValue ?? "// some comment"}
      theme={theme ?? "vs-dark"}
      onChange={(e: any) => {
        onChangeText && onChangeText(e.target.value);
      }}
      options={{
        readOnly: readonly,
        domReadOnly: true,
        lineNumbers,
      }}
    />
  );
}
