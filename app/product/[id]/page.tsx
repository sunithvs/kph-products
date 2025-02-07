import productsData from '@/data/res.json'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, MessageCircle, Globe, ArrowLeft, Calendar, Twitter, Link as LinkIcon, User2 } from 'lucide-react'
import Link from 'next/link'

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
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:text-gray-600">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>
      
      {/* Main Product Card */}
      <Card className="max-w-4xl mx-auto overflow-hidden mb-8">
        <div className="w-full h-[400px] overflow-hidden bg-gray-100">
          <img
            src={`https://api.microlink.io?url=${encodeURIComponent(product.website)}&screenshot=true&embed=screenshot.url`}
            alt={`${product.name} preview`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{product.name}</CardTitle>
              <CardDescription className="text-xl mt-2">{product.tagline}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <ArrowUpIcon className="w-4 h-4" />
                <span>{product.votesCount}</span>
              </Button>
              <Button variant="outline" className="inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{product.commentsCount}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {/* Product Description */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Product Meta */}
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Launched on {formatDate(product.createdAt)}</span>
            </div>
            <div className="flex gap-4">
              <a href={product.website} target="_blank" rel="noopener noreferrer">
                <Button className="inline-flex items-center gap-2">
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

          {/* Makers Section */}
          {makers.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Makers</h3>
              <div className="grid gap-6">
                {makers.map((maker: Maker) => (
                  <div key={maker.username} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {maker.profileImage ? (
                        <img
                          src={maker.profileImage}
                          alt={maker.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User2 className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{maker.name}</h4>
                      {maker.headline && (
                        <p className="text-gray-600 text-sm mt-1">{maker.headline}</p>
                      )}
                      <div className="flex gap-3 mt-3">
                        {maker.twitterUsername && (
                          <a
                            href={`https://twitter.com/${maker.twitterUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
                          >
                            <Twitter className="w-4 h-4" />
                            <span className="text-sm">@{maker.twitterUsername}</span>
                          </a>
                        )}
                        {maker.websiteUrl && (
                          <a
                            href={maker.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-600 inline-flex items-center gap-1"
                          >
                            <Globe className="w-4 h-4" />
                            <span className="text-sm">Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
