import React, { useState, useEffect, useRef } from "react";
import { LuHeart, LuPlay, LuPause } from "react-icons/lu";
import "./slider.css";

const song = "/song/DieWithASmile.mp3";

const Song: React.FC = () => {
    const [audioMetadata, setAudioMetadata] = useState<{ duration: number }>({ duration: 0 });
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        audioRef.current = new Audio(song);
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
        <div className="h-full flex items-center relative border-2 border-pink-500">
            <img src="/song/die_with_a_smile_banner.jpg" alt="Die with a smile song banner" className="h-28 rounded-lg" />

            <div className="absolute right-0 top-0">
                <LuHeart fill="red" stroke="black" />
            </div>

            <div className="h-full w-full ml-2 border-2 border-blue-500">
                <div className="text-black border-2 border-orange-500">
                    <h1 className="text-2xl font-[Sinosans]">Die with a smile</h1>
                    <h3 className="text-xs font-[Sinosans]">Lady Gaga • Bruno Mars</h3>
                </div>

                <div className="w-full border-2 border-cyan-500">
                    <input
                        type="range"
                        min={0}
                        max={audioMetadata.duration || 0}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className="slider custom-slider"
                    />
                </div>

                <div className="text-black flex justify-between border-2 border-orange-500">
                    <h1 className="text-sm font-[Sinosans]">{formatTime(currentTime)}</h1>
                    <h1 className="text-sm font-[Sinosans]">{formatTime(audioMetadata.duration)}</h1>
                </div>

                <div className="flex items-center justify-center">
                    {isPlaying ? (
                        <LuPause onClick={togglePlay} fill="red" stroke="black" />
                    ) : (
                        <LuPlay onClick={togglePlay} fill="red" stroke="black" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Song;

