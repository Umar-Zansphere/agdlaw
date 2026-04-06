import Image from "next/image";

export function AGDLogoImg({ size = 48, style = {}, ...props }) {
  return (
    <Image
      src="/logo.svg"
      alt="AGD Law Associates Logo"
      width={size}
      height={size}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        width: size,
        height: "auto",
        ...style,
      }}
      priority
      {...props}
    />
  );
}
