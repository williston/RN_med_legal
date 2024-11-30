import { SignUp } from "@clerk/nextjs";
import Link from 'next/link';
import { Headphones } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-8">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Link href="/" className="text-2xl sm:text-3xl font-bold text-teal-600 flex items-center">
              <Headphones className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
              RNsync
            </Link>
          </div>
          
          <div className="flex justify-center w-full">
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-teal-500 hover:bg-teal-600 text-white rounded-full py-2 px-4 w-full",
                  card: "bg-white shadow-none w-full",
                  headerTitle: "text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6",
                  socialButtonsBlockButton: 
                    "border-2 border-gray-200 hover:border-teal-500 w-full",
                  formFieldInput: 
                    "pl-10 w-full px-4 py-2 rounded-full border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300",
                  footer: "hidden",
                  rootBox: "w-full flex justify-center",
                  card__main: "w-full",
                  form: "w-full",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  privacyPageUrl: "hidden",
                },
              }}
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/dashboard"
            />
          </div>
        </div>
        
        <div className="px-4 py-4 sm:px-8 bg-gray-50 border-t border-gray-200">
          <p className="text-sm leading-5 text-center">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}