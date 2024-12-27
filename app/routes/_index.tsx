import type { MetaFunction } from "@remix-run/node";
import DottedBg from "~/ui/DottedBg";
import Header from "~/ui/Header";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#F6EEE3] px-16 py-12">

      <div className="w-full flex">
        <div className="w-1/2">
          <h1 className="text-black text-5xl font-[Sinosans]">Ashesh</h1>
          <h1 className="text-black text-5xl font-[Sinosans]">Bandopadhyay</h1>
        </div>

        <div className="w-1/2 flex justify-end">
          <Header />
        </div>
      </div>

      <div className="h-full w-full py-6">
        <DottedBg />
      </div>

    </div >
  );
}