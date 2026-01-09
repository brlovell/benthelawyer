
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

// Configuration
const OBSIDIAN_PATH = path.join(process.cwd(), 'obsidian-content'); // Submodule path
const POSTS_DEST = path.join(process.cwd(), 'src/content/blog');
const PAGES_DEST = path.join(process.cwd(), 'src/content/pages');
const IMAGES_DEST = path.join(process.cwd(), 'public/images/blog');

// Ensure directories exist
fs.ensureDirSync(POSTS_DEST);
fs.ensureDirSync(PAGES_DEST);
fs.ensureDirSync(IMAGES_DEST);

async function ingest() {
    console.log('🚀 Starting Obsidian Ingestion...');

    if (!fs.existsSync(OBSIDIAN_PATH)) {
        console.warn(`⚠️  Obsidian Vault not found at ${OBSIDIAN_PATH}. Skipping ingestion.`);
        return;
    }

    const files = await glob('**/*.md', { cwd: OBSIDIAN_PATH, ignore: 'node_modules/**' });
    console.log(`found ${files.length} markdown files in vault.`);

    for (const file of files) {
        const filePath = path.join(OBSIDIAN_PATH, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Parse frontmatter
        const { data, content: body } = matter(content);

        // Determine destination based on path or frontmatter
        let destination = POSTS_DEST;
        const relativeDir = path.dirname(file);

        if (relativeDir.startsWith('pages') || data.type === 'page') {
            destination = PAGES_DEST;
        } else if (!data.published && !file.includes('pages')) {
            // Only skip non-published files if they aren't pages
            continue;
        }

        console.log(`Processing: ${file} -> ${destination === PAGES_DEST ? 'Pages' : 'Blog'}`);

        // 3. Process Content
        let processingBody = body;

        // A. Wikilinks replacement
        processingBody = processingBody.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
            const [link, alias] = p1.split('|');
            const text = alias || link;
            const slug = link.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return `[${text}](/blog/${slug})`;
        });

        // B. Image Embeds
        processingBody = processingBody.replace(/!\[\[([^\]]+)\]\]/g, (match, p1) => {
            const imageName = p1.trim();
            const imageSourcePath = findImageInVault(imageName, relativeDir);

            if (imageSourcePath) {
                const destPath = path.join(IMAGES_DEST, imageName);
                fs.copySync(imageSourcePath, destPath);
                return `![${imageName}](/images/blog/${imageName})`;
            } else {
                console.warn(`   ⚠️  Image not found: ${imageName}`);
                return match;
            }
        });

        // 4. Write to Src
        const baseName = path.basename(file, '.md').toLowerCase().replace(/\s+/g, '-');
        const destFile = path.join(destination, `${baseName}.md`);

        // Reconstruct file
        const newFileContent = matter.stringify(processingBody, data);
        fs.writeFileSync(destFile, newFileContent);
    }

    console.log('✅ Ingestion Complete.');
}

function findImageInVault(imageName: string, currentDir: string): string | null {
    const possiblePaths = [
        path.join(OBSIDIAN_PATH, currentDir, imageName),
        path.join(OBSIDIAN_PATH, imageName),
        path.join(OBSIDIAN_PATH, 'attachments', imageName),
        path.join(OBSIDIAN_PATH, 'assets', imageName)
    ];

    for (const p of possiblePaths) {
        if (fs.existsSync(p)) return p;
    }
    return null;
}

ingest();
