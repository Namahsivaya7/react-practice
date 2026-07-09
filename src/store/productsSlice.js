import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    {
      id: 1,
      name: "iPhone 15",
      price: 79999,
      category: "Mobile",
      description: "Experience the power of titanium, the A17 Pro chip, and the most advanced camera system on iPhone.",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "MacBook Air",
      price: 99999,
      category: "Laptop",
      description: "Strikingly thin, incredibly fast, and with up to 18 hours of battery life to breeze through work and play.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "iPad Pro",
      price: 69999,
      category: "Tablet",
      description: "The thinnest Apple product ever, featuring the breakthrough Ultra Retina XDR display and outrageous performance.",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60"
    }
  ]
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
})

export default productsSlice.reducer
