import type { MetaFunction } from "@remix-run/node";
import Canvas from "~/ui/Canvas";
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
    <div className="w-full h-screen flex justify-center items-center">
      <Canvas>
        <div className="border-2 border-red-600 w-full flex">
          <div className="border-2 border-cyan-500 w-1/2">
            <h1 className="text-black text-5xl font-[Sinosans]">Ashesh</h1>
            <h1 className="text-black text-5xl font-[Sinosans]">Bandopadhyay</h1>
          </div>

          <div className="border-2 border-emerald-500 w-1/2 flex justify-end">
            <Header />
          </div>
        </div>

        <DottedBg>
          hi
        </DottedBg>
      </Canvas>
    </div >
  );
}