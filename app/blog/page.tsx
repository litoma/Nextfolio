import Link from "next/link";
import { parseStringPromise } from "xml2js";

interface HatenaEntry {
  id: string;
  title: string;
  link: string;
  published: string;
  updated: string;
  summary?: string;
}

async function fetchHatenaBlogPosts(): Promise<HatenaEntry[]> {
  const hatenaId = process.env.HATENA_ID;
  const blogId = process.env.HATENA_BLOG_ID;
  const apiKey = process.env.HATENA_API_KEY;

  if (!hatenaId || !blogId || !apiKey) {
    throw new Error("Hatena API credentials are not set.");
  }

  const url = `https://blog.hatena.ne.jp/${hatenaId}/${blogId}/atom/entry`;
  const auth = Buffer.from(`${hatenaId}:${apiKey}`).toString("base64");

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
    const parsed = await parseStringPromise(xml, { explicitArray: false });
    const entries = parsed.feed.entry || [];

    const entryArray = Array.isArray(entries) ? entries : [entries];

    return entryArray.map((entry: any) => ({
      id: entry.id,
      title: entry.title,
      link: entry.link.find((l: any) => l.$.rel === "alternate").$.href,
      published: entry.published,
      updated: entry.updated,
      summary: entry.summary?._,
    }));
  } catch (error) {
    console.error("Failed to fetch Hatena blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await fetchHatenaBlogPosts();

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-10">
      <section className="w-full max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Blog
        </h1>
        {posts.length === 0 ? (
          <div className="text-muted-foreground">
            No posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {post.summary ? post.summary.slice(0, 100) + "..." : "No description available."}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(post.published).toLocaleDateString("ja-JP")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}