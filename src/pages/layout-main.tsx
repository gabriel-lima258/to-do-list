import { Outlet } from "react-router";
import Header from "../core-components/header.tsx";
import MainContent from "../core-components/main-content.tsx";
import Footer from "../core-components/footer.tsx";

export default function LayoutMain() {
  return (
    <>
      <Header />

      <MainContent>
        <Outlet />
      </MainContent>

      <Footer />
    </>
  )
}