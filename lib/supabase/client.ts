import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for build time when env vars aren't available
    return {
      from: () => ({
        select: () => ({ data: null, error: new Error('Supabase not configured') }),
        insert: () => ({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ data: null, error: new Error('Supabase not configured') }),
        delete: () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
      rpc: () => ({ data: null, error: new Error('Supabase not configured') }),
      auth: {
        getUser: () => ({ data: { user: null }, error: null }),
        signOut: () => ({ error: null }),
      },
      storage: {
        from: () => ({
          upload: () => ({ data: null, error: new Error('Supabase not configured') }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
      channel: () => ({
        on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
      }),
    } as ReturnType<typeof createBrowserClient>
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
