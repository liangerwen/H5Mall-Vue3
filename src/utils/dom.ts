export function getTranslateValue(dom: HTMLElement) {
  const transform = dom.style.transform
  return transform
    ? transform
        .replace(/[ ()(px)(translate)]/g, '')
        .split(',')
        .map((i: string) => (i ? Number(i) : 0))
    : [0, 0]
}

export function setTranslateX(dom: HTMLElement, val: number) {
  const [, y] = getTranslateValue(dom)
  dom.style.transform = `translate(${val}px, ${y}px)`
}

export function setTranslateY(dom: HTMLElement, val: number) {
  const [x] = getTranslateValue(dom)
  dom.style.transform = `translate(${x}px, ${val}px)`
}

export function setTranslate(dom: HTMLElement, val: number[]) {
  dom.style.transform = `translate(${val[0]}px, ${val[1]}px)`
}

export function $(domName: string) {
  return document.querySelector(domName)
}
