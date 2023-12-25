export default function PostTitle({ children }) {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tighter text-white leading-tight md:leading-none text-center md:text-left">
      {children}
    </h1>
  )
}
