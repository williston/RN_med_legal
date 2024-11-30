'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Headphones, FileText, MessageCircle } from 'lucide-react'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { FeedbackModal } from '@/components/FeedbackModal'



export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-blue-50 border-b border-teal-200 py-4 shadow-md print:hidden">
      <FeedbackModal open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen} />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-teal-600 flex items-center">
              <Headphones className="mr-2 h-6 w-6" />
              RNsync
            </Link>
            <nav className="hidden md:flex space-x-1">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-teal-600 px-3 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                Home
              </Link>
             <Link href="/user-forms" className="text-sm font-medium text-gray-700 hover:text-teal-600 px-3 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                My Forms
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-teal-600 px-3 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center">
                <MessageCircle className="mr-1 h-4 w-4" />
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-teal-600 px-3 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center">
                <MessageCircle className="mr-1 h-4 w-4" />
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFeedbackOpen(true)}
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 border-teal-200 hover:border-teal-300 hover:bg-teal-50/50 rounded-full transition-all duration-300 flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                Submit Feedback
              </Button>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonBox: "hover:opacity-75 transition-opacity"
                    }
                  }}
                />
              </SignedIn>
              <SignedOut>
                {/* <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="text-sm font-medium text-gray-700 hover:text-teal-600 rounded-full">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-full">Sign Up</Button>
                </SignUpButton> */}
              </SignedOut>
            </div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-teal-600 hover:text-teal-700 hover:bg-white rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-blue-50">
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link href="/" className="text-base font-medium text-gray-700 hover:text-teal-600 px-4 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center" onClick={closeMobileMenu}>
                    <FileText className="mr-2 h-5 w-5" />
                    Home
                  </Link>
                  <Link href="/user-forms" className="text-sm font-medium text-gray-700 hover:text-teal-600 px-3 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center" onClick={closeMobileMenu}>
                    <FileText className="mr-1 h-4 w-4" />
                    My Forms
                  </Link>
                  <Link href="/about" className="text-base font-medium text-gray-700 hover:text-teal-600 px-4 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center" onClick={closeMobileMenu}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    About
                  </Link>
                  <Link href="/contact" className="text-base font-medium text-gray-700 hover:text-teal-600 px-4 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center" onClick={closeMobileMenu}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact
                  </Link>
                  <button
                    onClick={() => {
                      setIsFeedbackOpen(true)
                      closeMobileMenu()
                    }}
                    className="text-base font-semibold text-teal-600 hover:text-teal-700 px-4 py-2 rounded-full hover:bg-white transition-all duration-300 ease-in-out flex items-center"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Submit Feedback
                  </button>
                  <SignedIn>
                    <UserButton 
                      appearance={{
                        elements: {
                          userButtonBox: "hover:opacity-75 transition-opacity"
                        }
                      }}
                    />
                  </SignedIn>
                  <SignedOut>
                    {/* <SignInButton mode="modal">
                      <Button variant="ghost" className="w-full justify-start text-base font-medium text-gray-700 hover:text-teal-600 rounded-full" onClick={closeMobileMenu}>Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full text-base font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-full" onClick={closeMobileMenu}>Sign Up</Button>
                    </SignUpButton> */}
                  </SignedOut>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}