import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { workflowManager } from '@multidots/sanity-plugin-workflow-manager'

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

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'EMDAC with Sanity.io'
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
    deskTool(),
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
