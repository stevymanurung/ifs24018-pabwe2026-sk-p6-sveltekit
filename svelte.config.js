import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    inlineStyleThreshold: 10000,
    alias: {
      $features: 'src/features',
      '$features/*': 'src/features/*'
    }
  }
};

export default config;

