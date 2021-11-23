import { TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Image from 'next/image'
import styled from '@emotion/styled'
import imageDefault from '../../../public/grayUserImage.svg'

export const AvatarInput = styled.div`
  width: 100px;
  height: 100px;
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
    background-color: #1db954;
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
      background: #1ec064;
    }
    input {
      display: none;
    }
  }
`

interface UploadFile extends Omit<TextFieldProps, 'onChange'> {
  src: any
  alt?: string
  readOnly?: HTMLInputElement
  onChange?: (image: string) => void
}

const UploadFile: React.FC<UploadFile> = ({
  src,
  alt,
  readOnly = false,
  onChange
}) => {
  const [image, setImage] = useState(src)

  useEffect(() => {
    setImage(src)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [src])

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = (e) =>
      onChange && onChange(e.target ? String(e.target.result) : '')
  }

  return (
    <AvatarInput>
      <Image
        src={image || imageDefault}
        alt={alt}
        width="200px"
        height="200px"
      />

      {!readOnly && (
        <label htmlFor="picture">
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          <CameraAltIcon />
        </label>
      )}
    </AvatarInput>
  )
}

export default UploadFile
