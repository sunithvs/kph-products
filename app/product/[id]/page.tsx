import productsData from '@/data/res.json'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, MessageCircle, Globe, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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

  return (
    <div className="container mx-auto py-8">
      <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:text-gray-600">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{product.name}</CardTitle>
          <CardDescription className="text-xl mt-2">{product.tagline}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mt-4">{product.description}</p>
          
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <ArrowUpIcon className="w-5 h-5" />
              <span className="text-lg">{product.votesCount} votes</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-lg">{product.commentsCount} comments</span>
            </div>
          </div>

          <div className="mt-8">
            <a href={product.website} target="_blank" rel="noopener noreferrer">
              <Button className="inline-flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Visit Website
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
