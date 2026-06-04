import React from "react";
import Image from "next/image";
import type { SanityImageSource } from "../lib/types";

interface AvatarProps {
  image?: string;
  size?: "sm" | "md" | "lg";
  alt?: string;
  className?: string;
  name?: string;
  picture?: SanityImageSource;
}

function Avatar(props: AvatarProps) {
  const { image, size = "md", alt, className } = props;

  const classes = {
    size: {
      sm: "w-16 h-16",
      md: "w-20 h-20",
      lg: "w-28 h-28",
    },
  };

  return (
    <span
      className={
        `block rounded-full overflow-hidden ${classes.size[size]}` +
        (className ? ` ${className}` : "")
      }
    >
      <Image src={image ?? ""} fill alt={alt ?? ""} />
    </span>
  );
}

export default Avatar;
