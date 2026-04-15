import Image from "next/image";

export function AGDLogoImg({ size = 56, style = {}, ...props }) {
  return (
    <Image
      src="/logo1.png"
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
