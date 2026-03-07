"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./testing.module.css";

export default function Testing() {
  const [name, setName] = useState("");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>SKINSTRIC</span>
          <span className={styles.introTag}>
            <span className={styles.bracket}>[</span> INTRO{" "}
            <span className={styles.bracket}>]</span>
          </span>
        </div>
      </header>

      <p className={styles.subtitle}>TO START ANALYSIS</p>

      <main className={styles.main}>
        <div className={styles.diamondContainer}>
          <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
          <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
          <div className={`${styles.dashedBox} ${styles.boxInner}`} />

          <div className={styles.inputArea}>
            <span className={styles.clickLabel}>CLICK TO TYPE</span>
            <input
              type="text"
              className={styles.nameInput}
              placeholder="Introduce Yourself"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </main>

      <div className={styles.navBottom}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.diamondBtnOutlined}>
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2L3 8L8 14"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className={styles.navLabel}>BACK</span>
        </Link>
      </div>
    </div>
  );
}