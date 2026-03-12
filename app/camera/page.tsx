import styles from './camera.module.css';


function Camera() {
    
  return (
    <div className={styles.page}>
        <div className={styles.main}>
            <div className={styles.diamondContainer}>
                    <div className={`${styles.dashedBox} ${styles.boxOuter}`} />
                    <div className={`${styles.dashedBox} ${styles.boxMiddle}`} />
                    <div className={`${styles.dashedBox} ${styles.boxInner}`} />
                    <div className={styles.iconContainer}>
                        <img className={styles.icon}src='/icons/camera-icon.svg' />
                        <p className={styles.settingText}>SETTING UP CAMERA ...</p>
                    </div>
                    
            </div>
        </div>
        <footer className={styles.footer}>
        <p className={styles.tipsTitle}>
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <div className={styles.tipsList}>
          <span className={styles.tip}>◇ NEUTRAL EXPRESSION</span>
          <span className={styles.tip}>◇ FRONTAL POSE</span>
          <span className={styles.tip}>◇ ADEQUATE LIGHTING</span>
        </div>
      </footer>
    </div>
  )
}

export default Camera
