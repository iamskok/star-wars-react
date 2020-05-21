import styled from 'styled-components'

/*
  Component API:

  1. `sm` - set smaller font size.
  2. `center` - set `text-align: center`
*/

export default styled.p`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.body};
  font-size: ${({ theme, sm }) =>
    sm ? theme.fontSizes[2] : theme.fontSizes[3]};
  line-height: ${({ theme }) => theme.lineHeights.body};
  transition: color ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default};
  ${({ center }) => center && 'text-align: center'}
`
