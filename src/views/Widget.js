import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { createDetailsWidget } from "@livechat/agent-app-sdk";
import WeatherCard from "../components/WeatherCard";

const wrapperCss = css`
  padding: 12px 8px 100px;
`;

const getWeather = async (city = "Wroclaw") => {
  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.REACT_APP_WEATHER_API,
          units: "metric",
        },
      }
    );

    // const data = await Promise.resolve(weatherData);

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const Widget = ({ authData }) => {
  // profile
  const [profile, setProfile] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const widget = useRef(null);

  const getWidget = async () => {
    try {
      widget.current = await createDetailsWidget();

      widget.current.on("customer_profile", async (profile) => {
        setProfile(profile);
      });
    } catch (error) {
      console.error(error);
      setProfile(null);
    }
  };

  useEffect(() => {
    getWidget();

    return () => widget.current?.off("customer_profile");
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weather = await getWeather(profile?.geolocation?.city);

        setCurrentWeather(weather);
      } catch (error) {
        setCurrentWeather(null);
      }
    };

    if (profile) {
      fetchWeather();
    }
  }, [profile]);

  return (
    <div css={wrapperCss}>
      {currentWeather && (
        <WeatherCard
          weather={currentWeather}
          profile={profile}
          authData={authData}
        />
      )}
    </div>
  );
};

export default Widget;
