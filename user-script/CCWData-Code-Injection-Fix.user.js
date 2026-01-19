// ==UserScript==
// @name         CCWData-Code-Injection-Fix
// @version      cbf43b4e-{{version}}
// @description  Fix CCWData code injection security vulnerability
// @author       bddjr
// @match        https://www.ccw.site/*
// @grant        none
// @run-at       document-start
// @icon         https://m.ccw.site/community/images/logo-ccw.png
// @downloadURL  https://bddjr.github.io/CCWData-Code-Injection-Fix/CCWData-Code-Injection-Fix.user.js
// @updateURL    https://bddjr.github.io/CCWData-Code-Injection-Fix/CCWData-Code-Injection-Fix.user.js
// ==/UserScript==

const { appendChild } = Element.prototype
Element.prototype.appendChild = function (c) {
    if (c?.tagName === "SCRIPT" && c.src?.startsWith("https://static.xiguacity.cn/h1t86b7fg6c7k36wnt0cb30m/static/js/scratch3_ccw_data.")) {
        console.log('CCWData-Code-Injection-Fix')
        c.removeAttribute("src")
        c.innerHTML = "{{script}}"
    }
    return appendChild.apply(this, arguments)
}