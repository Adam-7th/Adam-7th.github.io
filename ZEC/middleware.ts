import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LANGUAGE_COOKIE = "zec-lang";
const ONE_YEAR = 60 * 60 * 24 * 365;
const SUPPORTED_LANGS = ["en", "ru", "ar"] as const;

const GEO_LANG_MAP: Record<string, "en" | "ru" | "ar"> = {
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  AE: "ar",
  BH: "ar",
  DZ: "ar",
  EG: "ar",
  IQ: "ar",
  JO: "ar",
  KW: "ar",
  LB: "ar",
  LY: "ar",
  MA: "ar",
  MR: "ar",
  OM: "ar",
  PS: "ar",
  QA: "ar",
  SA: "ar",
  SD: "ar",
  SO: "ar",
  SY: "ar",
  TN: "ar",
  YE: "ar",
  DJ: "ar",
  KM: "ar",
};

const getCountry = (request: NextRequest) => {
  const headerCountry =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry");
  return headerCountry ?? undefined;
};

const getClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
};

const fetchCountryFromIp = async (ip?: string) => {
  const target = ip ? `https://ipwho.is/${ip}` : "https://ipwho.is/";
  const response = await fetch(target);
  if (!response.ok) return undefined;
  const data = (await response.json()) as { country_code?: string };
  return data.country_code ?? undefined;
};

const fetchCountryFallback = async (ip?: string) => {
  const target = ip ? `https://ipapi.co/${ip}/country/` : "https://ipapi.co/country/";
  const response = await fetch(target);
  if (!response.ok) return undefined;
  const text = (await response.text()).trim();
  return text.length === 2 ? text : undefined;
};

const lookupCountry = async (request: NextRequest) => {
  const headerCountry = getCountry(request);
  if (headerCountry) return headerCountry;

  if (process.env.ENABLE_GEO_LOOKUP !== "true") {
    return undefined;
  }

  const ip = getClientIp(request);
  try {
    const primary = await fetchCountryFromIp(ip);
    if (primary) return primary;
    return await fetchCountryFallback(ip);
  } catch {
    return undefined;
  }
};

export async function middleware(request: NextRequest) {
  const forced = request.nextUrl.searchParams.get("lang");
  if (forced && SUPPORTED_LANGS.includes(forced as (typeof SUPPORTED_LANGS)[number])) {
    const response = NextResponse.next();
    response.cookies.set(LANGUAGE_COOKIE, forced, {
      path: "/",
      maxAge: ONE_YEAR,
    });
    return response;
  }

  const existing = request.cookies.get(LANGUAGE_COOKIE)?.value;
  if (existing && SUPPORTED_LANGS.includes(existing as (typeof SUPPORTED_LANGS)[number])) {
    return NextResponse.next();
  }

  const country = (await lookupCountry(request))?.toUpperCase();
  const lang = country ? GEO_LANG_MAP[country] : undefined;
  if (!lang) {
    const response = NextResponse.next();
    response.cookies.set(LANGUAGE_COOKIE, "en", {
      path: "/",
      maxAge: ONE_YEAR,
    });
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set(LANGUAGE_COOKIE, lang, {
    path: "/",
    maxAge: ONE_YEAR,
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)",
  ],
};
