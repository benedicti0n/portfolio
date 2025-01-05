import Intro from "./Intro"
// import Song from "./Song"
import { GithubGraph } from "./Github"

const AboutMyself = () => {
    return (
        <div className='w-full grid grid-cols-3 gap-4'>
            <div className=" col-span-2">
                <Intro />

            </div>
            <div className="col-span-1">
                {/* <Song /> */}
                hi
            </div>

            <div className=" col-span-2">
                <div className="w-full border-2 border-blue-500 text-black font-[Syne]">
                    <GithubGraph
                        username="benedicti0n"
                        blockMargin={2}
                        colorPallete={["#ffe5ec", "#ffc2d1", "#ffb3c6", "#ff8fab", "#fb6f92"]}
                    />
                </div>
            </div>
            <div className="col-span-1">

            </div>

            <div className=" col-span-3">
                hi
            </div>
        </div>
    )
}

export default AboutMyself