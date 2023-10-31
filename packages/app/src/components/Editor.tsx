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
  wordWrap?: "off" | "on";
}

export default function Editor({
  onChangeText,
  className,
  defaultValue,
  language,
  theme,
  readonly,
  lineNumbers,
  wordWrap,
}: EditorProps) {
  const [editorHeight, setEditorHeight] = useState(0);
  const container = useRef(null);

  useEffect(() => {
    const containerHeight =
      (container?.current as any)?.scrollHeight +
        (defaultValue as string).length ?? 0;
    setEditorHeight(containerHeight);
  }, []);

  return (
    <div
      style={{
        minHeight: "30px",
        height: `${editorHeight}px`,
      }}
      ref={container}
    >
      <MonacoEditor
        className={twMerge("h-auto bg-dark-200", className)}
        defaultLanguage={language ?? "typescript"}
        defaultValue={defaultValue ?? "// some comment"}
        theme={theme ?? "vs-dark"}
        onChange={(e: any) => {
          onChangeText && onChangeText(e.target.value);
        }}
        options={{
          readOnly: readonly,
          domReadOnly: true,
          lineNumbers,
          wordWrap,
          smoothScrolling: true,
          minimap: { enabled: false },
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
            handleMouseWheel: false,
          },
        }}
      />
    </div>
  );
}
