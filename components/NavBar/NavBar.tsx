"use client"
import styles from "./NavBar.module.css"
import { usePathname } from "next/navigation"

function NavBar() {
  const pathname = usePathname();
  const isCamera = pathname === "/camera/capture";
  return (
    <>
    {pathname === '/camera' ? null :
    <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo} style={isCamera ? { color: "#fff" } : undefined}>SKINSTRIC</span>
          <span className={styles.introTag} style={isCamera ? {display: "none"} : undefined}>
            <span className={styles.bracket}>[</span> INTRO{" "}
            <span className={styles.bracket}>]</span>
          </span>
        </div>
        <button className={styles.enterCodeBtn} style={isCamera ? {display: "none"} : undefined}>ENTER CODE</button>
      </header>
      }
    </>
  )
}

export default NavBar