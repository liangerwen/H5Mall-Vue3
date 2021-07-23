import dayjs from 'dayjs'

function parseIntWithoutCarry(num: number) {
  return parseInt(num.toString())
}

//格式化金钱
export function convertMoney(money: number): string {
  if (!money || Number.isNaN(Number(money)) || money < 0) {
    return (0).toFixed(2)
  }
  return (money / 100).toFixed(2)
}

//格式化时间戳
export function parseTime(
  date: number | string,
  format: undefined | string
): string {
  if (!date) return '--'
  const dateStr = dayjs(date).format(format)
  return dateStr === 'Invalid Date' ? '--' : dateStr
}

//格式化百分比
export function parsePercentage(num: number | string) {
  const _num = Number(num)
  if (!num || Number.isNaN(_num) || _num < 0) {
    return '0%'
  }
  return parseIntWithoutCarry(_num * 100) + '%'
}

//格式化约数
export function parseAFew(num: number | string) {
  const _num = Number(num)
  if (!num || Number.isNaN(_num) || _num < 0) {
    return '0'
  }
  if (_num >= 10000) {
    return parseIntWithoutCarry(_num / 10000) + '万'
  } else {
    return parseIntWithoutCarry(_num)
  }
}

//格式化时间段
export function parseTimeBucket(time: number) {
  if (!time || Number.isNaN(Number(time)) || time < 0) {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }
  const hours = parseIntWithoutCarry(time / 3600)
  const minutes = parseIntWithoutCarry((time - hours * 3600) / 60)
  const seconds = time - hours * 3600 - minutes * 60

  return {
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds
  }
}
