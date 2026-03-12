"use client"
import styles from "./NavBar.module.css"
import { usePathname } from "next/navigation"

function NavBar() {
  const pathname = usePathname();
  return (
    <>
    {pathname === '/camera' ? null :
    <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>SKINSTRIC</span>
          <span className={styles.introTag}>
            <span className={styles.bracket}>[</span> INTRO{" "}
            <span className={styles.bracket}>]</span>
          </span>
        </div>
        <button className={styles.enterCodeBtn}>ENTER CODE</button>
      </header>
      }
    </>
  )
}

export default NavBar