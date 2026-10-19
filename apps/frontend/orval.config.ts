import 'dotenv/config'
import { defineConfig } from 'orval'

const apiUrl = process.env.VITE_API_URL ?? 'http://localhost:3000'

export default defineConfig({
  backend: {
    input: {
      target: `${apiUrl}/api-json`,
    },
    output: {
      mode: 'split',
      target: 'src/api/backend.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      override: {
        mutator: {
          path: 'src/api/axios-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
})
