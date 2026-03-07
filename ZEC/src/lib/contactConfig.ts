const DEFAULT_CONTACT_EMAIL = "contact.zac.ai@gmail.com";
const DEFAULT_TELEGRAM_URL = "https://t.me/ZEC_Support";
const DEFAULT_LINKEDIN_URL = "https://www.linkedin.com/company/zec-ai-automation-agency";
const DEFAULT_WHATSAPP_URL = "https://wa.me/message/NYKVZLR54GY6D1";
const DEFAULT_CALENDLY_URL = "https://calendly.com/contact-zac-ai";

export const PUBLIC_CONTACT_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL).trim();
export const PUBLIC_CONTACT_MAILTO = `mailto:${PUBLIC_CONTACT_EMAIL}`;
export const PUBLIC_TELEGRAM_URL = (process.env.NEXT_PUBLIC_TELEGRAM_URL || DEFAULT_TELEGRAM_URL).trim();
export const PUBLIC_LINKEDIN_URL = (process.env.NEXT_PUBLIC_LINKEDIN_URL || DEFAULT_LINKEDIN_URL).trim();
export const PUBLIC_WHATSAPP_URL = (process.env.NEXT_PUBLIC_WHATSAPP_URL || DEFAULT_WHATSAPP_URL).trim();
export const PUBLIC_CALENDLY_URL = (process.env.NEXT_PUBLIC_CALENDLY_URL || DEFAULT_CALENDLY_URL).trim();
