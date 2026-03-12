"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './camera.module.css';


function Camera() {
    const router = useRouter();

    useEffect(() => {
      let mounted = true;

      const setupCamera = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: 1280, height: 720 },
          });

          mediaStream.getTracks().forEach((track) => track.stop());

          if (mounted) {
            router.replace('/camera/capture');
          }
        } catch (error) {
          console.error('Camera setup error:', error);
          if (mounted) {
            router.replace('/result');
          }
        }
      };

      void setupCamera();

      return () => {
        mounted = false;
      };
    }, [router]);

  return (
    <div className={styles.page}>
        <div className={styles.main}>
            <div className={styles.diamondContainer}>
                    <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
                    <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
                    <div className={`${styles.dashedBox} ${styles.boxInner}`} />
                    <div className={styles.iconContainer}>
                        <img className={styles.icon}src='/icons/camera-icon.svg' />
                        <p className={styles.settingText}>SETTING UP CAMERA ...</p>
                    </div>
                    
            </div>
        </div>
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
  )
}

export default Camera
