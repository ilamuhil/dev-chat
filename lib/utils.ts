function randId() {
  return (
    Math.floor(Math.random() * 1000000).toString(36) +
    Date.now().toString(36) +
    Math.floor(Math.random() * 1000000).toString(36)
  )
}

export { randId }
