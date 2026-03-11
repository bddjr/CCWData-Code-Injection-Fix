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
                .then(r => r.text())
                .then(text => {
                    c.innerHTML = text.replace(/(?=\([^()]+\)\.push\()/, injectPrefix)
                    console.log('CCWData-Code-Injection-Fix', appendChild.call(this, c))
                })
            return c
        }
    }
    return appendChild.apply(this, arguments)
}