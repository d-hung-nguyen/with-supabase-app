export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="glass-card p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold emerald-accent mb-4">
              Sorry, something went wrong.
            </h1>
            {params?.error ? (
              <p className="text-sm text-muted-foreground">
                Code error: {params.error}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                An unspecified error occurred.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
