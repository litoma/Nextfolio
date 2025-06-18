import Link from "next/link";
import type { Metadata } from "next";
import { phones } from "./phones-data";

export const metadata: Metadata = {
  title: "My mobile phones history",
  description: "My mobile phones history",
};

export default function Phones() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">About</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <h2 className="text-black dark:text-white">Myself</h2>
        <p>
          SNSなどのアカウント名は「litoma」をよく使っています。
          昔プレイしていたオンラインゲームのハンドル名がその由来です。
          新しいサービスはなるべくこのアカウント名で登録していますが、出遅れて登録できなかったサービスも多々あります。
          （例：Google、Instagram、Telegram、Yahoo!など）
        </p>
        <h2 className="text-black dark:text-white">Website</h2>
        <p>
          2023年から、<a href="https://text.yusukesakai.com/">はてなブログ</a>で私的な記事を書いています。
          その前はWordPressを使っていました。<a href="https://past.yusukesakai.com">このリンク</a>からアーカイブにアクセスできます。
          また、たまに<a href="https://sizu.me/litoma">しずかなインターネット</a>でポエムを書いたりもします。
        </p>
        <p>
          このサイトは<a href="https://github.com/3p5ilon/Nextfolio">Nextfolio</a>のフォークで、Vercel上で動作しています。
          Next.jsやGitHubについては勉強中ですが、生成AIの御力で色々とカスタマイズしています。
        </p>
        <h2 className="text-black dark:text-white">My mobile phones history</h2>
        {phones.map((phone, index) => (
          <Link
            key={index}
            href={phone.url}
            className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <h3 className="text-black dark:text-white">{phone.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                {phone.year}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                {phone.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
