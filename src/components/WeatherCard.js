import React from "react";
import axios from "axios";
import { format } from "date-fns";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "@livechat/design-system";
import forecastData from "../data/forecast.json";
import {
  wrapperCss,
  titleWrapperCss,
  titleCss,
  bodyWrapperCss,
  footerWrapperCss,
} from "./WeatherCard.style";

const sendMessage = async (chatId, elements, token) => {
  try {
    await axios.post(
      "https://api.livechatinc.com/v3.2/agent/action/send_event",
      {
        chat_id: chatId,
        event: {
          type: "rich_message",
          recipients: "all",
          template_id: "cards",
          elements,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

const getForecast = async (city) => {
  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: "token",
          units: "metric",
          cnt: 5,
        },
      }
    );
    // const data = await Promise.resolve(forecastData);

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const sendForecast = async (city, token, chatId) => {
  try {
    const forecast = await getForecast(city);

    const forecastItems = forecast.list.map((item) => {
      return {
        day: format(new Date(item.dt_txt), "EEEE h aaa"),
        description: item.weather[0].description,
        temp: parseInt(item.main.temp, 10),
        max: parseInt(item.main.temp_max, 10),
        min: parseInt(item.main.temp_min, 10),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      };
    });

    const elements = forecastItems.map((item) => {
      return {
        title: item.day,
        subtitle: `${item.temp}C, ${item.description}`,
        image: {
          url: item.icon,
        },
      };
    });

    await sendMessage(chatId, elements, token);
  } catch (error) {
    console.log("error", error);
  }
};

const WeatherCard = ({ weather, profile, authData }) => {
  const handleSendForecast = async () => {
    try {
      await sendForecast(
        profile.geolocation.city,
        authData.access_token,
        profile.chat.chat_id
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div css={wrapperCss}>
      <div css={titleWrapperCss}>
        <div css={titleCss}>Customer Weather</div>
      </div>

      <div css={bodyWrapperCss}>
        <div
          css={css`
            font-size: 22px;
            margin-bottom: 4px;
          `}
        >
          {profile.geolocation.city}
        </div>

        <div
          css={css`
            font-size: 12px;
            text-transform: capitalize;
          `}
        >
          {weather.weather[0].description}
        </div>

        <div>
          <img
            alt="Weather icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
        </div>

        <div
          css={css`
            font-size: 36px;
            margin-bottom: 10px;
          `}
        >
          {parseInt(weather.main.temp, 10)}&deg;
        </div>

        <div>
          <span>H: {parseInt(weather.main.temp_max, 10)}&deg;</span>{" "}
          <span>L: {parseInt(weather.main.temp_min, 10)}&deg;</span>
        </div>
      </div>

      <div css={footerWrapperCss}>
        <Button kind="primary" onClick={handleSendForecast}>
          Send 12h forecast
        </Button>
      </div>
    </div>
  );
};

export default WeatherCard;
