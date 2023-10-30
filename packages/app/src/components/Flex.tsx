import { ReactNode } from "react";

interface FlexProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export function FlexColStart({ children, ...props }: FlexProps) {
  return (
    <div className="w-auto flex flex-col items-start justify-start" {...props}>
      {children}
    </div>
  );
}

export function FlexColCenter({ children, ...props }: FlexProps) {
  return (
    <div
      className="w-auto flex flex-col items-center justify-center"
      {...props}
    >
      {children}
    </div>
  );
}

export function FlexRowStart({ children, ...props }: FlexProps) {
  return (
    <div className="w-auto flex items-start justify-start" {...props}>
      {children}
    </div>
  );
}

export function FlexRowStartBtw({ children, ...props }: FlexProps) {
  return (
    <div className="w-auto flex items-start justify-between" {...props}>
      {children}
    </div>
  );
}

export function FlexRowCenter({ children, ...props }: FlexProps) {
  return (
    <div className="w-auto flex items-center justify-center" {...props}>
      {children}
    </div>
  );
}

export function FlexRowCenterBtw({ children, ...props }: FlexProps) {
  return (
    <div className="w-auto flex items-center justify-between" {...props}>
      {children}
    </div>
  );
}
