
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

// Configuration
const OBSIDIAN_PATH = path.join(process.cwd(), 'obsidian-content');
const POSTS_DEST = path.join(process.cwd(), 'src/content/blog');
const PAGES_DEST = path.join(process.cwd(), 'src/content/pages');
const RESEARCH_DEST = path.join(process.cwd(), 'src/content/research');
const IMAGES_DEST = path.join(process.cwd(), 'public/images/blog');

// Ensure directories exist
// Ensure directories exist and are empty (to remove deleted files)
fs.emptyDirSync(POSTS_DEST);
fs.emptyDirSync(PAGES_DEST);
fs.emptyDirSync(RESEARCH_DEST);
fs.ensureDirSync(IMAGES_DEST); // Don't empty images yet as they might be shared, or do? For now, risk of bloating images folder, but safer not to wipe if not tracked. Ideally we wipe this too if we want full sync. Let's wipe it to be safe and clean.
fs.emptyDirSync(IMAGES_DEST);

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

        // Determine destination based on path
        let destination = null;
        const relativeDir = path.dirname(file);

        // Normalize paths for cross-platform consistency
        const normalizedDir = relativeDir.split(path.sep).join('/');

        if (normalizedDir.startsWith('pages') || data.type === 'page') {
            destination = PAGES_DEST;
        } else if (normalizedDir.startsWith('research')) {
            destination = RESEARCH_DEST;
        } else if (normalizedDir.startsWith('blog')) {
            destination = POSTS_DEST;
        } else {
            // Skip root files or unclassified folders to keep src clean
            // Alternatively, you could default to blog if you prefer:
            // destination = POSTS_DEST; 
            console.log(`Skipping unclassified file: ${file}`);
            continue;
        }

        if (destination === PAGES_DEST) {
            // Always ingest pages
        } else {
            // Check published status
            const isPublished = data.published !== undefined ? data.published : (destination === RESEARCH_DEST ? true : false); // Research defaults to true, Blog defaults to false

            if (!isPublished) {
                console.log(`Draft skipped: ${file}`);
                continue;
            }
        }

        console.log(`Processing: ${file} -> ${destination === PAGES_DEST ? 'Pages' : destination === RESEARCH_DEST ? 'Research' : 'Blog'}`);

        // 3. Process Content
        let processingBody = body;

        // A. Image Embeds (Process BEFORE Wikilinks to prevent ![[...]] being caught as [[...]])
        processingBody = processingBody.replace(/!\[\[([^\]]+)\]\]/g, (match, p1) => {
            const imageName = p1.trim();
            const imageSourcePath = findImageInVault(imageName, relativeDir);

            if (imageSourcePath) {
                // Sanitize filename for web: lowercase, replace spaces/special chars with hyphens
                const ext = path.extname(imageName);
                const nameWithoutExt = path.basename(imageName, ext);
                const sanitizedName = nameWithoutExt.toLowerCase()
                    .replace(/\s+/g, '-')          // Replace spaces with -
                    .replace(/[^a-z0-9-]/g, '')   // Remove other special chars
                    + ext.toLowerCase();

                const destPath = path.join(IMAGES_DEST, sanitizedName);
                fs.copySync(imageSourcePath, destPath);
                return `![${nameWithoutExt}](/images/blog/${sanitizedName})`;
            } else {
                console.warn(`   ⚠️  Image not found: ${imageName}`);
                return match;
            }
        });

        // B. Wikilinks replacement
        processingBody = processingBody.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
            const [link, alias] = p1.split('|');
            const text = alias || link;
            const slug = link.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            // For now, default all wikilinks to blog paths or relative
            // Ideally we'd know where the target is.
            return `[${text}](/blog/${slug})`;
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
