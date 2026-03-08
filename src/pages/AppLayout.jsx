import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <main main className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </main>
  );
}

export default AppLayout;
