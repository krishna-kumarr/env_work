"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    console.log("NEXT_PUBLIC_API_KEY", process.env.NEXT_PUBLIC_API_KEY);
    console.log("NEXT_PUBLIC_API_KEY_1", process.env.NEXT_PUBLIC_API_KEY_1);
    console.log("NEXT_PUBLIC_API_KEY_2", process.env.NEXT_PUBLIC_API_KEY_2);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
          <li>
            {process.env.NEXT_PUBLIC_API_KEY === 'hiii' && (
              <p>The API Key is {process.env.NEXT_PUBLIC_API_KEY}</p>
            )}
          </li>

          <li>
            {process.env.NEXT_PUBLIC_API_KEY_1 === 'hello' && (
              <p>The API Key is {process.env.NEXT_PUBLIC_API_KEY_1}</p>
            )}
          </li>

          <li>
            {process.env.NEXT_PUBLIC_API_KEY_2 === 'success' && (
              <p>The API Key is {process.env.NEXT_PUBLIC_API_KEY_2}</p>
            )}
          </li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
