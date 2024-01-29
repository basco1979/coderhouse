import { ProductCardContainer } from "@/Components/ProductCardContainer";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import axios from 'axios'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState([])
   const getProducts = async () => {
    const { data, status } = await axios.get("http://localhost:8080/api/products")
    console.log(data.payload)
    setProducts(data.payload)
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
console.log(products)
  }, [])


  return (
    <>
<h1>Product´s List</h1>
<ProductCardContainer products={products} />
     </>
  );
}
