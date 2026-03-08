"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [discoverAI, setDiscoverAI] = useState(false);
  const [takeTest, setTakeTest] = useState(false);
  const router = useRouter();
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {takeTest ? (
          <>
           
            <h1 className={`${styles.heroText} ${styles.heroTextShiftLeft}`}>Sophisticated<br />skincare</h1>
          </>
        ) : (
          <h1
            className={
              discoverAI
                ? `${styles.heroText} ${styles.heroTextShiftRight}`
                : styles.heroText
            }
          >
            Sophisticated
            <br />
            skincare
          </h1>
        )}
      </main>
      {!takeTest && (
      <div className={styles.navLeft}>
        <div className={styles.decorativeBoxLeft} aria-hidden="true" />
        <button
          className={styles.diamondBtnOutlined}
          aria-label="Discover A.I."
          onMouseOver={() => setDiscoverAI(true)}
          onMouseOut={() => setDiscoverAI(false)}
          onClick={()=>router.push('/testing')}
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
      )}

      {!discoverAI && (
        <div className={styles.navRight}>
          <div className={styles.decorativeBoxRight} aria-hidden="true" />
          <span className={styles.navLabel}>TAKE TEST</span>
          <button className={styles.diamondBtnOutlined} 
          onMouseOver={() => setTakeTest(true)}
          onMouseOut={() => setTakeTest(false)}
          onClick={() => router.push("/testing")} aria-label="Take test">
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
