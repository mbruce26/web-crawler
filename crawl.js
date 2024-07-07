import { JSDOM } from 'jsdom'

async function crawlPage(baseURL, currentURL, pages) {
    const currentURLObj = new URL(currentURL)
    const baseURLObj = new URL(baseURL)
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }

    const normalURL = normalizeURL(currentURL)

    if (pages[normalURL] > 0) {
        pages[normalURL]++
        return pages
    }

    pages[normalURL] = 1

    console.log(`Crawling: ${normalURL}`)
    let htmlBody = ''
    try{
        const response = await fetch(currentURL)
        if (response.status > 399) {
            console.log('HTTP Error')
            return pages
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Incorrect content-type. Received ${contentType}`)
            return pages
        }
        htmlBody = await response.text()
    } catch (err) {
        console.log(err.message)
    }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)
    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages
}

async function crawlPage2(baseURL, currentURL=baseURL, pages={}) {
    const base = new URL(baseURL)
    const current = new URL(currentURL)

    if (base.hostname !== current.hostname){
        return pages
    }
    
    const normalCurr = normalizeURL(currentURL)

    if (pages[normalCurr] > 0) {
        pages[normalCurr]++
        return pages
    } 
    
    pages[normalCurr] = 1
    
    console.log(`Crawling ${currentURL}`)

    let htmlBody = ''

    try{
        htmlBody = await fetchBody(currentURL)
    } catch(err) {
        console.log(err.message)
        return pages
    }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    for (const nextURL of nextURLs) {
        pages = await crawlPage2(baseURL, nextURL, pages)
    }

    return pages
}

async function fetchBody(currentURL) {
    const response = await fetch(currentURL)

    if (response.status > 399) {
        throw new Error(`Got HTTP error: ${response.status} ${response.statusText}`)
    }
    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')) {
        throw new Error(`Incorrect content-type. Received ${contentType}`)
    }
    return response.text()
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    let normalUrl = urlObj.hostname + urlObj.pathname
    if (normalUrl.length > 0 && normalUrl.slice(-1) === '/') {
        normalUrl = normalUrl.slice(0, -1)
    }
    return normalUrl
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')
    const urls = []
    for (const url of anchors) {
        if (url.hasAttribute('href')) {
            let href = url.getAttribute('href')
            try {
                href = new URL(href, baseURL).href
                urls.push(href)
            } catch(err) {
                console.log(`${err.message}: ${href}`)
            }
       }
    }
    return urls
}

export {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
    crawlPage2
} 