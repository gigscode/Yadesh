import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yadesh, Christian Micro-Learning',
    short_name: 'Yadesh',
    description: 'Five focused minutes can change what you know.',
    start_url: '/',
    display: 'standalone',
    background_color: '#6b64f6',
    theme_color: '#6b64f6',
    icons: [
      { src: '/yadesh-mark.png', sizes: '2048x2048', type: 'image/png', purpose: 'any' },
      { src: '/yadesh-mark.png', sizes: '2048x2048', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
