// 延迟响应数据
export function delayResponse(data, time = 1000) {
  return async (_req, res) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, time)
    })
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(
      JSON.stringify({
        code: 1,
        message: 'success',
        data
      })
    )
  }
}
