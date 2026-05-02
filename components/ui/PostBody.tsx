import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import styles from "./PostBody.module.css";

interface PostBodyProps {
  title?: string;
  content?: PortableTextBlock[];
  buttonLink?: string;
  buttonName?: string;
}

export function PostBody({ title, content, buttonLink, buttonName }: PostBodyProps) {
  return (
    <div className="overflow-hidden bg-gray-900 px-6 py-16 lg:px-8 xl:py-36">
      <div className="mx-auto max-w-max lg:max-w-7xl">
        {title && (
          <header className="relative z-10 mb-8 md:mb-2 md:px-6">
            <div className="max-w-prose text-base lg:max-w-none">
              <p className="font-semibold text-2xl leading-6 text-gray-400">
                In The News
              </p>
              <h1 className="mt-4 mb-6 text-3xl font-bold leading-8 tracking-tight text-gray-300 sm:text-4xl">
                {title}
              </h1>
            </div>
          </header>
        )}
        <div className="relative md:bg-gray-800 md:p-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            <div className="text-gray-500 lg:max-w-none">
              <div
                className={`prose prose-lg prose-indigo text-gray-400 mx-auto ${styles.markdown}`}
              >
                {content && <PortableText value={content} />}
              </div>
              {buttonLink && (
                <Link
                  className="px-4 py-2 my-4 bg-indigo-500 text-white rounded hover:bg-indigo-500/90 transition inline-block"
                  href={buttonLink}
                >
                  {buttonName ?? "Learn More"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
