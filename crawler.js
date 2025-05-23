const { JSDOM } = require("jsdom")

function getURLsFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) == "/") {
            // relative
            try {
                const url = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(url.href)
            } catch(err) {
                console.log(`Error: ${err.message}`)
            }
        } else {
            // absolute
            try {
                const url = new URL(linkElement.href)
                urls.push(url.href)
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeUrl(urlString) {
    const url = new URL(urlString)

    let host = `${url.hostname}${url.pathname}`
    if (host.length > 0 && host.slice(-1) === "/") {
        host = host.slice(0, -1)
    }
    
    return host
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML
}