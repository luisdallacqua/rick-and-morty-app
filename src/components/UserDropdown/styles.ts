import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Nav = styled.nav`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 20rem;
    a:not(:last-child) {
      border-bottom: 0.1rem solid #ddd;
    }
  `}
`
export const Username = styled.span`
  ${() => css`
    font-size: 20px;
    padding: 0 0.5rem;
  `}
`

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const UserRole = styled.span`
  font-size: 0.8rem;
  margin-left: 0.6rem;
`

export const Link = styled.a`
  ${() => css`
    display: flex;
    align-items: center;
    text-decoration: none;
    background: #fff;
    color: #121416;
    padding: 0.8rem 1rem;
    transition: background-color ease-in-out 0.2s;
    &:hover {
      background: #1db954;
      color: #fafafa;
    }
    > svg {
      width: 2rem;
      height: 2rem;
    }
    > span {
      margin-left: 1rem;
    }
  `}
`
