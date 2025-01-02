import type { MetaFunction } from "@remix-run/node";
import DottedBg from "~/ui/DottedBg";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Portrait from "~/components/SideSection/Portrait";
import NavButtons from "~/components/SideSection/NavButtons";
import BuyMeKofi from "~/components/SideSection/BuyMeKofi";
import Heading from "~/components/Heading";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#F6EEE3] px-16 py-12">

      <Header />

      <DottedBg>
        {/* side-section */}
        <div className="w-[288px] max-h-full flex flex-col justify-between">
          <Portrait />
          <NavButtons />
          <BuyMeKofi />
        </div>

        <div className="w-full h-full ml-6">
          <Heading heading="LinkedIn" icon="/doodle.svg" color="#5282FF" />
        </div>

      </DottedBg>

      <Footer />

    </div>
  );
}