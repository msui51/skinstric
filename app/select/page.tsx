import Link from "next/link";
import styles from "./select.module.css";

export default function Select() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>SKINSTRIC</span>
          <span className={styles.tag}>
            <span className={styles.bracket}>[</span> ANALYSIS{" "}
            <span className={styles.bracket}>]</span>
          </span>
        </div>
      </header>

      <div className={styles.infoBlock}>
        <h2 className={styles.infoTitle}>A. I. ANALYSIS</h2>
        <p className={styles.infoText}>
          A. I. HAS ESTIMATED THE FOLLOWING.
          <br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </div>

      <main className={styles.main}>
        <div className={styles.diamondWrapper}>
          <div
            className={`${styles.dashedDiamond} ${styles.dashedOuter}`}
            aria-hidden="true"
          />
          <div
            className={`${styles.dashedDiamond} ${styles.dashedMiddle}`}
            aria-hidden="true"
          />
          <div
            className={`${styles.dashedDiamond} ${styles.dashedInner}`}
            aria-hidden="true"
          />

          <div className={styles.diamond}>
            <button className={`${styles.quadrant} ${styles.quadrantActive}`}>
              <span className={styles.quadrantLabel}>DEMOGRAPHICS</span>
            </button>
            <button className={styles.quadrant}>
              <span className={styles.quadrantLabel}>
                COSMETIC
                <br />
                CONCERNS
              </span>
            </button>
            <button className={styles.quadrant}>
              <span className={styles.quadrantLabel}>
                SKIN TYPE
                <br />
                DETAILS
              </span>
            </button>
            <button className={styles.quadrant}>
              <span className={styles.quadrantLabel}>WEATHER</span>
            </button>
          </div>
        </div>
      </main>

      <div className={styles.navBottom}>
        <Link href="/testing" className={styles.navLink}>
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

        <Link href="#" className={styles.navLink}>
          <span className={styles.navLabel}>GET SUMMARY</span>
          <span className={styles.diamondBtnFilled}>
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L7 8L2 14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
