export function visiblePages(page: number, totalPages: number): number[] {
  const span = 2;
  const start = Math.max(1, Math.min(page - span, totalPages - span * 2));
  const end = Math.min(totalPages, start + span * 2);
  const pages: number[] = [];
  for (let current = start; current <= end; current += 1) pages.push(current);
  return pages;
}

export function buildPageHref(
  basePath: string,
  query: Record<string, string>,
  target: number,
): string {
  const params = new URLSearchParams(query);
  if (target > 1) params.set("page", String(target));
  const search = params.toString();
  return search ? `${basePath}?${search}` : basePath;
}
