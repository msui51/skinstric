"use client";
import styles from './NavBottomRight.module.css';
import { useRouter } from 'next/navigation';

function NavBottomRight() {
    const router = useRouter();
  return (
    <div className={styles.navBottom}  onClick={() => router.push("/result")}>
        <span className={styles.navLabel}>PROCEED</span>
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
            <polygon points="14,8 2,2 2,14" />
          </svg>
        </button>
      </div>
  )
}

export default NavBottomRight