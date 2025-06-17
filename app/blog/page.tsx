import Link from "next/link";
import { parseStringPromise } from "xml2js";

interface HatenaEntry {
  id: string;
  title: string;
  link: string;
  published: string;
  updated: string;
  draft: string;
}

// 日付フォーマット関数（YYYY-MM-DD）
function formatDate(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchHatenaBlogPosts(maxPosts: number = 10): Promise<HatenaEntry[]> {
  const hatenaId = process.env.HATENA_ID;
  const blogId = process.env.HATENA_BLOG_ID;
  const apiKey = process.env.HATENA_API_KEY;

  if (!hatenaId || !blogId || !apiKey) {
    throw new Error("Hatena API credentials are not set.");
  }

  const posts: HatenaEntry[] = [];
  let url = `https://blog.hatena.ne.jp/${hatenaId}/${blogId}/atom/entry`;
  const auth = Buffer.from(`${hatenaId}:${apiKey}`).toString("base64");

  while (posts.length < maxPosts) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/xml",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const xml = await response.text();
      const parsed = await parseStringPromise(xml, {
        explicitArray: false,
        mergeAttrs: true,
      });

      const entries = parsed.feed.entry || [];
      const entryArray = Array.isArray(entries) ? entries : [entries];

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

      posts.push(...publishedEntries);

      const nextLink = parsed.feed.link?.find((l: any) => l.rel === "next")?.href;
      if (!nextLink || posts.length >= maxPosts) {
        break;
      }
      url = nextLink;
    } catch (error) {
      console.error("Failed to fetch Hatena blog posts:", error);
      break;
    }
  }

  return posts.slice(0, maxPosts);
}

export default async function BlogPage() {
  const posts = await fetchHatenaBlogPosts(10);

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
        Blog
      </h1>
      {posts.length === 0 ? (
        <div className="text-muted-foreground">
          No posts found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <h2 className="text-black dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                    {formatDate(post.published)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://text.yusukesakai.com/"
              className="text-blue-600 hover:underline"
            >
              More
            </a>
          </div>
        </>
      )}
    </section>
  );
}