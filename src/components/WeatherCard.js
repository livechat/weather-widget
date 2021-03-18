import React from "react";
import { format } from "date-fns";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "@livechat/design-system";
import {
  wrapperCss,
  titleWrapperCss,
  titleCss,
  bodyWrapperCss,
  footerWrapperCss,
} from "./WeatherCard.style";

const WeatherCard = ({ weather, profile }) => {
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
        <Button kind="primary">Action</Button>
      </div>
    </div>
  );
};

export default WeatherCard;
