import { Alert, TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Image from 'next/image'
import imageDefault from '../../../public/grayUserImage.svg'
import axios from 'axios'
import * as S from './styles'

interface UploadFile extends Omit<TextFieldProps, 'onChange'> {
  src: string
  alt?: string
  onChange: (image: string) => void
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
        onChange(imageURL)
      }
    }
  }

  return (
    <>
      <S.AvatarInput>
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
      </S.AvatarInput>
      {error && <Alert severity="error"> {error} </Alert>}
    </>
  )
}

export default UploadFile

//uploading file to cloudinary and returning a link to store in DB

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
