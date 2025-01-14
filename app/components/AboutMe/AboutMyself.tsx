import Intro from "./Intro"
import Song from "./Song"
import { Github } from "./Github"
import Youtube from "./Youtube"

const AboutMyself = () => {
    return (
        <div className='h-full w-full grid grid-cols-5 gap-4'>
            <div className=" col-span-2">
                <Intro />
            </div>
            <div className="col-span-1 border-2 border-pink-500">
                Twitter
            </div>
            <div className="col-span-2">
                <Song />
            </div>

            <div className="col-span-4 border-2 border-blue-500 text-black font-[Syne]">
                <Github
                    username="benedicti0n"
                    blockMargin={2}
                    colorPallete={["#ede0d4", "#deab90", "#cd9777", "#b07d62", "#8a5a44"]}
                />
            </div>


            <div className=" col-span-1">
                <Youtube username="benedictionAsh03" />
            </div>
        </div>
    )
}

export default AboutMyself