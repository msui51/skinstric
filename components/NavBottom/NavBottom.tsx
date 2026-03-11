import Link from "next/link";
import styles from "./NavBottom.module.css";

export default function NavBottom() {
  return (
    <div className={styles.navBottom}>
      <Link href="/testing" className={styles.navLink}>
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
    </div>
  );
}
