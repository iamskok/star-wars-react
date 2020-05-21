import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
  }
`
