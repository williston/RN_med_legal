import Link from 'next/link'

export function Footer() {
  return (
    <footer className="print:hidden bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © 2024 LegalNurseDoc - Professional Documentation System
          </div>
          <div className="flex gap-6 text-sm">
            <Link 
              href="/terms" 
              className="text-gray-600 hover:text-blue-700"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-600 hover:text-blue-700"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-blue-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}