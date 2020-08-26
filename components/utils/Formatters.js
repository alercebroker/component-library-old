function formatClassifierName(name) {
  name = name.replace(/[$-/:-?{-~!"^_`]/g, (c) => ' ')
  return name.replace(/\b\w/g, (c) => c.toUpperCase())
}

export { formatClassifierName }
