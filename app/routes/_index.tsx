import type { MetaFunction } from "@remix-run/node";
import DottedBg from "~/ui/DottedBg";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Portrait from "~/components/SideSection/Portrait";
import NavButtons from "~/components/SideSection/NavButtons";
import BuyMeKofi from "~/components/SideSection/BuyMeKofi";
import AboutMyself from "~/components/AboutMe/AboutMyself";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#F6EEE3] md:px-12 md:py-10">

      <Header />

      <DottedBg>
        {/* side-section */}
        <div className="w-[288px] max-h-full flex flex-col justify-between">
          <Portrait />
          <NavButtons />
          <BuyMeKofi />
        </div>

        <div className="w-full h-full ml-6  items-center">
          <AboutMyself />
        </div>

      </DottedBg>

      <Footer />

    </div>
  );
}