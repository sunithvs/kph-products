'use client'

import { ProductCard } from '@/components/ui/product-card'
import productsData from '@/data/res.json'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function ProductsPage() {
  const products = productsData.results.map(result => {
    const data = JSON.parse(result.data)
    return data.data.post
  }).sort((a, b) => b.votesCount - a.votesCount)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-muted-foreground mt-1">
              Discover amazing products built by Kerala's innovators
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 rounded-md border bg-background"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="secondary" size="sm" className="rounded-full">
            Most Upvoted
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Recently Added
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Most Discussed
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `\${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
