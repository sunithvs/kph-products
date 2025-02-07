import { ProductCard } from '@/components/ui/product-card'
import productsData from '@/data/res.json'

export default function HomePage() {
  const products = productsData.results.map(result => {
    const data = JSON.parse(result.data)
    return data.data.post
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
