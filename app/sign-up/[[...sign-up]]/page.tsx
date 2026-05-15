import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      {/* Decorative blobs */}
      <div className="absolute top-32 right-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center gap-6">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 rounded-full px-4 py-1.5 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
            🚀 Join the community
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Create your account
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Free forever - comment, discuss, and connect with other readers
          </p>
        </div>

        <SignUp
          appearance={{
            elements: {
              card: "shadow-2xl border border-slate-100 rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
}
