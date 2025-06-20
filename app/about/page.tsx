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
          SNSなどのアカウント名は<strong>litoma</strong>をよく使っています。
          由来は昔プレイしていたオンラインゲームのハンドル名です。
          新しいサービスはなるべくこのアカウント名で登録していますが、出遅れて登録できなかったサービスも多々あります
          （例：Google、Instagram、Telegram、Yahoo!など）。
        </p>
        <h2 className="text-black dark:text-white">Website</h2>
        <p>
          2023年から、<a href="https://text.yusukesakai.com/">はてなブログ</a>で私的な記事を書いています。
          その前はWordPressを使っていました（アーカイブへのリンクは<a href="https://past.yusukesakai.com">こちら</a>）。
          また、たまに<a href="https://sizu.me/litoma">しずかなインターネット</a>でポエムを書いたりもします。
        </p>
        <p>
          このサイトは<a href="https://github.com/3p5ilon/Nextfolio">Nextfolio</a>のフォークで、Vercel上で動作しています。
          Next.jsやGitHubについては未熟ですが、生成AIの力で色々とカスタマイズしています。
        </p>
        <h2 className="text-black dark:text-white">Phones</h2>
        <p>
          私が使用した歴代の携帯電話を紹介します。
        </p>
        <ul>
        {phones.map((phone, index) => (
          <li className="mb-[60px] overflow-hidden m-0 relative">
            <p className="w-[110px] float-left mt-[20px]">
              {phone.year}
            </p>
            <div className="w-3/4 float-left border-l-4 border-white pl-[30px] relative before:content-[''] before:w-[12px] before:h-[12px] before:bg-white before:absolute before:left-[106px] before:top-[24px] before:rounded-full">
            <Link
              key={index}
              href={phone.url}
            >
              <h3>{phone.title}</h3>
              <p>
                {phone.description}
              </p>
            </Link>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </section>
  );
}
