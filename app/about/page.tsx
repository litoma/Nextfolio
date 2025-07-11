import Link from "next/link";
import type { Metadata } from "next";
import { phones } from "./phones-data";

export const metadata: Metadata = {
  title: "About",
  description: "About this site",
};

export default function Phones() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">About</h1>
      <div>
        <h2 className="mt-8 mb-4 text-xl font-medium">Myself</h2>
        <p className="mb-4">
          SNSなどのアカウント名は<strong>litoma</strong>をよく使っています。
          由来は昔プレイしていたオンラインゲームのハンドル名です。
          新しいサービスはなるべくこのアカウント名で登録していますが、出遅れて登録できなかったサービスも多々あります
          （例：Google、Instagram、Telegram、Yahoo!など）。
        </p>
        <h2 className="mt-8 mb-4 text-xl font-medium">Website</h2>
        <p className="mb-4">
          2023年から、<a href="https://text.yusukesakai.com/" className="underline decoration-neutral-600 dark:decoration-neutral-400">はてなブログ</a>で私的な記事を書いています。
          その前はWordPressを使っていました（アーカイブへのリンクは<a href="https://past.yusukesakai.com" className="underline decoration-neutral-600 dark:decoration-neutral-400">こちら</a>）。
          また、たまに<a href="https://sizu.me/litoma" className="underline decoration-neutral-600 dark:decoration-neutral-400">しずかなインターネット</a>にポエムを載せたりしています。
        </p>
        <p className="mb-4">
          このサイトは<a href="https://github.com/3p5ilon/Nextfolio" className="underline decoration-neutral-600 dark:decoration-neutral-400">Nextfolio</a>のフォークで、Vercel上で動作しています。
          開発スキルは未熟ですが、生成AIの力で身の丈以上のカスタマイズをしています。
        </p>
        <h2 className="mt-8 mb-4 text-xl font-medium">My mobile phones</h2>
        <p className="mb-4">
          唐突ですが、私が使用した歴代の携帯電話を紹介します。こうして振り返ると、どうやら偶数年に買い替え意欲が高まるようです。
        </p>
        <ul className="mt-8 mb-4">
        {phones.map((phone, index) => (
          <li className="overflow-hidden m-0 ps-0 relative">
            <p className="float-left w-1/7 box-border mt-1 pr-4 text-right">
              {phone.year}
            </p>
            <div className="float-left w-6/7 box-border border-l-2 border-neutral-600 dark:border-neutral-400 pl-6 pb-4 relative before:content-[''] before:w-[8px] before:h-[2px] before:bg-neutral-600 dark:before:bg-neutral-400 before:absolute before:left-0 before:top-2">
              <Link
                key={index}
                href={phone.url}
              >
                <h3 className="mt-1 mb-1">{phone.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
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
