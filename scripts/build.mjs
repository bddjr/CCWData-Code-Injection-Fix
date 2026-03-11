import fs from 'fs'
import path from 'path'

// UTC+08:00
const d = new Date(Date.now() + 28800000);

const version = ''.concat(
    d.getUTCFullYear().toString(),
    (d.getUTCMonth() + 1).toString().padStart(2, '0'),
    d.getUTCDate().toString().padStart(2, '0'),
    '-',
    d.getUTCHours().toString().padStart(2, '0'),
    d.getUTCMinutes().toString().padStart(2, '0'),
    d.getUTCSeconds().toString().padStart(2, '0')
)

let injectPrefix = fs.readFileSync('src/inject-prefix.js').toString()

injectPrefix = injectPrefix.replace(
    /[`\\]|\$\{|<\/script/g,
    m => (m == '</script' ? '<\\/script' : '\\' + m)
).replace(/;*\s*$/, '')

let script = fs.readFileSync('src/CCWData-Code-Injection-Fix.user.js').toString()

script = script
    .replace('{{version}}', version)
    .replace('{{script}}', injectPrefix)

const distPath = 'dist'

fs.existsSync(distPath) || fs.mkdirSync(distPath)

fs.writeFileSync(path.join(distPath, 'CCWData-Code-Injection-Fix.user.js'), script)
