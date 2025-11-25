import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
// import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { workflowManager } from '@multidots/sanity-plugin-workflow-manager'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { resolveProductionUrl } from './resolveProductionUrl'
import { author } from './schemas/author'
import { post } from './schemas/post'
import { meetings } from './schemas/meetings'
// import { directory } from './schemas/directory'
import { evidence } from './schemas/evidence'
import { documents } from './schemas/documents'
import { legislative } from './schemas/legislative'
import { minutes } from './schemas/minutes'
import { positions } from './schemas/positions'
import { protocols } from './schemas/protocols'
import { officers } from './schemas/officers'
import { scopeofpractice } from './schemas/scopeofpractice'
import { legislativec } from './schemas/legislativec'
import { medicaladvisory } from './schemas/medicaladvisory'
import { nominating } from './schemas/nominating'
import { associates } from './schemas/associates'
import { members } from './schemas/members'

// Load environment variables from .env.development or parent .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

function loadEnv() {
  const envFiles = [
    join(__dirname, '.env.development'),
    join(__dirname, '.env.local'),
    join(rootDir, '.env.local'),
    join(rootDir, '.env'),
  ]

  for (const envFile of envFiles) {
    try {
      const content = readFileSync(envFile, 'utf-8')
      content.split('\n').forEach((line) => {
        const match = line.match(/^([^=:#]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          const value = match[2].trim().replace(/^["']|["']$/g, '')
          if (!process.env[key]) {
            process.env[key] = value
          }
        }
      })
      break
    } catch (err) {
      // File doesn't exist, try next
    }
  }
}

loadEnv()

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'EMDAC'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineConfig({
  basePath: '/',
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      post, 
      author,
      officers, 
      scopeofpractice, 
      legislativec, 
      medicaladvisory, 
      nominating, 
      members,
      associates, 
      documents, 
      evidence, 
      legislative, 
      meetings, 
      minutes, 
      positions, 
      protocols
    ],
  },
  document: {
    productionUrl: resolveProductionUrl,
  },
  plugins: [
    // deskTool(), // disabled for now

    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool(),
    // Vercel Deploy tool for deploying from Sanity Studio
    vercelDeployTool(),
    // Workflow Manager for advanced content workflow management
    workflowManager(),
  ],
})
