import Image from "next/image";
import { socialLinks } from "./lib/config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>
      <h1 className="mb-8 text-2xl font-medium">Yusuke Sakai's personal web site</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          SNSなどのアカウント名はlitomaをよく使っています。
          昔プレイしていたオンラインゲームのハンドル名がその由来です。
          新しいサービスはなるべくこのアカウント名で登録していますが、出遅れて登録できなかったサービスもあります。
          （例、Google、Instagram、Telegram、Yahoo!など）
        </p>
        <p>
          2023年から、はてなブログで私的な記事を書いています。
          その前はWordPressを使っていました。こちらのリンクからアーカイブにアクセスできます。
          また、たまにしずかなインターネットでポエムを書いたりもします。
          Atom & JSON feeds, analytics, Tweet & YouTube embeds, KaTeX and {""}
          <a
            target="_blank"
            href="https://github.com/1msirius/Nextfolio?tab=readme-ov-file#features"
          >
            more
          </a>
        </p>
        <p>
          このサイトはNextfolioのフォークで、Vercel上で動作しています。
          Next.jsやGitHubについては勉強中ですが、生成AIの支援を受けてBlogページなどをカスタマイズしています。{" "}
          <a href={socialLinks.github} target="_blank">
            open-source
          </a>{" "}
          and fully customizable, making it easy to add more features.
        </p>
        <p>
          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F1msirius%2FNextfolio"
            target="_blank"
          >
            Deploy
          </a>{" "}
          your Nextfolio site with Vercel in minutes and follow the set up
          instructions in the{" "}
          <a href="/blog/getting-started">Getting Started</a> post.
        </p>
      </div>
    </section>
  );
}
