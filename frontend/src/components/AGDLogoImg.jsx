import Image from "next/image";

export function AGDLogoImg({ size = 48, style = {}, ...props }) {
  return (
    <Image
      src="/logo.png"
      alt="AGD Law Associates Logo"
      width={size}
      height={size}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      priority
      {...props}
    />
  );
}
