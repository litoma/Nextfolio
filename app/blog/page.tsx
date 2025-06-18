import Link from "next/link";
import { parseStringPromise } from "xml2js";

// Interface for Hatena blog entry data structure
interface HatenaEntry {
  id: string;
  title: string;
  link: string;
  published: string;
  updated: string;
  draft: string;
}

// Formats date to YYYY-MM-DD format
function formatDate(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Fetches Hatena blog posts with pagination, filtering out draft posts
async function fetchHatenaBlogPosts(maxPosts: number = 10): Promise<HatenaEntry[]> {
  // Retrieve environment variables for Hatena API
  const hatenaId = process.env.HATENA_ID;
  const blogId = process.env.HATENA_BLOG_ID;
  const apiKey = process.env.HATENA_API_KEY;

  // Validate environment variables
  if (!hatenaId || !blogId || !apiKey) {
    throw new Error("Hatena API credentials are not set.");
  }

  // Initialize array to store published posts
  const posts: HatenaEntry[] = [];
  // Base URL for Hatena AtomPub API
  let url = `https://blog.hatena.ne.jp/${hatenaId}/${blogId}/atom/entry`;
  // Create Basic Auth header
  const auth = Buffer.from(`${hatenaId}:${apiKey}`).toString("base64");

  // Fetch posts until maxPosts is reached or no more pages are available
  while (posts.length < maxPosts) {
    try {
      // Make API request to fetch entries
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/xml",
        },
      });

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // Parse XML response
      const xml = await response.text();
      const parsed = await parseStringPromise(xml, {
        explicitArray: false,
        mergeAttrs: true,
      });

      // Extract entries from response
      const entries = parsed.feed.entry || [];
      const entryArray = Array.isArray(entries) ? entries : [entries];

      // Filter published entries (exclude drafts) and map to HatenaEntry
      const publishedEntries = entryArray
        .filter((entry: any) => entry["app:control"]?.["app:draft"] !== "yes")
        .map((entry: any) => ({
          id: entry.id,
          title: entry.title,
          link: entry.link.find((l: any) => l.rel === "alternate").href,
          published: entry.published,
          updated: entry.updated,
          draft: entry["app:control"]?.["app:draft"] || "no",
        }));

      // Add published entries to posts array
      posts.push(...publishedEntries);

      // Get next page URL, if available
      const nextLink = parsed.feed.link?.find((l: any) => l.rel === "next")?.href;
      if (!nextLink || posts.length >= maxPosts) {
        break;
      }
      url = nextLink;
    } catch (error) {
      // Log errors and stop fetching
      console.error("Failed to fetch Hatena blog posts:", error);
      break;
    }
  }

  // Return up to maxPosts entries
  return posts.slice(0, maxPosts);
}

export default async function BlogPage() {
  const posts = await fetchHatenaBlogPosts(10);

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">
        Blog
      </h1>
      {posts.length === 0 ? (
        <div>
          No posts found.
        </div>
      ) : (
        <>
          <div>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={post.link}
                className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
              >
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <h2 className="text-black dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm w-full max-w-3/10">
                    {formatDate(post.published)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <a href="https://text.yusukesakai.com/">
              More...
            </a>
          </div>
        </>
      )}
    </section>
  );
}