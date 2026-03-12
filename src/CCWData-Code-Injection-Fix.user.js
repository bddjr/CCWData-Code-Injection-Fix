// ==UserScript==
// @name         CCWData-Code-Injection-Fix
// @version      {{version}}-e7237e1f
// @description  Fix CCWData code injection security vulnerability
// @author       bddjr
// @match        https://www.ccw.site/*
// @grant        none
// @run-at       document-start
// @icon         https://m.ccw.site/community/images/logo-ccw.png
// @downloadURL  https://bddjr.github.io/CCWData-Code-Injection-Fix/CCWData-Code-Injection-Fix.user.js
// @updateURL    https://bddjr.github.io/CCWData-Code-Injection-Fix/CCWData-Code-Injection-Fix.user.js
// ==/UserScript==

// Source Code:
// https://github.com/bddjr/CCWData-Code-Injection-Fix

const injectPrefix = `{{script}}`

const { appendChild } = Element.prototype
Element.prototype.appendChild = function (c) {
    if (c?.tagName === "SCRIPT") {
        const { src } = c
        if (src?.includes("/scratch3_ccw_data.")) {
            console.log('CCWData-Code-Injection-Fix fetch ' + src)
            c.removeAttribute("src")
            fetch(src, { cache: 'default' })
                .then(r => {
                    const type = r.headers.get('Content-Type')?.split(';')[0].trim()
                    switch (type) {
                        // https://htmlspecs.com/mimesniff/#javascript-mime-type
                        case "application/ecmascript":
                        case "application/javascript":
                        case "application/x-ecmascript":
                        case "application/x-javascript":
                        case "text/ecmascript":
                        case "text/javascript":
                        case "text/javascript1.0":
                        case "text/javascript1.1":
                        case "text/javascript1.2":
                        case "text/javascript1.3":
                        case "text/javascript1.4":
                        case "text/javascript1.5":
                        case "text/jscript":
                        case "text/livescript":
                        case "text/x-ecmascript":
                        case "text/x-javascript":
                            return r.text()
                    }
                    throw Error(`Refused to execute script from '${src}' because its MIME type ('${type}') is not executable.`)
                }).then(text => {
                    c.innerHTML = text.replace(/(?=\([^()]+\)\.push\()/, injectPrefix)
                    console.log('CCWData-Code-Injection-Fix', appendChild.call(this, c))
                })
            return c
        }
    }
    return appendChild.apply(this, arguments)
}