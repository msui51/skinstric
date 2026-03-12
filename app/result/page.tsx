"use client"

import styles from './result.module.css';
import NavBottom from "@/components/NavBottom/NavBottom";
import { useRef, useState, type ChangeEvent } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

function Result() {
    const [stage, setStage] = useState<'null' | 'uploading' | 'success'>('null');
    const [showCameraPopUp, setShowCameraPopUp] = useState(false);
    const router = useRouter();
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const handleGalleryClick = () => {
        galleryInputRef.current?.click();
    }

      const handleCameraClick = () => {
    setShowCameraPopUp(true);
  };

  const handleCameraDeny = () => {
    setShowCameraPopUp(false);
  };

     const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setStage('uploading');
            await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message ?? "Upload failed");
            }
            sessionStorage.setItem("uploadData", JSON.stringify(result.data));
            router.push('/select');
                  console.log("Upload success:", result);
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            e.target.value = "";
        }
    };

  return (
    <div className={styles.page}>
      <p className={styles.subtitle}>TO START ANALYSIS</p>
        <main className={styles.main}>
        {stage === 'uploading' ? (
            <div className={styles.diamondContainer}>
                <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
                <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
                <div className={`${styles.dashedBox} ${styles.boxInner}`} />
                <div className={styles.inputArea}>
                    <p className={styles.successSubText}>Processing submission</p>
                    <BsThreeDots className={styles.loadingIcon} />
                </div>
            </div>
          ) : (
            <>
                <div className={styles.diamondContainer}>
                    <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
                    <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
                    <div className={`${styles.dashedBox} ${styles.boxInner}`} />
                    <div className={styles.iconContainer}>
                        <img className={styles.icon}
                            src='/icons/camera-icon.svg'
                            onClick={handleCameraClick}
                        />
                        <img className={styles.iconTitle} src='/icons/camera-title.svg'/>
                    </div>
                     {showCameraPopUp && (
                <div className={styles.cameraPopup}>
                  <div className={styles.popupContent}>
                    <p className={styles.popupText}>
                      ALLOW A.I. TO ACCESS YOUR CAMERA
                    </p>
                    <div className={styles.popupLine} />
                    <div className={styles.popupActions}>
                      <button
                        className={styles.popupBtn}
                        onClick={handleCameraDeny}
                      >
                        DENY
                      </button>
                      <button
                        className={`${styles.popupBtn} ${styles.popupBtnBold}`}
                        onClick={() => router.push('/camera')}
                      >
                        ALLOW
                      </button>
                    </div>
                  </div>
                </div>
              )}
                </div>
                <div  className={`${styles.diamondContainer} 
                    ${showCameraPopUp ? styles.diamondFaded : ""}`}>
                    <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
                    <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
                    <div className={`${styles.dashedBox} ${styles.boxInner}`} />
                    <div className={styles.iconContainer}>
                        <img className={styles.icon}
                            src='/icons/gallery-icon.svg'
                            onClick={handleGalleryClick}
                        />
                        <img className={styles.iconGalleryTitle} src='/icons/gallery-title.svg'/>
                        <input type='file'
                            ref={galleryInputRef}
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </>
          )}
        </main>
        <NavBottom/>
    </div>
  )
}

export default Result