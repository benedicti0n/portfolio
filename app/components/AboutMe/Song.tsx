import React, { useState, useEffect, useRef } from "react";
import { LuHeart, LuPlay, LuPause } from "react-icons/lu";
import "./slider.css";

const Song: React.FC = () => {
    const [audioMetadata, setAudioMetadata] = useState<{ duration: number }>({ duration: 0 });
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        audioRef.current = new Audio("/song/DieWithASmile.mp3");
        const audio = audioRef.current;

        audio.onloadedmetadata = () => {
            const duration = audio.duration;
            setAudioMetadata({ duration });
        };

        audio.ontimeupdate = () => {
            setCurrentTime(audio.currentTime);
        };

        return () => {
            audio.pause();
        };
    }, []);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(event.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center relative transition-shadow duration-300">
            <img
                src="/song/die_with_a_smile_banner.jpg"
                alt="Die with a smile song banner"
                className="w-32 rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
            />

            <div className="h-full w-full ml-2 flex flex-col">
                <div>
                    <h1 className="text-xl font-bold text-gray-800 font-[Sinosans]">
                        Die with a smile
                    </h1>
                    <h3 className="text-xs text-black font-[Sinosans]">
                        Lady Gaga • Bruno Mars
                    </h3>
                </div>

                <div className="w-full">
                    <input
                        type="range"
                        min={0}
                        max={audioMetadata.duration || 0}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className="slider custom-slider w-full h-1 bg-[#b08968] rounded-lg appearance-none cursor-pointer"
                    />

                    <div className="flex justify-between text-black">
                        <span className="text-sm font-[Sinosans]">
                            {formatTime(currentTime)}
                        </span>
                        <span className="text-sm font-[Sinosans]">
                            {formatTime(audioMetadata.duration)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="p-3 rounded-full bg-[#b08968] hover:bg-[#9c6644] transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        {isPlaying ? (
                            <LuPause className="w-4 h-4 text-white" />
                        ) : (
                            <LuPlay className="w-4 h-4 text-white" />
                        )}
                    </button>
                </div>
            </div>
            <LuHeart
                className="w-4 h-4 absolute top-0 right-0"
                fill="#ff6b6b"
                stroke="#ff6b6b"
            />
        </div>
    );
};

export default Song;