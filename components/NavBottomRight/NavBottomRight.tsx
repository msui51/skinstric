"use client";
import styles from './NavBottomRight.module.css';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

function NavBottomRight() {
    const router = useRouter();
    const pathname = usePathname();
  return (
    <div className={styles.navBottom}>
        {pathname === '/select' ? 
          <span className={styles.navLabel}>GET SUMMARY</span> :
        <span className={styles.navLabel}>PROCEED</span>
        }
        <button
          className={styles.diamondBtnOutlined}
          onClick={() => router.push(pathname === '/testing' ? "/result" : "/summary")}
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