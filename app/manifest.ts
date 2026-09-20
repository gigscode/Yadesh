import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Yadesh, Christian Micro-Learning', short_name: 'Yadesh', description: 'Five focused minutes can change what you know.', start_url: '/', display: 'standalone', background_color: '#6b64f6', theme_color: '#6b64f6', icons: [{ src: '/yadesh2.jpg', sizes: '400x400', type: 'image/jpeg' }] }
}
