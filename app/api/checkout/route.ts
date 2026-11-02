import { NextResponse } from "next/server";

interface CheckoutLine {
  variantId: string;
  quantity: number;
}

interface CheckoutRequest {
  customer?: {
    name?: unknown;
    email?: unknown;
    city?: unknown;
    region?: unknown;
  };
  items?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function fail(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Server-side bridge from the demo storefront to the Nuvola API's public
 * checkout. Keeps the API URL and store slug out of the browser. No payment is
 * processed; the API records a pending demo order.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const base = process.env.NUVOLA_API_URL?.trim();
  if (!base) {
    return fail("Checkout is not connected to the store API.", 503);
  }
  const storeSlug = process.env.NUVOLA_STORE_SLUG?.trim() || "nuvola-market";
  const idempotencyKey = request.headers.get("idempotency-key")?.trim() ?? "";

  let body: CheckoutRequest;
  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return fail("Invalid request.", 400);
  }

  const name = toText(body.customer?.name);
  const email = toText(body.customer?.email).toLowerCase();
  const city = toText(body.customer?.city);
  const region = toText(body.customer?.region);

  if (name === "") return fail("Enter your name.", 400);
  if (!EMAIL_PATTERN.test(email))
    return fail("Enter a valid email address.", 400);
  if (city === "") return fail("Enter your city.", 400);
  if (region === "") return fail("Enter your region.", 400);

  const rawItems = Array.isArray(body.items) ? body.items : [];
  const items: CheckoutLine[] = [];
  for (const raw of rawItems) {
    if (typeof raw !== "object" || raw === null) continue;
    const record = raw as Record<string, unknown>;
    const variantId = toText(record.variantId);
    const quantity = Number(record.quantity);
    if (variantId === "" || !Number.isInteger(quantity) || quantity < 1) {
      continue;
    }
    items.push({ variantId, quantity });
  }
  if (items.length === 0) return fail("Your cart is empty.", 400);

  let response: Response;
  try {
    response = await fetch(`${base.replace(/\/$/, "")}/v1/public/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(idempotencyKey ? { "idempotency-key": idempotencyKey } : {}),
      },
      body: JSON.stringify({
        storeSlug,
        customer: { name, email, city, region },
        items,
      }),
      cache: "no-store",
    });
  } catch {
    return fail("Could not reach the store API.", 502);
  }

  const payload = (await response.json().catch(() => null)) as {
    error?: { code?: string; message?: string };
    id?: string;
    number?: string;
  } | null;

  if (!response.ok) {
    return NextResponse.json(
      {
        error: payload?.error?.message ?? "Checkout failed.",
        code: payload?.error?.code ?? null,
      },
      { status: response.status },
    );
  }

  return NextResponse.json(
    {
      orderId: payload?.id ?? null,
      orderNumber: payload?.number ?? null,
      replayed: response.headers.get("idempotency-replayed") === "true",
    },
    { status: 201 },
  );
}
