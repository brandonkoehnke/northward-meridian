import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GUIDES_FILE = path.join(ROOT, "lib", "guides.ts");
const GUIDE_ROUTE_ROOTS = {
    en: path.join(ROOT, "app", "guides"),
    es: path.join(ROOT, "app", "es", "guides"),
};

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

/**
 * Find the guides array in lib/guides.ts.
 */
function findGuidesArrayStart(source) {
    const guidesDeclaration =
        /\b(?:export\s+)?const\s+guides\b[\s\S]*?=\s*\[/m;

    const match = guidesDeclaration.exec(source);

    if (!match) {
        return -1;
    }

    return match.index + match[0].lastIndexOf("[");
}

/**
 * Extract top-level object literals from the guides array.
 *
 * This is intentionally a small source scanner rather than a large regex.
 * It understands strings, template literals, and comments so braces inside
 * text do not accidentally terminate a guide object.
 */
function extractGuideObjects(source, arrayStart) {
    const objects = [];

    let arrayDepth = 0;
    let braceDepth = 0;

    let stringQuote = null;
    let inLineComment = false;
    let inBlockComment = false;
    let escaped = false;

    let objectStart = -1;

    for (let index = arrayStart; index < source.length; index++) {
        const character = source[index];
        const nextCharacter = source[index + 1];

        if (inLineComment) {
            if (character === "\n") {
                inLineComment = false;
            }

            continue;
        }

        if (inBlockComment) {
            if (character === "*" && nextCharacter === "/") {
                inBlockComment = false;
                index++;
            }

            continue;
        }

        if (stringQuote !== null) {
            if (escaped) {
                escaped = false;
                continue;
            }

            if (character === "\\") {
                escaped = true;
                continue;
            }

            if (character === stringQuote) {
                stringQuote = null;
            }

            continue;
        }

        if (
            character === "/" &&
            nextCharacter === "/"
        ) {
            inLineComment = true;
            index++;
            continue;
        }

        if (
            character === "/" &&
            nextCharacter === "*"
        ) {
            inBlockComment = true;
            index++;
            continue;
        }

        if (
            character === '"' ||
            character === "'" ||
            character === "`"
        ) {
            stringQuote = character;
            continue;
        }

        if (character === "[") {
            arrayDepth++;
            continue;
        }

        if (character === "]") {
            arrayDepth--;

            if (arrayDepth <= 0) {
                break;
            }

            continue;
        }

        if (arrayDepth !== 1) {
            continue;
        }

        if (character === "{") {
            if (braceDepth === 0) {
                objectStart = index;
            }

            braceDepth++;
            continue;
        }

        if (character === "}") {
            if (braceDepth === 0) {
                continue;
            }

            braceDepth--;

            if (braceDepth === 0 && objectStart !== -1) {
                objects.push(
                    source.slice(
                        objectStart,
                        index + 1,
                    ),
                );

                objectStart = -1;
            }
        }
    }

    return objects;
}

/**
 * Read a simple quoted string field from a guide object.
 */
function getStringField(block, fieldName) {
    const pattern = new RegExp(
        `(?:^|\\n)\\s*${fieldName}\\s*:\\s*"([^"]*)"`,
        "m",
    );

    const match = pattern.exec(block);

    return match ? match[1] : null;
}

/**
 * Read a clusters array from a guide object.
 */
function getClustersField(block) {
    const match = block.match(
        /(?:^|\n)\s*clusters\s*:\s*\[([\s\S]*?)\]/m,
    );

    if (!match) {
        return null;
    }

    return [
        ...match[1].matchAll(
            /"([^"]*)"/g,
        ),
    ].map((match) => match[1]);
}

/**
 * Validate the relationship between a slug and its route.
 */
function expectedHrefForGuide(guide) {
    if (guide.locale === "en") {
        return `/guides/${guide.slug}`;
    }

    if (guide.locale === "es") {
        return `/es/guides/${guide.slug}`;
    }

    return null;
}

// --------------------------------------------------
// Read lib/guides.ts
// --------------------------------------------------

if (!fs.existsSync(GUIDES_FILE)) {
    error("lib/guides.ts does not exist.");
    process.exit(1);
}

const source = fs.readFileSync(
    GUIDES_FILE,
    "utf8",
);

// --------------------------------------------------
// Find and extract guide records
// --------------------------------------------------

const guidesArrayStart =
    findGuidesArrayStart(source);

if (guidesArrayStart === -1) {
    error(
        "Could not find the guides array in lib/guides.ts.",
    );
    process.exit(1);
}

const guideBlocks = extractGuideObjects(
    source,
    guidesArrayStart,
);

if (guideBlocks.length === 0) {
    error(
        "No guide objects were found in the guides array.",
    );
    process.exit(1);
}

// --------------------------------------------------
// Parse guide records
// --------------------------------------------------

const guides = guideBlocks.map(
    (block, index) => ({
        index,
        block,
        slug: getStringField(block, "slug"),
        href: getStringField(block, "href"),
        locale: getStringField(block, "locale"),
        clusters: getClustersField(block),
    }),
);

success(
    `${guides.length} guides registered.`,
);

// --------------------------------------------------
// Validate required fields
// --------------------------------------------------

for (const guide of guides) {
    if (!guide.slug) {
        error(
            `Guide #${guide.index + 1} is missing a slug.`,
        );
    }

    if (!guide.href) {
        error(
            `${guide.slug ??
            `Guide #${guide.index + 1}`
            } is missing an href.`,
        );
    }

    if (!guide.locale) {
        error(
            `${guide.slug ??
            `Guide #${guide.index + 1}`
            } is missing a locale.`,
        );
    } else if (
        !Object.hasOwn(GUIDE_ROUTE_ROOTS, guide.locale)
    ) {
        error(
            `${guide.slug ??
            `Guide #${guide.index + 1}`
            } has unsupported locale "${guide.locale}".`,
        );
    }

    if (guide.clusters === null) {
        error(
            `${guide.slug ??
            `Guide #${guide.index + 1}`
            } is missing clusters.`,
        );
    }
}

// --------------------------------------------------
// Validate slugs
// --------------------------------------------------

const validSlugs = guides
    .map((guide) => guide.slug)
    .filter(Boolean);

const duplicateSlugs =
    getDuplicateValues(validSlugs);

if (duplicateSlugs.length > 0) {
    for (const slug of duplicateSlugs) {
        error(`Duplicate slug: ${slug}`);
    }
} else {
    success("No duplicate slugs.");
}

// --------------------------------------------------
// Validate hrefs
// --------------------------------------------------

const validHrefs = guides
    .map((guide) => guide.href)
    .filter(Boolean);

const duplicateHrefs =
    getDuplicateValues(validHrefs);

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

let slugHrefErrors = 0;

for (const guide of guides) {
    if (!guide.slug || !guide.href) {
        continue;
    }

    const expectedHref =
        expectedHrefForGuide(guide);

    if (!expectedHref) {
        continue;
    }

    if (guide.href !== expectedHref) {
        error(
            `${guide.slug} has href "${guide.href}" but expected "${expectedHref}".`,
        );

        slugHrefErrors++;
    }
}

if (slugHrefErrors === 0) {
    success("All guide hrefs match their slugs.");
}

// --------------------------------------------------
// Validate clusters
// --------------------------------------------------

const clusterMembership = new Map();
let clusterErrors = 0;

for (const guide of guides) {
    if (!guide.slug) {
        continue;
    }

    if (guide.clusters === null) {
        continue;
    }

    const duplicateClusters =
        getDuplicateValues(
            guide.clusters,
        );

    for (const duplicate of duplicateClusters) {
        error(
            `${guide.slug} contains duplicate cluster: ${duplicate}`,
        );

        clusterErrors++;
    }

    for (const cluster of guide.clusters) {
        const normalizedCluster =
            cluster.trim();

        if (!normalizedCluster) {
            error(
                `${guide.slug} contains an empty cluster.`,
            );

            clusterErrors++;
            continue;
        }

        if (!clusterMembership.has(
            normalizedCluster,
        )) {
            clusterMembership.set(
                normalizedCluster,
                [],
            );
        }

        clusterMembership
            .get(normalizedCluster)
            .push(guide.slug);
    }
}

if (clusterErrors === 0) {
    success("All guide clusters are valid.");
}

// --------------------------------------------------
// Report cluster inventory
//
// Every named cluster is shown, including singletons.
// Larger clusters appear first; alphabetical order
// breaks ties.
// --------------------------------------------------

const sortedClusters = [
    ...clusterMembership.entries(),
].sort(
    ([clusterA, membersA], [clusterB, membersB]) =>
        membersB.length - membersA.length ||
        clusterA.localeCompare(clusterB),
);

for (const [cluster, members] of sortedClusters) {
    const noun =
        members.length === 1
            ? "guide"
            : "guides";

    success(
        `Cluster "${cluster}" contains ${members.length} ${noun}.`,
    );
}

// --------------------------------------------------
// Ensure old relationship architecture is gone
// --------------------------------------------------

if (source.includes("relatedSlugs")) {
    error(
        "lib/guides.ts still contains relatedSlugs. Clusters are now the sole related-guide mechanism.",
    );
} else {
    success(
        "No legacy relatedSlugs references.",
    );
}

// --------------------------------------------------
// Validate guide routes
// --------------------------------------------------

let routeErrors = 0;

for (const [locale, guidesDir] of Object.entries(
    GUIDE_ROUTE_ROOTS,
)) {
    const localeGuides = guides.filter(
        (guide) => guide.locale === locale,
    );

    if (!fs.existsSync(guidesDir)) {
        if (localeGuides.length > 0) {
            error(
                `${path.relative(ROOT, guidesDir)} directory does not exist.`,
            );
            routeErrors++;
        }

        continue;
    }

    const routeDirectories = fs
        .readdirSync(guidesDir, {
            withFileTypes: true,
        })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter(
            (name) => !name.startsWith("."),
        );

    const localeSlugSet = new Set(
        localeGuides
            .map((guide) => guide.slug)
            .filter(Boolean),
    );

    for (const guide of localeGuides) {
        if (!guide.slug) {
            continue;
        }

        const guideDirectory = path.join(
            guidesDir,
            guide.slug,
        );

        const pagePath = path.join(
            guideDirectory,
            "page.tsx",
        );

        if (!fs.existsSync(guideDirectory)) {
            error(
                `Registry guide has no route directory: ${guide.href ?? guide.slug}`,
            );

            routeErrors++;
            continue;
        }

        if (!fs.existsSync(pagePath)) {
            error(
                `Registry guide has no page.tsx: ${guide.href ?? guide.slug}`,
            );

            routeErrors++;
        }
    }

    for (const routeSlug of routeDirectories) {
        if (!localeSlugSet.has(routeSlug)) {
            error(
                `${path.relative(
                    ROOT,
                    path.join(guidesDir, routeSlug),
                )} exists but is missing from lib/guides.ts for locale "${locale}".`,
            );

            routeErrors++;
        }
    }

    if (routeErrors === 0) {
        success(
            `${routeDirectories.length} ${locale} guide route${routeDirectories.length === 1 ? "" : "s"
            } match the registry.`,
        );
    }
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