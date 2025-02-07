'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import Link from "next/link"
import { ArrowUpIcon, MessageCircle } from "lucide-react"
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Product {
  name: string
  tagline: string
  description: string
  votesCount: number
  commentsCount: number
  id: string
  website: string
}

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(product.website)}&screenshot=true&embed=screenshot.url`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
        <div className="w-full h-48 overflow-hidden">
          <motion.img
            src={screenshotUrl}
            alt={`${product.name} preview`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <CardDescription>{product.tagline}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mt-2">
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ArrowUpIcon className="w-4 h-4" />
              <span>{product.votesCount}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{product.commentsCount}</span>
            </motion.div>
          </div>
          <div className="mt-4">
            <Link href={`/product/${product.id}`}>
              <Button 
                variant="outline" 
                className="w-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
