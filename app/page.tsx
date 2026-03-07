"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [discoverAI, setDiscoverAI] = useState(false);
  const handleDiscoverClick = () => setDiscoverAI(prev=> !prev);
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
        <button className={styles.enterCodeBtn}>ENTER CODE</button>
      </header>

      <main className={styles.main}>
        <h1
          className={
            discoverAI
              ? `${styles.heroText} ${styles.heroTextShift}`
              : styles.heroText
          }
        >
          Sophisticated
          <br />
          skincare
        </h1>
      </main>

      <div className={styles.navLeft}>
        <div className={styles.decorativeBoxLeft} aria-hidden="true" />
        <button
          className={styles.diamondBtnOutlined}
          aria-label="Discover A.I."
          onClick={handleDiscoverClick}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="2,8 14,2 14,14" />
          </svg>
        </button>
        <span className={styles.navLabel}>DISCOVER A.I.</span>
      </div>

      {!discoverAI && (
        <div className={styles.navRight}>
          <div className={styles.decorativeBoxRight} aria-hidden="true" />
          <span className={styles.navLabel}>TAKE TEST</span>
          <button className={styles.diamondBtnOutlined} aria-label="Take test">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="14,8 2,2 2,14" />
            </svg>
          </button>
        </div>
      )}

      <p className={styles.bottomText}>
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES
        <br />
        A HIGHLY-PERSONALISED ROUTINE TAILORED TO
        <br />
        WHAT YOUR SKIN NEEDS.
      </p>
    </div>
  );
}
