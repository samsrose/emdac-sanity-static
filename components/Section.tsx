import React from "react";
import BackgroundImage from "../components/BackgroundImage";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  textColor?: string;
  bgImage?: string;
  bgImageOpacity?: number | string;
  bgImageRepeat?: boolean;
}

function Section(props: SectionProps) {
  const {
    size,
    bgColor = "bg-white",
    textColor,
    bgImage,
    bgImageOpacity,
    bgImageRepeat,
    className,
    children,
    ...otherProps
  } = props;

  return (
    <section
      className={
        "section relative" +
        (bgColor ? ` ${bgColor}` : "") +
        (textColor ? ` ${textColor}` : "") +
        (className ? ` ${className}` : "")
      }
      {...otherProps}
    >
      {bgImage && (
        <BackgroundImage
          image={bgImage}
          opacity={bgImageOpacity}
          repeat={bgImageRepeat}
        />
      )}

      <div
        className={
          "[&>.container]:relative" +
          (size === "sm" ? " py-10" : "") +
          (size === "md" ? " py-10 md:py-20" : "") +
          (size === "lg" ? " py-10 md:py-32" : "")
        }
      >
        {props.children}
      </div>
    </section>
  );
}

export default Section;
