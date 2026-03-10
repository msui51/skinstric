"use client";
import styles from './select.module.css';
import NavBottom from "@/components/NavBottom/NavBottom";
import NavBottomRight from "@/components/NavBottomRight/NavBottomRight";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function Select() {
  const [outer, setOuter] = useState(false);
  const [middle, setMiddle] = useState(false);
  const [inner, setInner] = useState(false);
  const [outerMost, setOuterMost] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.page}>
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
          {outerMost ? 
          <div
            className={`${styles.dashedDiamond} ${styles.dashedOuterMost}`}
            aria-hidden="true"
          /> : null}
          {outer ? 
          <div
            className={`${styles.dashedDiamond} ${styles.dashedOuter}`}
            aria-hidden="true"
          /> : null}
          {middle ?
          <div
            className={`${styles.dashedDiamond} ${styles.dashedMiddle}`}
            aria-hidden="true"
          /> : null}
          {inner ? 
          <div
            className={`${styles.dashedDiamond} ${styles.dashedInner}`}
            aria-hidden="true"
          /> : null}

          <div className={styles.diamond}>
            <button className={`${styles.quadrant} ${styles.quadrantActive}`}
              onMouseOver={() => setInner(true)}
            onMouseOut={() => setInner(false)}
            onClick={()=>router.push('/summary')}>
              <span className={styles.quadrantLabel}>DEMOGRAPHICS</span>
            </button>
            <button className={styles.quadrant}
              onMouseOver={() => setOuter(true)}
            onMouseOut={() => setOuter(false)}>
              <span className={styles.quadrantLabel}>
                SKIN TYPE DETAILS
              </span>
            </button>
            <button className={styles.quadrant}
              onMouseOver={() => setMiddle(true)}
            onMouseOut={() => setMiddle(false)}>
              <span className={styles.quadrantLabel}>
                COSMETIC
                <br />
                CONCERNS
              </span>
            </button>
            <button className={styles.quadrant}
              onMouseOver={() => setOuterMost(true)}
            onMouseOut={() => setOuterMost(false)}>
              <span className={styles.quadrantLabel}>WEATHER</span>
            </button>
          </div>
        </div>
      </main>
      

        <NavBottom />
        <NavBottomRight />
    </div>
  )
}

export default Select