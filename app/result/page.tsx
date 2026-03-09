"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./result.module.css";

interface ConfidenceEntry {
  label: string;
  value: number;
}

interface DemographicsData {
  race: {
    selected: string;
    confidence: ConfidenceEntry[];
  };
  age: string;
  sex: string;
}

export default function Result() {
  const [data, setData] = useState<DemographicsData | null>(null);
  const [selectedRace, setSelectedRace] = useState<string>("");

  useEffect(() => {
    fetch("/api/demographics")
      .then((res) => res.json())
      .then((json: DemographicsData) => {
        setData(json);
        setSelectedRace(json.race.selected);
      });
  }, []);

  if (!data) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  const topConfidence =
    data.race.confidence.find((c) => c.label === selectedRace)?.value ?? 0;

  const circumference = 2 * Math.PI * 120;
  const offset = circumference * (1 - topConfidence / 100);

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

      <div className={styles.titleBlock}>
        <p className={styles.titleSmall}>A. I. ANALYSIS</p>
        <h1 className={styles.titleLarge}>DEMOGRAPHICS</h1>
        <p className={styles.titleSub}>PREDICTED RACE &amp; AGE</p>
      </div>

      <div className={styles.content}>
        {/* Left sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {selectedRace.toUpperCase()}
            </span>
            <span className={styles.statLabel}>RACE</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{data.age}</span>
            <span className={styles.statLabel}>AGE</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {data.sex.toUpperCase()}
            </span>
            <span className={styles.statLabel}>SEX</span>
          </div>
        </aside>

        {/* Center chart */}
        <div className={styles.chartArea}>
          <p className={styles.chartTitle}>
            {selectedRace.charAt(0).toUpperCase() +
              selectedRace.slice(1).toLowerCase()}
          </p>
          <div className={styles.donutWrapper}>
            <svg
              className={styles.donutSvg}
              viewBox="0 0 260 260"
              fill="none"
            >
              <circle
                cx="130"
                cy="130"
                r="120"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="2"
              />
              <circle
                cx="130"
                cy="130"
                r="120"
                stroke="#000"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 130 130)"
              />
            </svg>
            <div className={styles.donutLabel}>
              <span className={styles.donutValue}>{topConfidence}</span>
              <span className={styles.donutPercent}>%</span>
            </div>
          </div>
        </div>

        {/* Right table */}
        <aside className={styles.tableArea}>
          <div className={styles.tableHeader}>
            <span>RACE</span>
            <span>A. I. CONFIDENCE</span>
          </div>
          {data.race.confidence.map((entry) => (
            <button
              key={entry.label}
              className={`${styles.tableRow} ${
                entry.label === selectedRace ? styles.tableRowActive : ""
              }`}
              onClick={() => setSelectedRace(entry.label)}
            >
              <span className={styles.tableRowLeft}>
                <span className={styles.diamond}>
                  {entry.label === selectedRace ? "◆" : "◇"}
                </span>
                <span>{entry.label}</span>
              </span>
              <span>{entry.value} %</span>
            </button>
          ))}
        </aside>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <Link href="/select" className={styles.navLink}>
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

        <p className={styles.hintText}>
          If A.I. estimate is wrong, select the correct one.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.btnOutline}
            onClick={() => setSelectedRace(data.race.selected)}
          >
            RESET
          </button>
          <button className={styles.btnFilled}>CONFIRM</button>
        </div>
      </div>
    </div>
  );
}
