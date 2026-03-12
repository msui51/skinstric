
"use client";
import styles from "./NavBottom.module.css";
import { useRouter, usePathname } from "next/navigation";

const BACK_ROUTES: Record<string, string> = {
  "/testing": "/",
  "/result": "/testing",
  "/camera/capture": "/result",
  "/select": "/result",
  "/summary": "/select",
};

function NavBottom() {
  const router = useRouter();
  const pathname = usePathname();

  const isCamera = pathname === "/camera/capture";

  const handleBack = () => {
    const destination = BACK_ROUTES[pathname];
    if (destination) {
      router.push(destination);
    }
  };

  return (
    <div className={styles.navBottom} onClick={handleBack}>
      <button
        className={styles.diamondBtnOutlined}
        aria-label="Go back"
        style={isCamera ? { borderColor: "#fff", background: "transparent" } : undefined}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={isCamera ? "white" : "black"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="2,8 14,2 14,14" />
        </svg>
      </button>
      <span
        className={styles.navLabel}
        style={isCamera ? { color: "#fff" } : undefined}
      >
        BACK
      </span>
    </div>
  );
}

export default NavBottom