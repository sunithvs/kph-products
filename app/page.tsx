import { ProductCard } from '@/components/ui/product-card'
import productsData from '@/data/res.json'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
          <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-in slide-in-from-bottom duration-500">
            Every <span className="text-primary">Product</span> happenings
            in Kerala <span className="inline-block animate-bounce">🌴</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500 delay-150">
            Kerala's brightest minds come together to build the future of internet products,
            connect with like-minded innovators, and grow together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center animate-in slide-in-from-bottom duration-500 delay-300">
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
          </div>
          <div className="pt-4 animate-in slide-in-from-bottom duration-500 delay-500">
            <Link href="/products">
              <Button size="lg" className="group">
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
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
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="animate-in slide-in-from-bottom duration-500">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
