import React, { useState } from 'react'
import styled from 'styled-components'
import isTouchDevice from '../utils/is-touch-device'

const StyledButton = styled.button`
  position: fixed;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
  z-index: ${({ theme }) => theme.zIndices.button};
  padding: ${({ theme }) => theme.space[2]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii[1]};
  background-color: ${({ touch, theme }) =>
    touch ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default};
  /* Block default tap highlight color on iOS. */
  -webkit-tap-highlight-color: transparent;
  &:hover {
    /* Don't apply hover styles on touch devices. */
    background-color: ${!isTouchDevice() &&
    (({ theme }) => theme.colors.primary)};
  }
`

export default ({ children, onClick, ...props }) => {
  const [touch, setTouch] = useState(false)
  const addTouchStyles = () => setTouch(true)
  const removeTouchStyles = () => setTouch(false)

  return (
    <StyledButton
      {...props}
      touch={touch}
      // Handle styles for touch devices.
      onTouchStart={addTouchStyles}
      onTouchEnd={removeTouchStyles}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}
