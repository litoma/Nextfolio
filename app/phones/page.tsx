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
      <h1 className="mb-8 text-2xl font-medium">My mobile phones history</h1>
      <div>
        {phones.map((phone, index) => (
          <Link
            key={index}
            href={phone.url}
            className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <h2 className="text-black dark:text-white">{phone.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {phone.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
