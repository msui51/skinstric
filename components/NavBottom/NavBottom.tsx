
"use client";
import styles from "./NavBottom.module.css";
import { useRouter } from "next/navigation";

function NavBottom() {
  const router = useRouter();

  return (
    <div className={styles.navBottom}  onClick={() => router.back()}>
        <button
          className={styles.diamondBtnOutlined}
          aria-label="Discover A.I."
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="2,8 14,2 14,14" />
          </svg>
        </button>
        <span className={styles.navLabel}>BACK</span>
      </div>
  )
}

export default NavBottom