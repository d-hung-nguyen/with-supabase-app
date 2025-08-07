export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="glass-card p-6 emerald-glow">
          <div className="text-center">
            <h1 className="text-2xl font-bold emerald-accent mb-2">
              Thank you for signing up!
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Check your email to confirm
            </p>
            <p className="text-sm text-muted-foreground">
              You&apos;ve successfully signed up. Please check your email to
              confirm your account before signing in.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
