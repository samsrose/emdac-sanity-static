import Link from "next/link"
import markdownStyles from './markdown-styles.module.css'
import { PortableText, type PortableTextProps } from '@portabletext/react'
import { PortableTextBlocks } from '../lib/types'

interface PostBodyProps {
  content?: PortableTextBlocks;
  buttonLink?: string;
}

export default function PostBody({ content, buttonLink }: PostBodyProps) {
  return (
    <div className={`max-w-2xl mt-0 pt-0 mb-12 mx-auto text-white ${markdownStyles.markdown}`}>
      <PortableText value={content as PortableTextProps['value']} />
      <br/>
      {buttonLink ? <Link className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-500/90 transition" href={`${buttonLink}`}>Learn more</Link> : <> </>}
    </div>
  )
}
