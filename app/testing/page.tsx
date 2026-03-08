"use client";

import styles from "./testing.module.css";
import NavBottom from "@/components/NavBottom/NavBottom";
import NavBottomRight from "@/components/NavBottomRight/NavBottomRight";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function Testing() {
     const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState<"name" | "location" | "processing" | "success">("name");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "name") {
      if (typeof name !== "string" || !name.trim()) {
        console.error("Name must be a non-empty string.");
        return;
      }
      setStep("location");
    } else if (step === "location") {
      if (typeof location !== "string" || !location.trim()) {
        console.error("Location must be a non-empty string.");
        return;
      }
      setStep("processing");
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await fetch("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, location }),
        });
        const result = await response.json();
        console.log("Form submission result:", result);
        setStep("success");
      } catch (error) {
        console.error("Error submitting form:", error);
        setStep("location"); // allow retry
      }
    }
  };

  return (
    <div className={styles.page}>
      <p className={styles.subtitle}>TO START ANALYSIS</p>

      <main className={styles.main}>
        <div className={styles.diamondContainer}>
          <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
          <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
          <div className={`${styles.dashedBox} ${styles.boxInner}`} />

          <form className={styles.inputArea} onSubmit={handleSubmit}>
      {step === "success" ? (
        <>
          <p className={styles.successText}>Thank you!</p>
          <p className={styles.successSubText}>Proceed for the next step</p>
        </>
      ) : step === "processing" ? (
        <>
          <p className={styles.successSubText}>Processing submission</p>
          <BsThreeDots className={styles.loadingIcon} />
        </>
      ) : (
        <>
          <span className={styles.clickLabel}>CLICK TO TYPE</span>
          {step === "name" ? (
            <input
              type="text"
              className={styles.nameInput}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <input
              type="text"
              className={styles.nameInput}
              placeholder="Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          )}
        </>
      )}
    </form>
        </div>
      </main>

      <NavBottom/>
      {step === 'success' ?
        <NavBottomRight/>
        : null}
    </div>
  );
}