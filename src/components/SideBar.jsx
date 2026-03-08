import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./SideBar.module.css";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* The <Outlet> renders the matched child route element */}
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWide Inc. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
