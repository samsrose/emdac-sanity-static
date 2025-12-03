const fs = require('fs')
const path = require('path')

// Find the source .env file
let envFile = null
if (fs.existsSync('../.env')) {
  envFile = '../.env'
} else if (fs.existsSync('../.env.local')) {
  envFile = '../.env.local'
} else {
  throw new Error('No .env or .env.local file found at root of the project')
}

// Read the source .env file
const envContent = fs.readFileSync(envFile, 'utf-8')

// Parse and transform environment variables
// Sanity Studio v3 with Vite expects SANITY_STUDIO_ prefix
const lines = envContent.split('\n')
const transformedLines = []

lines.forEach(line => {
  // Keep the original line
  transformedLines.push(line)
  
  // If it's a NEXT_PUBLIC_SANITY_ variable, also add a SANITY_STUDIO_ version
  const match = line.match(/^NEXT_PUBLIC_SANITY_(.+?)=(.+)$/)
  if (match) {
    const varName = match[1]
    const varValue = match[2]
    transformedLines.push(`SANITY_STUDIO_${varName}=${varValue}`)
  }
})

// Write the transformed content
fs.writeFileSync('.env.development', transformedLines.join('\n'))
console.log('Environment variables copied and transformed for Sanity Studio')
