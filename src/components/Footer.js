import React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Link from './Link'
import Pixels from './Pixels'

const StyledFooter = styled.footer`
  margin-top: auto;
  padding: ${({ theme }) => theme.space[2]};
`

export default ({ children }) => (
  <StyledFooter>
    <Text center={true} style={{ margin: 0 }} sm={true}>
      {`Built with `}
      <Link
        href='https://media.giphy.com/media/3oriO6qJiXajN0TyDu/source.gif'
        sm={true}
      >
        {`<3`}
      </Link>
      {` and `}
      <Pixels />
      {` by `}
      <Link href='https://github.com/iamskok' sm={true}>
        Vladimir
      </Link>
    </Text>

    {children}
  </StyledFooter>
)
