import styled from '@emotion/styled'

export const AvatarInput = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  align-self: center;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }
  label {
    position: absolute;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #1976d2;
    right: -6px;
    bottom: -6px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      width: 15px;
      height: 15px;
      color: #fafafa;
    }
    &:hover {
      background: #1bb2f1;
    }
    input {
      display: none;
    }
  }
`
