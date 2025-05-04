function normalizeUrl(urlString) {
    const url = new URL(urlString)

    let host = `${url.hostname}${url.pathname}`
    if (host.length > 0 && host.slice(-1) === "/") {
        host = host.slice(0, -1)
    }
    
    return host
}

module.exports = {
    normalizeUrl
}