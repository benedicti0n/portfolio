// import Intro from "./Intro"
// import Song from "./Song"
import { GithubGraph } from "./Github"

const AboutMyself = () => {
    return (
        <div className='grid grid-cols-3 gap-4'>
            {/* <Intro />
            <Song /> */}
            <GithubGraph
                username="benedicti0n"
                blockMargin={2}
                colorPallete={["#ffe5ec", "#ffc2d1", "#ffb3c6", "#ff8fab", "#fb6f92"]}
            />
        </div>
    )
}

export default AboutMyself