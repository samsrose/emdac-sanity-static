import Image from "next/image";
import { urlForImage } from "@/lib/sanity/client";
import type { SanityImageRef } from "@/lib/types/sanity";

interface CoverImageProps {
  title: string;
  slug?: string;
  image?: SanityImageRef;
  priority?: boolean;
  /**
   * Responsive `sizes` attribute. Defaults to a 3-column grid layout
   * (`/` and `/posts/[slug]` more-stories), which is the dominant
   * caller in this app today.
   */
  sizes?: string;
}

const DEFAULT_SIZES = "(min-width: 1280px) 416px, (min-width: 768px) 33vw, 100vw";

export function CoverImage({
  title,
  image,
  priority,
  sizes = DEFAULT_SIZES,
}: CoverImageProps) {
  if (!image?.asset?._ref) {
    return (
      <div
        aria-hidden="true"
        style={{ paddingTop: "25%", backgroundColor: "#ddd" }}
      />
    );
  }

  return (
    <div className="sm:mx-0">
      <Image
        className="w-full h-auto rounded-lg"
        width={500}
        height={300}
        alt={`Cover Image for ${title}`}
        src={urlForImage(image).height(300).width(500).url()}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
