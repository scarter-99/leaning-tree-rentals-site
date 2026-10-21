import type { PostgrestError } from '@supabase/supabase-js';

// Supabase (PostgREST) caps every response at 1000 rows by default, so a plain
// `.select('*')` silently drops anything past row 1000. This pages through the
// results with `.range()` until a short page comes back.
// The query should have a deterministic order (e.g. end with `.order('id')`)
// so rows don't shift between pages.
const PAGE_SIZE = 1000;

type PageResult<T> = { data: T[] | null; error: PostgrestError | null };

export async function fetchAllRows<T>(
  fetchPage: (from: number, to: number) => PromiseLike<PageResult<T>>
): Promise<{ data: T[]; error: PostgrestError | null }> {
  const rows: T[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await fetchPage(from, from + PAGE_SIZE - 1);

    if (error) {
      return { data: rows, error };
    }

    rows.push(...(data ?? []));

    if (!data || data.length < PAGE_SIZE) {
      return { data: rows, error: null };
    }
  }
}
