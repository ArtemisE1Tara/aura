'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Focus' },
  { href: '/dashboard/streams', label: 'Streams' },
  { href: '/dashboard/clarity', label: 'Clarity' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <h1 className="text-2xl font-light text-stone-900">Aura</h1>
            </Link>
            
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-stone-900',
                    pathname === item.href
                      ? 'text-stone-900 border-b-2 border-stone-900 pb-1'
                      : 'text-stone-600'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full",
                  userButtonPopoverCard: "bg-white border border-stone-200 shadow-lg",
                  userButtonPopoverActionButton: "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
