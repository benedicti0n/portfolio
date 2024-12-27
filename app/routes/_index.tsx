import type { MetaFunction } from "@remix-run/node";
import DottedBg from "~/ui/DottedBg";
import Footer from "~/components/Footer";
import Header from "~/components/Header";


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

      <DottedBg />

      <Footer />

    </div>
  );
}