export default function Container({ className = "", page, ...props }) {
  const classNames = `mx-auto w-full max-w-[950px] ${
    page ? "mt-[100px] mb-[100px]" : ""
  } ${className}`;

  return <div className={classNames} {...props} />;
}
