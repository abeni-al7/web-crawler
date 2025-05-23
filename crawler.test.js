const { normalizeUrl, getURLsFromHTML } = require("./crawler")
const { test, expect } = require("@jest/globals")

test("normalizeUrl strip protocol", () => {
    const input = "https://sub.example.com"
    const actual = normalizeUrl(input)
    const expected = "sub.example.com"
    expect(actual).toEqual(expected)
})

test("normalizeUrl change to lowercase", () => {
    const input = "https://SUB.example.com"
    const actual = normalizeUrl(input)
    const expected = "sub.example.com"
    expect(actual).toEqual(expected)
})

test("normalizeUrl strip trailing /", () => {
    const input = "https://SUB.example.com/"
    const actual = normalizeUrl(input)
    const expected = "sub.example.com"
    expect(actual).toEqual(expected)
})

test("normalizeUrl works for http", () => {
    const input = "http://SUB.example.com"
    const actual = normalizeUrl(input)
    const expected = "sub.example.com"
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML handle absolute", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://example.com/path">
                    Example
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://example.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://example.com/path"]
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML handle relative", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">
                    Example
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://example.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://example.com/path/"]
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML handle both", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://example.com/path1/">
                    Example one
                </a>
                <a href="/path2/">
                    Example Two
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://example.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://example.com/path1/", "https://example.com/path2/"]
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML handle invalid", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                    Example one
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://example.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})