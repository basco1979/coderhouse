import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Link from 'next/link'

export default function ProductCard({
  title,
  description,
  price,
  id,
  thumbnail,
}) {
  return (
    <Link href={`/productdetail/${id}`}>
      <Card sx={{ width: 200 }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='200'
            image='http://localhost:8080/img/imagen-no-disponible.jpg'
            alt={title}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant='h3' component='div'>
              {title}
            </Typography>
            <Typography gutterBottom variant='h5' component='div'>
              {description}
            </Typography>
            <Typography gutterBottom variant='h6' component='div'>
              $ {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
