'use client'
import {
  ClerkProvider,
} from '@clerk/nextjs'
//import type { Metadata } from "next";
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
//import { MobileMenu } from '@/components/MobileMenu'
import "./globals.css";
import { TermsAgreementModal } from '@/components/TermsAgreementModal'



/*  export const metadata: Metadata = {
  title: "NurseNoteAI",
  description: "NurseNoteAI is a tool to help nurses create SBAR forms.",
};  */

export default function Layout({ children }: { children: React.ReactNode }) {



  /* const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/login', label: 'Login' },
  ] */

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="min-h-screen flex flex-col">
            <Header>
             {/*  <MobileMenu navItems={navItems} /> */}
            </Header>
            <main className="flex-grow">
              {children}
              <TermsAgreementModal />
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
