import styles from "./page.module.css";

export default function Home() {
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

      <div className={styles.decorativeBox} aria-hidden="true" />

      <main className={styles.main}>
        <h1 className={styles.heroText}>
          Sophisticated
          <br />
          skincare
        </h1>
      </main>

      <div className={styles.navLeft}>
        <button className={styles.diamondBtnFilled} aria-label="Discover A.I.">
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2L3 8L8 14"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className={styles.navLabel}>DISCOVER A.I.</span>
      </div>

      <div className={styles.navRight}>
        <span className={styles.navLabel}>TAKE TEST</span>
        <button className={styles.diamondBtnOutlined} aria-label="Take test">
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L7 8L2 14"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

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
