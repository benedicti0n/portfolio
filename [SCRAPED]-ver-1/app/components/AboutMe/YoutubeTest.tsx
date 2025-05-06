import { useState, useEffect } from 'react';
import { youtubeData, videosData } from '~/youtube';
import Heading from '../Heading';

// Define types for channel data and props
type ChannelData = {
    bannerPicture?: string;
    logo: string;
    viewsCount: number;
    videosCount: number;
    latestVideo?: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnailUrl: string;
        videoId: string;
    } | null;
};


export default function YouTubeTest() {
    const [channelData, setChannelData] = useState<ChannelData | null>(null); // Specify type for channelData

    useEffect(() => {
        setChannelData({
            bannerPicture: youtubeData.items[0].brandingSettings.image?.bannerExternalUrl,
            logo: youtubeData.items[0].snippet.thumbnails.high.url,
            viewsCount: parseInt(youtubeData.items[0].statistics.viewCount),
            videosCount: parseInt(youtubeData.items[0].statistics.videoCount),
            latestVideo: videosData.items[0] ? {
                title: videosData.items[0].snippet.title,
                description: videosData.items[0].snippet.description,
                publishedAt: videosData.items[0].snippet.publishedAt,
                thumbnailUrl: videosData.items[0].snippet.thumbnails.high.url,
                videoId: videosData.items[0].id.videoId
            } : null
        });
    }, []);

    return (
        <div className="">
            <Heading heading='Youtube' color='red' icon='/logos/youtube.svg' />
            <div className="border-2 border-blue-500">

                {/* {error && (
                    <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-md">
                        {error}
                    </div>
                )} */}

                {channelData && (
                    <div className="">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                                <img
                                    src={channelData.logo}
                                    alt="Channel Logo"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <div className="text-lg font-[Sinosans] text-black">@BenedictionAsh03</div>
                                <div className="text-black font-[Syne]">
                                    {channelData.viewsCount.toLocaleString()} views • {channelData.videosCount.toLocaleString()} videos
                                </div>
                            </div>
                        </div>

                        {channelData.latestVideo && (
                            <div className="border-2 border-red-500">
                                <Heading heading='Latest videos' color='green' />
                                <div className='flex'>
                                    <div className="relative w-full">
                                        <img
                                            src={channelData.latestVideo.thumbnailUrl}
                                            alt="Latest Video Thumbnail"
                                            className="object-cover h-24"
                                        />
                                    </div>
                                    <div className="font-medium text-black">{channelData.latestVideo.title}</div>
                                    <div className="text-sm text-black">
                                        Published: {new Date(channelData.latestVideo.publishedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}

// href={`https://www.youtube.com/watch?v=${channelData.latestVideo.videoId}`}