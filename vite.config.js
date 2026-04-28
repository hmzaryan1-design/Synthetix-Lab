import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        frMain: resolve(__dirname, 'fr/index.html'),
        frServices: resolve(__dirname, 'fr/services.html'),
        frCaseStudies: resolve(__dirname, 'fr/case-studies.html'),
        frAbout: resolve(__dirname, 'fr/about.html'),
        frContact: resolve(__dirname, 'fr/contact.html'),
      },
    },
  },
});
