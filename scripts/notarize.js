const { execSync } = require('child_process')

const bundleId = process.env.CEP_ID
const username = process.env.CEP_NOTARIZE_USERNAME
const password = process.env.CEP_NOTARIZE_APP_PASSWORD
const file = `${__dirname}/../archive/adobe-ide.pkg`

console.log('Requesting ticket (this will take a while) hang in there...')
const result = execSync(`xcrun altool --notarize-app --primary-bundle-id "${bundleId}" --username "${username}" --password "${password}" --file "${file}"`).toString();
const requestId = result.substr(result.indexOf('RequestUUID =') + 14).trim()

const interval = setInterval(() => {
    console.log('Checking validity.')
    const response = execSync(`xcrun altool --notarization-info ${requestId} --username "${username}" --password "${password}"`).toString()
    if (response.indexOf('Package Approved') > -1) {
        clearInterval(interval)
        console.log('Package is approved! Stapling the ticket...')
        try {
            const result = execSync(`xcrun stapler staple "${file}"`).toString()
            console.log(result)
        } catch (err) {
            console.error(err.stderr.toString())
            console.error(err.stdout.toString())
        }
    } else {
        console.log('Not approved yet...')
    }
}, 10000)