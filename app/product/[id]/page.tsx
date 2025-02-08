'use client'

import productsData from '@/data/res.json'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, MessageCircle, Globe, ArrowLeft, Calendar, Twitter, Link as LinkIcon, User2, Share2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface Maker {
  name: string
  headline: string | null
  profileImage: string | null
  twitterUsername: string | null
  websiteUrl: string | null
  username: string
  createdAt: string
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productsData.results
    .map(result => {
      const data = JSON.parse(result.data)
      return data.data.post
    })
    .find(p => p.id === params.id)

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    )
  }

  const makers = product.makers.filter((maker: Maker) => maker.name !== '[REDACTED]')

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <motion.div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 mb-6 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
      
      {/* Main Product Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="max-w-4xl mx-auto overflow-hidden mb-8 border-2 shadow-lg">
        <div className="relative w-full h-[400px] overflow-hidden bg-gray-100 group">

          <Image
            src={`https://api.microlink.io?url=${encodeURIComponent(product.website)}&screenshot=true&embed=screenshot.url`}
            alt={`${product.name} preview`}
            className="object-cover"
            fill
            priority
          />
        </div>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{product.name}</CardTitle>
              <CardDescription className="text-xl mt-2">{product.tagline}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ArrowUpIcon className="w-4 h-4" />
                <span>{product.votesCount}</span>
              </Button>
              <Button 
                variant="outline" 
                className="inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{product.commentsCount}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {/* Product Description */}
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Tech</Badge>
              <Badge variant="secondary">Startup</Badge>
              <Badge variant="secondary">Kerala</Badge>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Product Meta */}
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Launched on {formatDate(product.createdAt)}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={product.website} target="_blank" rel="noopener noreferrer">
                <Button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors">
                  <Globe className="w-4 h-4" />
                  Visit Website
                </Button>
              </a>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="inline-flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  View on Product Hunt
                </Button>
              </a>
            </div>
          </div>


        </CardContent>
      </Card>
      </motion.div>

        </motion.div>
        </motion.div>
    </div>


  )}
