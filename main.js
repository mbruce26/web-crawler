import { crawlPage2 } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    if (process.argv.length < 3) {
        console.log('not enough arguments');
    } else if (process.argv.length > 3) {
        console.log('too many arguments');
    } else {
        const baseURL = process.argv[2] 
        console.log(`starting crawl of: ${baseURL}`)
        const pages = await crawlPage2(baseURL, baseURL, {})
        printReport(pages)
    }
}

main()