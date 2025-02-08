'use client'

import { ProductCard } from '@/components/ui/product-card'
import productsData from '@/data/res.json'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  const products = productsData.results
    .map(result => {
      const data = JSON.parse(result.data)
      return data.data.post
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold leading-tight">
            Every <span className="text-primary">Product</span> happenings
            in Kerala <span className="inline-block ml-2 transform scale-75">🌴</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Kerala&apos;s brightest minds come together to build the future of internet products,
            connect with like-minded innovators, and grow together.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              50+ Meetups Completed
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              100+ Companies
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              900+ Members
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-4">
            <Link href="/products">
              <Button size="lg" className="group">
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Products Section */}
      <section className="container mx-auto px-4 py-16 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold">Recently Launched</h2>
          <Link href="/products" className="text-primary hover:underline">
            View all products
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
