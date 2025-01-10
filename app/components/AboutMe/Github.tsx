"use client";
import React, { useCallback, useEffect, useState } from "react";

import Heading from "../Heading";
import FollowButton from "~/ui/FollowButton";
import { Activity, ActivityCalendar } from "react-activity-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css"


type GithubGraphProps = {
  username: string;
  blockMargin?: number;
  colorPallete?: string[];
};

export const GithubGraph = ({
  username,
  blockMargin,
  colorPallete,
}: GithubGraphProps) => {
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [githubData, setGithubData] = useState<githubDataProps>()
  const [loading, setIsLoading] = useState<boolean>(true);

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
      const githubData = await fetchGithubData(username)
      setGithubData(githubData)
    } catch (error) {
      throw Error("Error fetching github data");
    }
  }, [username])

  useEffect(() => {
    fetchData();
    fetchGithubDetails();
  }, [fetchData]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  return (
    <div className="w-full border-2 border-blue-500">
      <Heading heading="Github" icon="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png" color="#000" />

      <div className="flex">
        <img src={githubData?.avatarUrl} alt={`${username}_avatar`} className="h-24" />

        <div>
          <h1>@{username}</h1>
          <h1>{githubData?.bio}</h1>
          <h1>Followers: {githubData?.followers}</h1>
          <FollowButton color="black" />
        </div>
      </div>

      <ActivityCalendar
        data={contribution}
        maxLevel={4}
        blockMargin={blockMargin ?? 2}
        blockSize={7}
        loading={loading}
        labels={label}
        theme={{
          dark: colorPallete ?? [
            "#ebedf0",
            "#9be9a8",
            "#40c463",
            "#30a14e",
            "#30a14e",
          ],
        }}
        style={{ width: "100vw" }}
        renderBlock={(block, activity) => {
          return React.cloneElement(block, {
            'data-tooltip-id': 'react-tooltip',
            'data-tooltip-html': `${activity.count} activities on ${activity.date}`
          });
        }}
      />
      <ReactTooltip id="react-tooltip" />
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
  const data = await response.json()

  if (!response.ok) {
    throw Error("Error fetching github data")
  }

  const githubData: githubDataProps = {
    username: username,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    followers: data.followers
  }

  return githubData;
}