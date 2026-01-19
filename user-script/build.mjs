import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * @param {string} p
 */
function resolve(p) {
    return fileURLToPath(import.meta.resolve(p))
}

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

const ccwdata = fs.readFileSync(resolve('../scratch3_ccw_data.cbf43b4e.PrettyPrint.js')).toString()

let script = fs.readFileSync(resolve('./CCWData-Code-Injection-Fix.user.js')).toString()

script = script
    .replace('{{version}}', version)
    .replace('"{{script}}"', JSON.stringify(ccwdata))

const distPath = resolve('../dist')

fs.existsSync(distPath) || fs.mkdirSync(distPath)

fs.writeFileSync(path.join(distPath, 'CCWData-Code-Injection-Fix.user.js'), script)
