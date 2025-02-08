'use client'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  
  // Only show footer on home and products page
  if (pathname !== '/' && pathname !== '/products') {
    return null
  }
  return (
    <footer className="py-6 border-t mt-auto">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex justify-center items-center text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span>Made with</span>
          <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
          <span>by</span>
          <a 
            href="https://sunithvs.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-1 text-primary hover:underline"
          >
            Sunith
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
