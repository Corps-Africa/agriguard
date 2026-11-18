import { defineConfig } from 'astro/config';
import { placeholderReport } from './integrations/placeholder-report';

export default defineConfig({
  site: 'https://www.agriguardsolutions.com',
  trailingSlash: 'always',
  integrations: [placeholderReport()],
});
