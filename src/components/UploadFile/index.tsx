import { Alert, TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Image from 'next/image'
import styled from '@emotion/styled'
import imageDefault from '../../../public/grayUserImage.svg'
import axios from 'axios'

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

const UploadFile: React.FC<UploadFile> = ({ src, alt, onChange }) => {
  const [image, setImage] = useState(src)
  const [error, setError] = useState('')

  useEffect(() => {
    setImage(src)
  }, [src])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files?.[0]

    if (file) {
      if (file.size > 300 * 1024) {
        setError('This image is too large, please select one until 300Kb')
        return
      }

      const imageURL = await uploadFile(file)
      if (imageURL) {
        setError('')
        onChange && onChange(imageURL)
      }
      console.log('SRILL IMAGEURL', imageURL)
    }
  }

  return (
    <>
      <AvatarInput>
        <Image
          src={image || imageDefault}
          alt={alt}
          width="200px"
          height="200px"
        />

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
      </AvatarInput>
      {error && <Alert severity="error"> {error} </Alert>}
    </>
  )
}

export default UploadFile

async function uploadFile(file: File) {
  const url = 'https://api.cloudinary.com/v1_1/dubu28v1i/image/upload'
  const key = 'my-uploads'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', key)

  const image = await axios.post(url, formData)
  console.log('image insidee upload', image)
  return image.data.secure_url
}
