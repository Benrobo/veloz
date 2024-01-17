interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
  color?: string;
  svgCss?: React.ComponentProps<"div">["className"];
  pathCss?: React.ComponentProps<"div">["className"];
}

export const HomeIcon = ({
  fill,
  height,
  width,
  color,
  svgCss,
  pathCss,
}: IconProps) => (
  <svg
    width={width ?? "128"}
    height={height ?? "128"}
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
    className={svgCss}
  >
    <path
      fill={fill ?? "#000000"}
      className={pathCss}
      d="M7.825.12a.5.5 0 0 0-.65 0L0 6.27v7.23A1.5 1.5 0 0 0 1.5 15h4a.5.5 0 0 0 .5-.5v-3a1.5 1.5 0 0 1 3 0v3a.5.5 0 0 0 .5.5h4a1.5 1.5 0 0 0 1.5-1.5V6.27L7.825.12Z"
    />
  </svg>
);

export const ProjectIcon = ({
  fill,
  height,
  width,
  color,
  svgCss,
  pathCss,
}: IconProps) => (
  <svg
    width={width ?? "128"}
    height={height ?? "128"}
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
    className={svgCss}
  >
    <path
      fill={fill ?? "#000000"}
      className={pathCss}
      fillRule="evenodd"
      d="m9.5 14.5l-6-2.5V4l6-2.5v13Zm-6.885-1.244A1 1 0 0 1 2 12.333V3.667a1 1 0 0 1 .615-.923L8.923.115A1.5 1.5 0 0 1 11 1.5V2h1.25c.966 0 1.75.783 1.75 1.75v8.5A1.75 1.75 0 0 1 12.25 14H11v.5a1.5 1.5 0 0 1-2.077 1.385l-6.308-2.629ZM11 12.5h1.25a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H11v9Z"
      clipRule="evenodd"
    />
  </svg>
);

export const MoneyIcon = ({
  fill,
  height,
  width,
  color,
  svgCss,
  pathCss,
}: IconProps) => (
  <svg
    width={width ?? "128"}
    height={height ?? "128"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={fill ?? "#000000"}
      className={pathCss}
      d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"
    />
    <path
      fill={fill ?? "#000000"}
      className={pathCss}
      d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"
    />
  </svg>
);
