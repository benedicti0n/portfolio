import { useEffect, useState } from 'react';

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

type YouTubeProps = {
    username: string;
};

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // You should use environment variables
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export default function YouTube({ username }: YouTubeProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [channelData, setChannelData] = useState<ChannelData | null>(null); // Specify type for channelData

    const fetchChannelInfo = async () => {
        if (!username) return;

        setLoading(true);
        setError('');
        setChannelData(null);

        try {
            // Get channel ID from username
            const channelSearchRes = await fetch(
                `${YOUTUBE_API_BASE}/search?part=id&q=${username}&type=channel&maxResults=1&key=${YOUTUBE_API_KEY}`,
                { mode: 'cors' }
            );
            const channelSearch = await channelSearchRes.json();

            if (!channelSearch.items?.length) {
                throw new Error('Channel not found');
            }

            const channelId = channelSearch.items[0].id.channelId;

            // Get channel details
            const channelRes = await fetch(
                `${YOUTUBE_API_BASE}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${YOUTUBE_API_KEY}`,
                { mode: 'cors' }
            );
            const channelData = await channelRes.json();

            // Get latest video
            const videosRes = await fetch(
                `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`,
                { mode: 'cors' }
            );
            const videosData = await videosRes.json();

            setChannelData({
                bannerPicture: channelData.items[0].brandingSettings.image?.bannerExternalUrl,
                logo: channelData.items[0].snippet.thumbnails.high.url,
                viewsCount: parseInt(channelData.items[0].statistics.viewCount),
                videosCount: parseInt(channelData.items[0].statistics.videoCount),
                latestVideo: videosData.items[0] ? {
                    title: videosData.items[0].snippet.title,
                    description: videosData.items[0].snippet.description,
                    publishedAt: videosData.items[0].snippet.publishedAt,
                    thumbnailUrl: videosData.items[0].snippet.thumbnails.high.url,
                    videoId: videosData.items[0].id.videoId
                } : null
            });
            console.log(channelData);

        } catch (error) {
            setError(error.message || 'Failed to fetch channel data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChannelInfo()
    }, [username])

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6">

                {error && (
                    <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}

                {channelData && (
                    <div className="space-y-6">
                        {channelData.bannerPicture && (
                            <div className="relative aspect-[16/3] w-full overflow-hidden rounded-lg">
                                <img
                                    src={channelData.bannerPicture}
                                    alt="Channel Banner"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <img
                                    src={channelData.logo}
                                    alt="Channel Logo"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <div className="text-lg font-semibold">Channel Stats</div>
                                <div className="text-gray-600">
                                    {channelData.viewsCount.toLocaleString()} views • {channelData.videosCount.toLocaleString()} videos
                                </div>
                            </div>
                        </div>

                        {channelData.latestVideo && (
                            <div className="border rounded-lg p-4">
                                <div className="text-lg font-semibold mb-2">Latest Video</div>
                                <div className="relative aspect-video w-full mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src={channelData.latestVideo.thumbnailUrl}
                                        alt="Latest Video Thumbnail"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="font-medium">{channelData.latestVideo.title}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Published: {new Date(channelData.latestVideo.publishedAt).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-gray-600 mt-2 line-clamp-3">
                                    {channelData.latestVideo.description}
                                </div>
                                <a
                                    href={`https://www.youtube.com/watch?v=${channelData.latestVideo.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-blue-500 hover:text-blue-600"
                                >
                                    Watch on YouTube →
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}