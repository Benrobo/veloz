import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import MonacoEditor from "@monaco-editor/react";
import { twMerge } from "tailwind-merge";

const customTheme = {
  base: "vs-dark",
  inherit: true,
  colors: {
    // Define your custom colors here
    "editor.background": "#282c34", // Bg color
    "editor.foreground": "#abb2bf", // Text color
    "editor.lineHighlightBackground": "#373d49", // Line highlight color
    // Add more color overrides as needed`
  },
};

// monaco.editor.defineTheme("custom-theme", customTheme as any);

// monaco.editor.setTheme("custom-theme");

interface EditorProps extends React.HTMLProps<HTMLDivElement> {
  defaultValue?: string;
  onChangeText?: (event: Event) => void;
  className?: React.ComponentProps<"div">["className"];
  theme?: "vs-dark" | "vs-light";
  language?: string;
  readonly?: boolean;
  lineNumbers?: "off" | "on" | "interval" | "relative";
  wordWrap?: "off" | "on";
  pathName?: string;
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
  pathName,
  ...props
}: EditorProps) {
  const [editorHeight, setEditorHeight] = useState(0);
  const container = useRef(null);

  useEffect(() => {
    const containerHeight =
      (container?.current as any)?.scrollHeight +
        (defaultValue as string)?.length ?? 0;
    setEditorHeight(containerHeight);
  }, []);

  return (
    <div
      className={twMerge("h-auto bg-dark-200", className)}
      style={{
        minWidth: "300px",
        minHeight: "30px",
        height: `${editorHeight}px`,
      }}
      ref={container}
      {...props}
    >
      <MonacoEditor
        defaultLanguage={language ?? "typescript"}
        defaultValue={defaultValue ?? "// some comment"}
        theme={theme ?? "vs-dark"}
        onChange={(e: any) => {
          onChangeText && onChangeText(e.target.value);
        }}
        path={pathName}
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
