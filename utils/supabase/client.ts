import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    'https://ybqbsvogavzgeubwnnkw.supabase.co',
    'sb_publishable_9sR7pd8D1ma7KFCDO4mqJg_kf9_4LdY',
  );
}