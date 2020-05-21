import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.sizes.container};
  min-height: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[3]};
`
