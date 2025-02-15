'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { StudioProvider } from 'sanity'

export default function StudioPage() {
  return (
    <StudioProvider config={config}>
      <NextStudio config={config} />
    </StudioProvider>
  )
} 