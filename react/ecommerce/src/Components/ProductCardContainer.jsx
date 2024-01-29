import React from 'react'
import ProductCard from './ProductCard'
import {Box, Grid} from '@mui/material'

export const ProductCardContainer = ({products}) => {
  return (
    <Box sx={{width: '100%'}}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{display: 'flex', justifyContent: 'center'}}>
        {products.map(({title, description, price, id, thumbnail}) => (
            <Grid item>
                <ProductCard title={title} description={description} price={price} key={id}/>
            </Grid>
        ))}
    </Grid>
    </Box>
  )
}
