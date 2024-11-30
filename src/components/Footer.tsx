import Link from 'next/link'

export function Footer() {
  return (
    <footer className="print:hidden bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            © 2024 SBAR Practice Tool
          </div>
          <div className="flex gap-6 text-sm">
            <Link 
              href="/terms" 
              className="text-gray-500 hover:text-teal-600"
            >
              Terms of Use
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-500 hover:text-teal-600"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-500 hover:text-teal-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}