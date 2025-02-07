'use client'

import Link from 'next/link'
import { Button } from './button'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { RulesModal } from './rules-modal'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About KPH', href: 'https://kph.club', external: true }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <span className="text-primary">KPH</span>
            Products
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`text-sm hover:text-primary transition-colors ${
                  pathname === item.href ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button size="sm" onClick={() => setShowRulesModal(true)}>Submit Product</Button>
            <RulesModal isOpen={showRulesModal} onOpenChange={setShowRulesModal} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`text-sm hover:text-primary transition-colors ${
                    pathname === item.href ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button size="sm" className="w-full" onClick={() => setShowRulesModal(true)}>Submit Product</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
