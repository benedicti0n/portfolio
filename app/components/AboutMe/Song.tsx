import { useState, useEffect, useRef } from "react";

import "./slider.css"
import { LuHeart, LuPlay, LuPause } from "react-icons/lu";


const song = "/song/DieWithASmile.mp3"

const Song = () => {
    const [audioMetadata, setAudioMetadata] = useState<{ duration: number | null }>({ duration: null })
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        audioRef.current = new Audio(song);

        const audio = audioRef.current;

        audio.onloadedmetadata = () => {
            const duration = audio.duration;
            setAudioMetadata({ duration });
            console.log({ duration });
        }

        audio.ontimeupdate = () => {
            setCurrentTime(audio.currentTime);
        }

        setIsPlaying

        return () => {
            audio.pause();
        }
    }, [song])

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(event.target.value);

        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            console.log(currentTime);

        }
    }

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            setCurrentTime(Math.floor(audioRef.current.currentTime));
        }
    }

    return (
        <div className="h-full flex items-center relative border-2 border-pink-500">
            <img src="/song/die_with_a_smile_banner.jpg" alt="Die with a smile song banner" className="h-28 rounded-lg" />

            <div className="absolute right-0 top-0">
                <LuHeart fill="red" stroke="black" />
            </div>

            <div className="h-full w-full ml-2 border-2 border-blue-500">

                {/* name and artist name */}
                <div className="text-black border-2 border-orange-500">
                    <h1 className="text-2xl font-[Sinosans]">Die with a smile</h1>
                    <h3 className="text-xs font-[Sinosans]">Lady Gaga • Bruno Mars</h3>
                </div>

                <div className="w-full border-2 border-cyan-500">
                    {/* Slider for audio control */}
                    <input
                        type="range"
                        min={0}
                        max={audioMetadata.duration || 0}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className="slider custom-slider"
                    />
                </div>

                {/* start time and end time */}
                <div className="text-black flex justify-between border-2 border-orange-500">
                    <h1 className="text-sm font-[Sinosans]">{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}</h1>
                    <h1 className="text-sm font-[Sinosans]">{Math.floor(audioMetadata.duration! / 60)}:{Math.floor(audioMetadata.duration!) % 60}</h1>
                </div>

                {/* controlls */}
                <div className="flex items-center justify-center">
                    <audio ref={audioRef} className="audio-player" autoPlay>
                        <source src={song} type="audio/mp3" />
                        <track kind="captions" srcLang="en" src="" default />
                    </audio>
                    {isPlaying ? (
                        <LuPause onClick={togglePlay} fill="red" stroke="black" />
                    ) : (
                        <LuPlay onClick={togglePlay} fill="red" stroke="black" />
                    )}
                </div>
            </div>

        </div>
    )
}

export default Song