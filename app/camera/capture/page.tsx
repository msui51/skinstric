"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./capture.module.css";
import NavBottom from "@/components/NavBottom/NavBottom";
import { CiCamera } from "react-icons/ci";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    let mediaStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 1280, height: 720 },
        });

        if (!mounted) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        setStream(mediaStream);

        const video = videoRef.current;
        if (!video) {
          return;
        }

        video.srcObject = mediaStream;
        await video.play();

        if (mounted) {
          setReady(true);
        }
      } catch (error) {
        console.error("Camera error:", error);
        if (mounted) {
          setCameraError("Unable to access camera");
        }
      }
    };

    void startCamera();

    return () => {
      mounted = false;
      mediaStream?.getTracks().forEach((track) => track.stop());
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

    sessionStorage.setItem("cameraAnalysisImage", base64);
    sessionStorage.setItem("analysisSource", "camera");
    sessionStorage.removeItem("uploadData");

    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    router.push("/select");
  }, [stream, router]);

  return (
    <div className={styles.page}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        playsInline
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {!ready && !cameraError && (
        <div className={styles.cameraStatus}>OPENING CAMERA ...</div>
      )}

      {cameraError && <div className={styles.cameraStatus}>{cameraError}</div>}

      {ready && (
        <div className={styles.captureArea}>
          <span className={styles.captureLabel}>TAKE PICTURE</span>
          <button
            className={styles.captureBtn}
            onClick={handleCapture}
            aria-label="Take picture"
          >
            {/* <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            > */}
              {/* <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="2" />
              <circle cx="14" cy="10" r="3" stroke="white" strokeWidth="1.5" /> */}
              {/* <path
                d="M6 20 L10 15 L14 18 L18 13 L22 17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              /> */}
            {/* </svg> */}
            <CiCamera color="white" size={30} />
          </button>
        </div>
      )}

      <NavBottom />

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