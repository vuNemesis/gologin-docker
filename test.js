const puppeteer = require('puppeteer-core')

const getOrbitaWsUrl = async () => {
  const orbitaPort = 3000
  const res = await fetch(`http://127.0.0.1:${orbitaPort}/json/version`)
  let wsUrl = (await res.json()).webSocketDebuggerUrl

  return wsUrl.replace('/127.0.0.1/', `/127.0.0.1:${orbitaPort}/`)
}

;(async () => {
  try {
    const orbitaWsUrl = await getOrbitaWsUrl()

    const browser = await puppeteer.connect({
      //   browserURL: "http://127.0.0.1:3000",
      browserWSEndpoint: orbitaWsUrl,
      ignoreHTTPSErrors: true,
    })

    let pages = await browser.pages()
    let page = pages[0]
    await page.goto('https://myip.link/mini')
    console.log(await page.content())
  } catch (e) {
    console.error(e)
  }
})()
