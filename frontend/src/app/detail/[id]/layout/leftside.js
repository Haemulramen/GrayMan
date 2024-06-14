export default function LeftSide({ children, className }) {
  const combinedClassName = `justify-center text-center w-full border brac p-10 ${
    className || ""
  }`;
  return <div className={combinedClassName}>{children}</div>;
}
