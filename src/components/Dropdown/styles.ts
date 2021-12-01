import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Title = styled.div`
  cursor: pointer;
  color: #121415;
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 2.4rem;
  z-index: 50;

  @media (max-width: 600px) {
    padding-right: 0.5rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  color: #121415;
  margin-top: 2rem;
  position: absolute;
  right: 0;
  z-index: 50;

  &::before {
    content: '';
    position: absolute;
    border-right: 1.2rem solid transparent;
    border-left: 1.2rem solid transparent;
    border-bottom: 1.2rem solid #fafafa;
    top: -1.2rem;
    right: 2.4rem;
  }
`
export const Overlay = styled.div`
  ${() => css`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
  `}
`

type WrapperProps = {
  isOpen?: boolean
}

const wrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  close: () => css`
    opacity: 0;
    pointer-events: none;
    transform: translateY(-2rem);
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ isOpen }) => css`
    position: relative;
    width: max-content;
    ${Content}, ${Overlay} {
      transition: transform 0.2s ease-in opacity 0.3s ease-in-out;
      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.close()};
    }
  `}
`
