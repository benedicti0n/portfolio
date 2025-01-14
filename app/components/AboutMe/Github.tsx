"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Heading from "../Heading";
import FollowButton from "~/ui/FollowButton";
import { Activity, ActivityCalendar } from "react-activity-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";

type GithubGraphProps = {
  username: string;
  blockMargin?: number;
  colorPallete?: string[];
};

export const Github = ({
  username,
  blockMargin,
  colorPallete,
}: GithubGraphProps) => {
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [githubData, setGithubData] = useState<githubDataProps>();
  const [loading, setIsLoading] = useState<boolean>(true);
  const calendarRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      const contributions = await fetchContributionData(username);
      setContribution(contributions);
    } catch (error) {
      throw Error("Error fetching contribution data");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const fetchGithubDetails = useCallback(async () => {
    try {
      const githubData = await fetchGithubData(username);
      setGithubData(githubData);
    } catch (error) {
      throw Error("Error fetching github data");
    }
  }, [username]);

  useEffect(() => {
    fetchData();
    fetchGithubDetails();
  }, [fetchData, fetchGithubDetails]);

  // Scroll to the rightmost position when the calendar loads
  useEffect(() => {
    if (calendarRef.current && !loading) {
      const scrollContainer = calendarRef.current.querySelector('div');
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }
    }
  }, [loading]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  return (
    <div className="w-full">
      <Heading
        heading="Github"
        icon="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
        color="#000"
      />
      <div className="w-full flex ml-4 mt-2">
        <div className="w-[38%] flex border-2 border-purple-500">
          <img
            src={githubData?.avatarUrl}
            alt={`${username}_avatar`}
            className="h-32 rounded-lg"
          />
          <div className="ml-2 border-2 border-yellow-500">
            <h1 className="font-[Sinosans] text-xl">
              <span className="font-[Signature] text-xs">@</span>
              {username}
            </h1>
            <h1 className="font-[Syne] text-base ml-6">{githubData?.bio}</h1>
            <h1 className="font-[Syne] text-base ml-6">
              Followers: {githubData?.followers}
            </h1>
            <FollowButton color="#000000" extraClass="ml-6" />
          </div>
        </div>
        <div ref={calendarRef} className="w-[60%] [&_div]:scrollbar-hide">
          <ActivityCalendar
            data={contribution}
            maxLevel={4}
            blockMargin={blockMargin ?? 2}
            blockSize={10}
            loading={loading}
            labels={label}
            theme={{
              dark: colorPallete ?? [],
            }}
            renderBlock={(block, activity) => {
              return React.cloneElement(block, {
                "data-tooltip-id": "react-tooltip",
                "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
              });
            }}
          />
          <ReactTooltip
            id="react-tooltip"
            style={{ backgroundColor: "black", color: "blue" }}
          />
        </div>
      </div>
    </div>
  );
};

async function fetchContributionData(username: string): Promise<Activity[]> {
  const response = await fetch(`https://github.vineet.tech/api/${username}`);
  const responseBody = await response.json();
  if (!response.ok) {
    throw Error("Erroring fetching contribution data");
  }
  return responseBody.data;
}

interface githubDataProps {
  username: string;
  avatarUrl: string;
  bio: string;
  followers: number;
}

async function fetchGithubData(username: string): Promise<githubDataProps> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  if (!response.ok) {
    throw Error("Error fetching github data");
  }
  const githubData: githubDataProps = {
    username: username,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    followers: data.followers,
  };
  return githubData;
}