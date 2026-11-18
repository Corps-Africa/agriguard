import type { AstroIntegration } from 'astro';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * After each build, lists every placeholder (data-tbc) still on the site, per page,
 * so nothing unconfirmed slips through to launch.
 */
export function placeholderReport(): AstroIntegration {
  return {
    name: 'agriguard:placeholder-report',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await htmlFiles(root);
        // placeholder text -> pages it appears on
        const found = new Map<string, Set<string>>();
        for (const file of files) {
          const page = '/' + relative(root, file).replace(/index\.html$/, '');
          const html = await readFile(file, 'utf8');
          for (const m of html.matchAll(/data-tbc="([^"]*)"/g)) {
            const key = decode(m[1] ?? '');
            if (!found.has(key)) found.set(key, new Set());
            found.get(key)!.add(page);
          }
        }
        if (!found.size) {
          logger.info('No placeholders left. Ready for launch.');
          return;
        }
        logger.warn(`${found.size} placeholder(s) still need confirming:`);
        for (const [item, pages] of found) logger.warn(`  - ${item}  (${[...pages].join(', ')})`);
      },
    },
  };
}

async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function decode(s: string): string {
  return s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
