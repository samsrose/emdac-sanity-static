import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'

export default function PostBody({ content }) {
  return (
    <div className={`max-w-2xl mt-0 pt-0 mb-12 mx-auto text-white ${markdownStyles.markdown}`}>
      <PortableText value={content} />
    </div>
  )
}
