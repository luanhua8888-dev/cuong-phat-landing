declare module '*.png' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}

// Vite import.meta.glob types
interface ImportMeta {
  glob: (pattern: string, options?: { eager?: boolean; as?: string }) => Record<string, any>
}



