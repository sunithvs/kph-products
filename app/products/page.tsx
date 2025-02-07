'use client'

import { ProductCard } from '@/components/ui/product-card'
import productsData from '@/data/res.json'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useState, useMemo } from 'react'

type SortOption = 'votes' | 'recent' | 'comments'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('votes')

  const allProducts = useMemo(() => {
    return productsData.results.map(result => {
      const data = JSON.parse(result.data)
      return data.data.post
    })
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'votes':
        return filtered.sort((a, b) => b.votesCount - a.votesCount)
      case 'recent':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'comments':
        return filtered.sort((a, b) => b.commentsCount - a.commentsCount)
      default:
        return filtered
    }
  }, [allProducts, searchQuery, sortBy])

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <Button
            variant={sortBy === 'votes' ? 'secondary' : 'outline'}
            size="sm"
            className="rounded-full"
            onClick={() => setSortBy('votes')}
          >
            Most Upvoted
          </Button>
          <Button
            variant={sortBy === 'recent' ? 'secondary' : 'outline'}
            size="sm"
            className="rounded-full"
            onClick={() => setSortBy('recent')}
          >
            Recently Added
          </Button>
          <Button
            variant={sortBy === 'comments' ? 'secondary' : 'outline'}
            size="sm"
            className="rounded-full"
            onClick={() => setSortBy('comments')}
          >
            Most Discussed
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
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
