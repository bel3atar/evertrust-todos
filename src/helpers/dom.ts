export const middleY = (el: HTMLElement): number => {
  const { y, height } = el.getBoundingClientRect()
  return y + height / 2
}

export const findDropPosition = ({
  elementsList,
  mouseY,
}: {
  elementsList: HTMLElement[]
  mouseY: number
}) => {
  const lastIdx = elementsList.length - 1
  // determine the range within which the mouse has dropped
  // for a list with n elements there are n+1 possible drop positions
  for (let i = 0; i <= elementsList.length; ++i) {
    const isFirst = i === 0
    const isLast = i === elementsList.length
    const rangeStart = isFirst
      ? -Infinity
      : isLast
        ? middleY(elementsList[lastIdx])
        : middleY(elementsList[i - 1])
    const rangeEnd = isFirst
      ? middleY(elementsList[0])
      : isLast
        ? +Infinity
        : middleY(elementsList[i])
    const isMouseInRange = mouseY >= rangeStart && mouseY < rangeEnd
    if (isMouseInRange) return i
  }
}
