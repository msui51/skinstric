"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./summary.module.css";

interface ConfidenceEntry {
  label: string;
  value: number;
}

type MetricKey = "race" | "age" | "sex";

interface MetricData {
  selected: string;
  confidence: ConfidenceEntry[];
}

interface DemographicsData {
  race: MetricData;
  age: MetricData;
  sex: MetricData;
}

interface RawDemographics {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

function getTopEntry(values: Record<string, number>): string {
  return Object.entries(values).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}

function toConfidenceEntries(values: Record<string, number>): ConfidenceEntry[] {
  return Object.entries(values)
    .map(([label, value]) => ({ label, value: Math.round(value * 100) }))
    .sort((a, b) => b.value - a.value);
}

function formatDisplayLabel(label: string): string {
  if (/\d/.test(label)) {
    return label;
  }

  return label
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getMetricLabel(metric: MetricKey): string {
  if (metric === "sex") {
    return "SEX";
  }

  return metric.toUpperCase();
}

function toDemographicsData(parsed: RawDemographics): DemographicsData {
  const topRace = getTopEntry(parsed.race);
  const topAge = getTopEntry(parsed.age);
  const topGender = getTopEntry(parsed.gender);

  return {
    race: { selected: topRace, confidence: toConfidenceEntries(parsed.race) },
    age: { selected: topAge, confidence: toConfidenceEntries(parsed.age) },
    sex: { selected: topGender, confidence: toConfidenceEntries(parsed.gender) },
  };
}

function dataUrlToFile(dataUrl: string, fileName: string): File | null {
  const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (!match) {
    return null;
  }

  const mime = match[1] || "image/jpeg";
  const base64 = match[2];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], fileName, { type: mime });
}

function getSavedAnalysisImage(): string | null {
  const analysisSource = sessionStorage.getItem("analysisSource");

  if (analysisSource === "gallery") {
    return sessionStorage.getItem("galleryAnalysisImage");
  }

  if (analysisSource === "camera") {
    return sessionStorage.getItem("cameraAnalysisImage");
  }

  return (
    sessionStorage.getItem("galleryAnalysisImage") ??
    sessionStorage.getItem("cameraAnalysisImage")
  );
}

export default function Summary() {
  const [data, setData] = useState<DemographicsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<MetricKey>("race");
  const [selectedValues, setSelectedValues] = useState<Record<MetricKey, string>>({
    race: "",
    age: "",
    sex: "",
  });

  useEffect(() => {
    let mounted = true;

    const setDemographics = (parsed: RawDemographics) => {
      const demographics = toDemographicsData(parsed);
      setData(demographics);
      setSelectedValues({
        race: demographics.race.selected,
        age: demographics.age.selected,
        sex: demographics.sex.selected,
      });
    };

    const loadDemographics = async () => {
      try {
        const savedUpload = sessionStorage.getItem("uploadData");
        if (savedUpload) {
          const parsed = JSON.parse(savedUpload) as RawDemographics;
          if (mounted) {
            setDemographics(parsed);
          }
          return;
        }

        const savedAnalysisImage = getSavedAnalysisImage();

        if (!savedAnalysisImage) {
          if (mounted) {
            setLoadError("No analysis image found.");
          }
          return;
        }

        const file = dataUrlToFile(savedAnalysisImage, "analysis-image.jpg");
        if (!file) {
          if (mounted) {
            setLoadError("Saved image is invalid.");
          }
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok || !result?.data) {
          throw new Error(result?.message ?? "Failed to analyze captured image");
        }

        sessionStorage.setItem("uploadData", JSON.stringify(result.data));

        if (mounted) {
          setDemographics(result.data as RawDemographics);
        }
      } catch (error) {
        if (mounted) {
          setLoadError(error instanceof Error ? error.message : "Failed to load demographics");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDemographics();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>{loadError}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  const activeData = data[activeMetric];
  const currentSelection = selectedValues[activeMetric] || activeData.selected;
  const currentConfidence =
    activeData.confidence.find((entry) => entry.label === currentSelection)?.value ?? 0;

  const circumference = 2 * Math.PI * 120;
  const offset = circumference * (1 - currentConfidence / 100);

  return (
    <div className={styles.page}>

      <div className={styles.titleBlock}>
        <p className={styles.titleSmall}>A. I. ANALYSIS</p>
        <h1 className={styles.titleLarge}>DEMOGRAPHICS</h1>
        <p className={styles.titleSub}>PREDICTED RACE &amp; AGE</p>
      </div>

      <div className={styles.content}>
        {/* Left sidebar */}
        <aside className={styles.sidebar}>
          <button
            type="button"
            className={`${styles.statCard} ${
              activeMetric === "race" ? styles.statCardActive : ""
            }`}
            onClick={() => setActiveMetric("race")}
          >
            <span className={styles.statValue}>
              {formatDisplayLabel(selectedValues.race)}
            </span>
            <span className={styles.statLabel}>RACE</span>
          </button>
          <button
            type="button"
            className={`${styles.statCard} ${
              activeMetric === "age" ? styles.statCardActive : ""
            }`}
            onClick={() => setActiveMetric("age")}
          >
            <span className={styles.statValue}>{selectedValues.age}</span>
            <span className={styles.statLabel}>AGE</span>
          </button>
          <button
            type="button"
            className={`${styles.statCard} ${
              activeMetric === "sex" ? styles.statCardActive : ""
            }`}
            onClick={() => setActiveMetric("sex")}
          >
            <span className={styles.statValue}>
              {formatDisplayLabel(selectedValues.sex)}
            </span>
            <span className={styles.statLabel}>SEX</span>
          </button>
        </aside>

        {/* Center chart */}
        <div className={styles.chartArea}>
          <p className={styles.chartTitle}>{formatDisplayLabel(currentSelection)}</p>
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
              <span className={styles.donutValue}>{currentConfidence}</span>
              <span className={styles.donutPercent}>%</span>
            </div>
          </div>
        </div>

        {/* Right table */}
        <aside className={styles.tableArea}>
          <div className={styles.tableHeader}>
            <span>{getMetricLabel(activeMetric)}</span>
            <span>A. I. CONFIDENCE</span>
          </div>
          {activeData.confidence.map((entry) => (
            <button
              key={entry.label}
              className={`${styles.tableRow} ${
                entry.label === currentSelection ? styles.tableRowActive : ""
              }`}
              onClick={() =>
                setSelectedValues((prev) => ({
                  ...prev,
                  [activeMetric]: entry.label,
                }))
              }
            >
              <span className={styles.tableRowLeft}>
                <span className={styles.diamond}>
                  {entry.label === currentSelection ? "◆" : "◇"}
                </span>
                <span>{formatDisplayLabel(entry.label)}</span>
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
            onClick={() =>
              setSelectedValues((prev) => ({
                ...prev,
                [activeMetric]: data[activeMetric].selected,
              }))
            }
          >
            RESET
          </button>
          <button className={styles.btnFilled}>CONFIRM</button>
        </div>
      </div>
    </div>
  );
}