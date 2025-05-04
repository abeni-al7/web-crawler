const { normalizeUrl } = require("./crawler")
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