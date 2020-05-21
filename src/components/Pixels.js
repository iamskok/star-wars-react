import React from 'react'
import styled, { keyframes } from 'styled-components'
import Text from './Text'
import random from '../utils/random'

// Generate `clip-path` with random values.
const clipPath = () => `{
  clip-path: inset(${random(1, 60)}% 0 ${random(1, 60)}% 0);
}`

// Generate keyframes keys array.
const keys = Array.from({ length: 20 }).map((_, i) => i * 5 + '%')

// Generate 2 different keyframes for `::before` and `::after` pseudo classes.
const keyframes1 = keys.map(k => `${k + clipPath()}`).join('')
const keyframes2 = keys.map(k => `${k + clipPath()}`).join('')

const glitch1 = keyframes`${keyframes1}`
const glitch2 = keyframes`${keyframes2}`

const GlitchText = styled(Text)`
    /*
      Disable animation and show default text if the user has requested
      the system to minimize the amount of animation or motion it uses.
      For some folks, motion can trigger physical symptoms like nausea,
      dizziness, and malaise.
      https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion */
    @media not screen and (prefers-reduced-motion: reduce) {
      position: relative;
      top: 0;
      left: 0;
      display: inline-block;
      margin: 0;
      font-size: ${({ theme }) => theme.fontSizes[2]};
      &::before,
      &::after {
        content: "pixels";
        position: absolute;
        left: -1px;
        background-color: ${({ theme }) => theme.colors.background};
      }
      &::before {
        text-shadow: 1px 0 red;
        animation: ${glitch1} 3s infinite linear alternate-reverse;
      }
      &::after {
        text-shadow: -1px 0 blue;
        animation: ${glitch2} 3s infinite linear alternate-reverse;
      }
    }
  }
`

export default () => <GlitchText as='span'>pixels</GlitchText>
