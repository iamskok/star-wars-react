import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useRandomInterval from '../hooks/useRandomInterval'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import random from '../utils/random'
import range from '../utils/range'

const DEFAULT_COLOR = '#FFC700'

const generateStar = color => {
  const star = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 25),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
    },
  }

  return star
}

const Stars = ({ color = DEFAULT_COLOR, children }) => {
  const [stars, setStars] = useState(() => {
    // Generate 3 stars initially
    return range(3).map(() => generateStar(color))
  })

  const prefersReducedMotion = usePrefersReducedMotion()

  useRandomInterval(
    () => {
      const star = generateStar(color)
      const now = Date.now()
      const nextStars = stars.filter(star => {
        const delta = now - star.createdAt
        return delta < 750
      })

      nextStars.push(star)
      setStars(nextStars)
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 450
  )

  return (
    <Wrapper>
      {stars.map(star => (
        <Star
          key={star.id}
          color={star.color}
          size={star.size}
          style={star.style}
        />
      ))}
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  )
}

const Star = ({ size, color, style }) => {
  const path = `M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z`

  return (
    <StarWrapper style={style}>
      <StarSvg width={size} height={size} viewBox='0 0 24 24' fill='none'>
        <path d={path} fill={color} />
      </StarSvg>
    </StarWrapper>
  )
}

const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`

const StarWrapper = styled.span`
  position: absolute;
  display: block;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${comeInOut} ${({ theme }) => theme.durations.starWrapper};
    /*
      The target will retain the computed values set by the
      last keyframe encountered during execution.
      https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
    */
    animation-fill-mode: forwards;
  }
`

const StarSvg = styled.svg`
  display: block;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} ${({ theme }) => theme.durations.starSvg} linear;
  }
`

const ChildWrapper = styled.strong`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.starWrapper};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
`

export default Stars
