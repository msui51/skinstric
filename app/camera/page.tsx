"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./camera.module.css";

export default function CameraSetup() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/camera/capture");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.diamondContainer}>
          <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
          <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
          <div className={`${styles.dashedBox} ${styles.boxInner}`} />

          <div className={styles.centerContent}>
            <img
              className={styles.cameraIcon}
              src="/icons/camera-icon.svg"
              alt="Camera"
            />
            <p className={styles.settingText}>SETTING UP CAMERA ...</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.tipsTitle}>
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <div className={styles.tipsList}>
          <span className={styles.tip}>◇ NEUTRAL EXPRESSION</span>
          <span className={styles.tip}>◇ FRONTAL POSE</span>
          <span className={styles.tip}>◇ ADEQUATE LIGHTING</span>
        </div>
      </footer>
    </div>
  );
}
