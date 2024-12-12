import Image from "next/image";
import DottedBg from "./ui/DottedBg";
import Container from "./ui/Container";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <DottedBg>

      </DottedBg>
      <Container></Container>
    </div >
  );
}
