import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import Link from "next/link"
import { ArrowUpIcon, MessageCircle } from "lucide-react"

interface Product {
  name: string
  tagline: string
  description: string
  votesCount: number
  commentsCount: number
  id: string
  website: string
}

export function ProductCard({ product }: { product: Product }) {
  const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(product.website)}&screenshot=true&embed=screenshot.url`

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={screenshotUrl}
          alt={`${product.name} preview`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription>{product.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <ArrowUpIcon className="w-4 h-4" />
            <span>{product.votesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{product.commentsCount}</span>
          </div>
        </div>
        <div className="mt-4">
          <Link href={`/product/${product.id}`}>
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
