import React from 'react'

import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  width: 50px;
  height: 50px;
  background: red;
`
import './index.scss'

export const Detail = ({ show }) => {
  return (
    <Wrapper show={show}>

    </Wrapper>
  )
}
