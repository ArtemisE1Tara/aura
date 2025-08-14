import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-stone-900 mb-2">Aura</h1>
          <p className="text-stone-600">Your calm space for focused work</p>
        </div>
        <SignUp 
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-sm border border-stone-200 rounded-lg",
              headerTitle: "text-stone-900 font-medium",
              headerSubtitle: "text-stone-600",
              socialButtonsIconButton: "border-stone-200 hover:bg-stone-50",
              formButtonPrimary: "bg-stone-900 hover:bg-stone-800 text-sm font-medium",
              formFieldInput: "border-stone-200 focus:border-stone-400 focus:ring-stone-400",
              footerActionLink: "text-stone-600 hover:text-stone-900"
            }
          }}
        />
      </div>
    </div>
  )
}
