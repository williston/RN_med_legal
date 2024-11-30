import { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-50">
        <nav className="flex flex-col space-y-4 mt-6">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="text-lg font-medium hover:text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 ease-in-out" 
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-200 ease-in-out mt-4" 
            onClick={closeMobileMenu}
          >
            Sign Up
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}