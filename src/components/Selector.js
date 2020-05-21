import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import Text from './Text'

const customStyles = {
  control: base => ({
    ...base,
    backgroundColor: `#fff`,
  }),
  placeholder: base => ({
    ...base,
    color: `#111`,
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    color: `#111`,
    backgroundColor: `#fff`,
  }),
}

const Container = styled.div`
  width: ${({ theme }) => theme.sizes.selectContainerMobile};
  margin-bottom: ${({ theme }) => theme.space[5]};

  ${({ theme }) => theme.media.md} {
    width: ${({ theme }) => theme.sizes.selectContainerDesktop};

    &:first-child {
      margin-right: ${({ theme }) => theme.space[3]};
    }

    &:last-child {
      margin-left: ${({ theme }) => theme.space[3]};
    }
  }
`

export default ({ label, placeholder, options, onChange }) => {
  return (
    <Container>
      <Text as='label' sm={true}>
        {label}:
        <Select
          options={options}
          placeholder={placeholder}
          styles={customStyles}
          onChange={onChange}
        />
      </Text>
    </Container>
  )
}
