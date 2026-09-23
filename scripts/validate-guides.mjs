import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GUIDES_FILE = path.join(ROOT, "lib", "guides.ts");
const GUIDES_DIR = path.join(ROOT, "app", "guides");

let errors = 0;

function error(message) {
    console.error(`✗ ${message}`);
    errors++;
}

function success(message) {
    console.log(`✓ ${message}`);
}

function getDuplicateValues(values) {
    const counts = new Map();

    for (const value of values) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    return [...counts.entries()]
        .filter(([, count]) => count > 1)
        .map(([value]) => value);
}

// --------------------------------------------------
// Read lib/guides.ts
// --------------------------------------------------

if (!fs.existsSync(GUIDES_FILE)) {
    console.error("✗ lib/guides.ts does not exist.");
    process.exit(1);
}

const source = fs.readFileSync(GUIDES_FILE, "utf8");

// --------------------------------------------------
// Extract guide records
//
// We deliberately read the registry as source text
// instead of importing the TypeScript module.
// This keeps the validator dependency-free and avoids
// changing the project's TypeScript/module settings.
// --------------------------------------------------

const slugMatches = [
    ...source.matchAll(/\bslug:\s*"([^"]+)"/g),
];

const hrefMatches = [
    ...source.matchAll(/\bhref:\s*"([^"]+)"/g),
];

const slugs = slugMatches.map((match) => match[1]);
const hrefs = hrefMatches.map((match) => match[1]);

if (slugs.length === 0) {
    error("No guide slugs were found in lib/guides.ts.");
} else {
    success(`${slugs.length} guides registered.`);
}

// --------------------------------------------------
// Duplicate slugs
// --------------------------------------------------

const duplicateSlugs = getDuplicateValues(slugs);

if (duplicateSlugs.length > 0) {
    for (const slug of duplicateSlugs) {
        error(`Duplicate slug: ${slug}`);
    }
} else {
    success("No duplicate slugs.");
}

// --------------------------------------------------
// Duplicate hrefs
// --------------------------------------------------

const duplicateHrefs = getDuplicateValues(hrefs);

if (duplicateHrefs.length > 0) {
    for (const href of duplicateHrefs) {
        error(`Duplicate href: ${href}`);
    }
} else {
    success("No duplicate hrefs.");
}

// --------------------------------------------------
// Validate slug ↔ href relationship
// --------------------------------------------------

for (let index = 0; index < slugs.length; index++) {
    const slug = slugs[index];
    const href = hrefs[index];

    if (!href) {
        error(`Guide is missing an href: ${slug}`);
        continue;
    }

    const expectedHref = `/guides/${slug}`;

    if (href !== expectedHref) {
        error(
            `${slug} has href "${href}" but expected "${expectedHref}".`,
        );
    }
}

if (
    slugs.length > 0 &&
    slugs.length === hrefs.length &&
    slugs.every(
        (slug, index) =>
            hrefs[index] === `/guides/${slug}`,
    )
) {
    success("All guide hrefs match their slugs.");
}

// --------------------------------------------------
// Extract and validate relatedSlugs
// --------------------------------------------------

const slugSet = new Set(slugs);

const guideBlocks = source.split(/\n\s*\{\s*\n/);

let relatedErrors = 0;

for (const block of guideBlocks) {
    const slugMatch = block.match(
        /\bslug:\s*"([^"]+)"/,
    );

    if (!slugMatch) {
        continue;
    }

    const slug = slugMatch[1];

    const relatedMatch = block.match(
        /relatedSlugs:\s*\[([\s\S]*?)\]/,
    );

    if (!relatedMatch) {
        error(`${slug} is missing relatedSlugs.`);
        relatedErrors++;
        continue;
    }

    const relatedSlugs = [
        ...relatedMatch[1].matchAll(/"([^"]+)"/g),
    ].map((match) => match[1]);

    const duplicateRelated =
        getDuplicateValues(relatedSlugs);

    for (const duplicate of duplicateRelated) {
        error(
            `${slug} contains duplicate relatedSlug: ${duplicate}`,
        );
        relatedErrors++;
    }

    for (const relatedSlug of relatedSlugs) {
        if (relatedSlug === slug) {
            error(
                `${slug} references itself in relatedSlugs.`,
            );
            relatedErrors++;
        }

        if (!slugSet.has(relatedSlug)) {
            error(
                `${slug} references missing related guide: ${relatedSlug}`,
            );
            relatedErrors++;
        }
    }
}

if (relatedErrors === 0) {
    success("All relatedSlugs resolve correctly.");
}

// --------------------------------------------------
// Registry ↔ route checks
// --------------------------------------------------

if (!fs.existsSync(GUIDES_DIR)) {
    console.error(
        "✗ app/guides directory does not exist.",
    );
    process.exit(1);
}

const routeDirectories = fs
    .readdirSync(GUIDES_DIR, {
        withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("."));

let routeErrors = 0;

for (const slug of slugs) {
    const pagePath = path.join(
        GUIDES_DIR,
        slug,
        "page.tsx",
    );

    if (!fs.existsSync(pagePath)) {
        error(`Registry guide has no page.tsx: ${slug}`);
        routeErrors++;
    }
}

for (const routeSlug of routeDirectories) {
    if (!slugSet.has(routeSlug)) {
        error(
            `app/guides/${routeSlug} exists but is missing from lib/guides.ts.`,
        );
        routeErrors++;
    }
}

if (routeErrors === 0) {
    success(
        `${routeDirectories.length} guide routes match the registry.`,
    );
}

// --------------------------------------------------
// Final result
// --------------------------------------------------

console.log("");

if (errors > 0) {
    console.error(
        `Guide validation failed with ${errors} error${errors === 1 ? "" : "s"
        }.`,
    );

    process.exit(1);
}

console.log("Guide validation passed.");