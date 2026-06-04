import React from "react";

interface BackgroundImageProps {
  image?: string;
  opacity?: number | string;
  repeat?: boolean;
}

function BackgroundImage(props: BackgroundImageProps) {
  return (
    <div
      className={
        "bg-[image:var(--image)] opacity-[var(--opacity)] absolute top-0 left-0 bottom-0 right-0 z-0" +
        (props.repeat ? " bg-auto bg-left-top bg-repeat" : "") +
        (!props.repeat ? " bg-center bg-cover" : "")
      }
      style={{
        "--image": `url("${props.image}")`,
        "--opacity": props.opacity,
      } as React.CSSProperties}
    />
  );
}

export default BackgroundImage;
