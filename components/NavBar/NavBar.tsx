import styles from "./NavBar.module.css"

function NavBar() {
  return (
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
  )
}

export default NavBar