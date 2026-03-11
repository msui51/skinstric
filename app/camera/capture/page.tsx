"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./capture.module.css";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user", width: 1280, height: 720 } })
      .then((mediaStream) => {
        if (!mounted) {
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => setReady(true);
        }
      })
      .catch((err) => console.error("Camera error:", err));

    return () => {
      mounted = false;
    };
  }, []);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.85);

    sessionStorage.setItem("capturedPhoto", base64);

    stream?.getTracks().forEach((t) => t.stop());
    router.push("/select");
  }, [stream, router]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>SKINSTRIC</span>
          <span className={styles.tag}>
            <span className={styles.bracket}>[</span>{" "}
            <span className={styles.bracket}>]</span>
          </span>
        </div>
      </header>

      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        playsInline
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {ready && (
        <div className={styles.captureArea}>
          <span className={styles.captureLabel}>TAKE PICTURE</span>
          <button
            className={styles.captureBtn}
            onClick={handleCapture}
            aria-label="Take picture"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="2" />
              <circle cx="14" cy="10" r="3" stroke="white" strokeWidth="1.5" />
              <path
                d="M6 20 L10 15 L14 18 L18 13 L22 17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      <Link href="/result" className={styles.backBtn}>
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
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </Link>

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
