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
      <div>
        <h2 className="mb-8 text-2xl font-medium">Myself</h2>
        <p>
          SNSなどのアカウント名は<strong>litoma</strong>をよく使っています。
          由来は昔プレイしていたオンラインゲームのハンドル名です。
          新しいサービスはなるべくこのアカウント名で登録していますが、出遅れて登録できなかったサービスも多々あります
          （例：Google、Instagram、Telegram、Yahoo!など）。
        </p>
        <h2 className="mb-8 text-2xl font-medium">Website</h2>
        <p>
          2023年から、<a href="https://text.yusukesakai.com/">はてなブログ</a>で私的な記事を書いています。
          その前はWordPressを使っていました（アーカイブへのリンクは<a href="https://past.yusukesakai.com">こちら</a>）。
          また、たまに<a href="https://sizu.me/litoma">しずかなインターネット</a>でポエムを書いたりもします。
        </p>
        <p>
          このサイトは<a href="https://github.com/3p5ilon/Nextfolio">Nextfolio</a>のフォークで、Vercel上で動作しています。
          Next.jsやGitHubについては未熟ですが、生成AIの力で色々とカスタマイズしています。
        </p>
        <h2 className="mb-8 text-2xl font-medium">Phones</h2>
        <p>
          私が使用した歴代の携帯電話を紹介します。
        </p>
        <ul className="ps-0">
        {phones.map((phone, index) => (
          <li className="overflow-hidden m-0 ps-0 relative">
            <p className="w-16 float-left mt-1">
              {phone.year}
            </p>
            <div className="float-left border-l-2 border-white pl-8 relative before:content-[''] before:w-1 before:h-1 before:bg-white before:absolute before:left-10 before:top-1 before:rounded-full">
            <Link
              key={index}
              href={phone.url}
            >
              <h3 className="mt-1 mb-1 text-black dark:text-white">{phone.title}</h3>
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
