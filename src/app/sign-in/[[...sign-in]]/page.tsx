import { SignIn } from "@clerk/nextjs";
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-md border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-8">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Link href="/" className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <FileText className="mr-2 h-6 w-6 sm:h-8 sm:w-8 text-blue-700" />
              LegalNurseDoc
            </Link>
          </div>
          
          <div className="flex justify-center w-full">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-blue-700 hover:bg-blue-800 text-white rounded-md py-2 px-4 w-full",
                  card: "border-none bg-white shadow-none w-full",
                  headerTitle: "text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-6",
                  socialButtonsBlockButton: 
                    "border border-gray-300 hover:border-blue-500 rounded-md w-full",
                  formFieldInput: 
                    "w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500",
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
              path="/sign-in"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/dashboard"
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm leading-5 text-center text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="font-medium text-blue-700 hover:text-blue-800">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}