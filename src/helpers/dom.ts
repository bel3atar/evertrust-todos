export const middleY = (el: HTMLElement): number => {
  const { y, height } = el.getBoundingClientRect()
  return y + height / 2
}
