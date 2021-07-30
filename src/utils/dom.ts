export function $(domName: string) {
  return document.querySelector(domName)
}

export function scrollAnimation(
  dom: HTMLElement,
  targetTop: number,
  time: number
) {
  if (!dom || time < 0 || targetTop < 0) {
    return
  }
  if (time < 20) {
    dom.scrollTop = targetTop
    return
  }
  const distance = targetTop - dom.scrollTop
  if (distance === 0) return
  const timer = setInterval(() => {
    const unit = distance / (time / 20)
    if (distance > 0 && dom.scrollTop + unit > targetTop) {
      dom.scrollTop = targetTop
      clearInterval(timer)
      return
    }
    if (distance < 0 && dom.scrollTop + unit < targetTop) {
      dom.scrollTop = targetTop
      clearInterval(timer)
      return
    }
    dom.scrollTop += unit
  }, 20)
  return timer
}
