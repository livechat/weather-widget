import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import WeatherCard from '../components/WeatherCard'

const wrapperCss = css`
  padding: 12px 8px 100px;
`

const Widget = () => {
  // profile
  // widget
  // api clients

  return (
    <div css={wrapperCss}>
      <WeatherCard />
    </div>
  )
}

export default Widget
