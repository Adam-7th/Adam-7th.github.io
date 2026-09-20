"use client";

import Image from "next/image";
import Link from "next/link";
import founderImage from "@/founder.png";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { decodeMojibakeDeep } from "@/lib/text";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

const TOOL_STACK = ["n8n", "Zapier", "Make", "OpenAI", "HubSpot", "Telegram", "Webhooks"];
const FOUNDER_LINKEDIN_URL = "https://www.linkedin.com/in/henok-tariku1012/";

const UI_BY_LANG = {
  en: {
    heroBadge: "About ZEC",
    heroTitle: "Automation systems built for real operations",
    heroBody:
      "ZEC AI Automation Agency is an automation-native team focused on useful systems, not flashy demos. We build practical workflows that remove repetitive work, improve operational speed, and stay reliable after launch.",
    whyNowTitle: "Why Now (2026)",
    whyNowBody:
      "In 2026, more daily operations are handled by AI and automation, but most teams still struggle with reliability and execution. Businesses need dependable systems that integrate cleanly and produce measurable results.",
    whatZecTitle: "What ZEC Means",
    whatZecBody: "ZEC = Z(the) + EC (tech). The name reflects our focus on engineering discipline, execution clarity, and practical automation delivery.",
    toolsTitle: "Tools We Use",
    founderTitle: "Founders",
    founderName: "Henok Tariku and Elsa Alemayehu",
    founderRole: "Founder and Co-Founder",
    founderBio:
      "Henok Tariku is an AI automation specialist and Computer Science student at MIPT. Elsa Alemayehu is a Full-Stack Developer and Co-Founder of ZEC AI Automation Agency.",
    educationTitle: "Educational Background",
    education: [
      "Henok Tariku: MIPT, Bachelor's in Computer Science (Sep 2026 - Present)",
      "Henok Tariku: University of the People, Bachelor's in Computer Science",
      "Elsa Alemayehu: Bachelor's degree in Software Engineering at AASTU (Feb 2022 – Jun 2027)",
    ],
    teamTitle: "Team",
    teamSubtitle: "Cross-functional delivery team built for clear execution across automation, integrations, product, and rollout.",
    teamRoles: [
      {
        title: "Automation Architect",
        desc: "Designs end-to-end workflow architecture, logic paths, and system guardrails.",
      },
      {
        title: "Integration Engineer",
        desc: "Connects APIs, webhooks, CRM, and messaging tools with reliable data flow.",
      },
      {
        title: "Web Developer",
        desc: "Builds frontend and backend layers that connect automation to user-facing experience.",
      },
      {
        title: "Delivery Lead",
        desc: "Keeps execution clear with scoped milestones, rollout coordination, and handover quality.",
      },
      {
        title: "Data Analyst / AI Workflow Designer",
        desc: "Turns data into automation decisions, reporting loops, and AI-assisted workflow logic.",
      },
    ],
    securityTitle: "Security and Quality",
    securityPoints: [
      "Least-privilege access for systems and credentials",
      "Full documentation for implementation and handover",
      "Human-in-the-loop controls for sensitive steps",
    ],
    ctaTitle: "Want to automate your workflow?",
    ctaBody: "Book a free automation audit and we will identify where your team can save time and reduce manual work.",
    ctaPrimary: "Book Free Audit",
    ctaSecondary: "See Case Studies",
  },
  ru: {
    heroBadge: "Ðž ZEC",
    heroTitle: "Automation-ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹ Ð´Ð»Ñ Ñ€ÐµÐ°Ð»ÑŒÐ½Ñ‹Ñ… Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¹",
    heroBody:
      "ZEC AI Automation Agency - ÐºÐ¾Ð¼Ð°Ð½Ð´Ð°, Ð¾Ñ€Ð¸ÐµÐ½Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð°Ñ Ð½Ð° Ð¿Ñ€Ð°ÐºÑ‚Ð¸Ñ‡Ð½Ñ‹Ðµ ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹, Ð° Ð½Ðµ Ð½Ð° Ð´ÐµÐ¼Ð¾Ð½ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¾Ð½Ð½Ñ‹Ð¹ ÑˆÑƒÐ¼. ÐœÑ‹ Ð²Ð½ÐµÐ´Ñ€ÑÐµÐ¼ workflows, ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ðµ ÑƒÐ±Ð¸Ñ€Ð°ÑŽÑ‚ Ñ€ÑƒÑ‚Ð¸Ð½Ñƒ, ÑƒÑÐºÐ¾Ñ€ÑÑŽÑ‚ Ð¿Ñ€Ð¾Ñ†ÐµÑÑÑ‹ Ð¸ Ð½Ð°Ð´ÐµÐ¶Ð½Ð¾ Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‚ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð¿ÑƒÑÐºÐ°.",
    whyNowTitle: "ÐŸÐ¾Ñ‡ÐµÐ¼Ñƒ ÑÐµÐ¹Ñ‡Ð°Ñ (2026)",
    whyNowBody:
      "Ð’ 2026 Ð³Ð¾Ð´Ñƒ AI Ð¸ automation Ð¿Ñ€Ð¸Ð¼ÐµÐ½ÑÑŽÑ‚ÑÑ Ð¿Ð¾Ð²ÑÐµÐ¼ÐµÑÑ‚Ð½Ð¾, Ð½Ð¾ Ñƒ Ð¼Ð½Ð¾Ð³Ð¸Ñ… ÐºÐ¾Ð¼Ð°Ð½Ð´ Ð¾ÑÑ‚Ð°ÑŽÑ‚ÑÑ Ð¿Ñ€Ð¾Ð±Ð»ÐµÐ¼Ñ‹ Ñ Ð½Ð°Ð´ÐµÐ¶Ð½Ð¾ÑÑ‚ÑŒÑŽ Ð¸ Ð¸ÑÐ¿Ð¾Ð»Ð½ÐµÐ½Ð¸ÐµÐ¼. Ð‘Ð¸Ð·Ð½ÐµÑÑƒ Ð½ÑƒÐ¶Ð½Ñ‹ ÑƒÑÑ‚Ð¾Ð¹Ñ‡Ð¸Ð²Ñ‹Ðµ ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹ Ñ Ð¿Ð¾Ð½ÑÑ‚Ð½Ð¾Ð¹ Ð¸Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸ÐµÐ¹ Ð¸ Ð¸Ð·Ð¼ÐµÑ€Ð¸Ð¼Ñ‹Ð¼ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð¾Ð¼.",
    whatZecTitle: "Ð§Ñ‚Ð¾ Ð¾Ð·Ð½Ð°Ñ‡Ð°ÐµÑ‚ ZEC",
    whatZecBody: "ZEC = Z + EC (tech). ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¾Ñ‚Ñ€Ð°Ð¶Ð°ÐµÑ‚ Ð¸Ð½Ð¶ÐµÐ½ÐµÑ€Ð½Ñ‹Ð¹ Ð¿Ð¾Ð´Ñ…Ð¾Ð´, Ð¿Ñ€Ð¾Ð·Ñ€Ð°Ñ‡Ð½Ð¾Ðµ Ð¸ÑÐ¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ðµ Ð¸ Ð¿Ñ€Ð°ÐºÑ‚Ð¸Ñ‡Ð½ÑƒÑŽ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ð·Ð°Ñ†Ð¸ÑŽ.",
    toolsTitle: "Ð˜Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚Ñ‹",
    founderTitle: "ÐžÑÐ½Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒ",
    founderName: "Henok Tariku",
    founderRole: "ÐžÑÐ½Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒ Ð¸ Automation-Ð¸Ð½Ð¶ÐµÐ½ÐµÑ€",
    founderBio:
      "Henok Tariku - ÑÑ‚ÑƒÐ´ÐµÐ½Ñ‚ Ð¼Ð°Ð³Ð¸ÑÑ‚Ñ€Ð°Ñ‚ÑƒÑ€Ñ‹ Ð¿Ð¾ Financial Engineering Ð² WorldQuant University Ñ ÑÐ¸Ð»ÑŒÐ½Ð¾Ð¹ Ð±Ð°Ð·Ð¾Ð¹ Ð² Computer Science. Ð•Ð³Ð¾ Ñ„Ð¾ÐºÑƒÑ: Ð¿Ñ€Ð¸ÐºÐ»Ð°Ð´Ð½Ð°Ñ AI-Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ð·Ð°Ñ†Ð¸Ñ, Ð´Ð¸Ð·Ð°Ð¹Ð½ workflows, API-Ð¸Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ð¸ Ð¸ ÑÑ‚Ð°Ð±Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ production-Ð·Ð°Ð¿ÑƒÑÐº.",
    educationTitle: "ÐžÐ±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ",
    education: [
      "WorldQuant University: Master's in Financial Engineering (February 2026 - Present)",
      "MIPT: Bachelor's in Computer Science (November 2025 - Present)",
      "University of the People: Bachelor's in Computer Science (Dec 2023 - Jan 2026, CGPA 3.95)",
    ],
    teamTitle: "ÐšÐ¾Ð¼Ð°Ð½Ð´Ð°",
    teamSubtitle: "ÐšÑ€Ð¾ÑÑ-Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ð°Ñ ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð´Ð»Ñ Ñ‚Ð¾Ñ‡Ð½Ð¾Ð¹ Ñ€ÐµÐ°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ð¸ automation, Ð¸Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ð¹ Ð¸ Ð·Ð°Ð¿ÑƒÑÐºÐ°.",
    teamRoles: [
      {
        title: "Automation Architect",
        desc: "ÐŸÑ€Ð¾ÐµÐºÑ‚Ð¸Ñ€ÑƒÐµÑ‚ Ð°Ñ€Ñ…Ð¸Ñ‚ÐµÐºÑ‚ÑƒÑ€Ñƒ workflow, Ð»Ð¾Ð³Ð¸Ñ‡ÐµÑÐºÐ¸Ðµ Ð²ÐµÑ‚ÐºÐ¸ Ð¸ ÑÐ¸ÑÑ‚ÐµÐ¼Ð½Ñ‹Ðµ guardrails.",
      },
      {
        title: "Integration Engineer",
        desc: "Ð¡Ð¾ÐµÐ´Ð¸Ð½ÑÐµÑ‚ API, webhooks, CRM Ð¸ Ð¼ÐµÑÑÐµÐ½Ð´Ð¶ÐµÑ€Ñ‹ Ð² Ð½Ð°Ð´ÐµÐ¶Ð½Ñ‹Ð¹ Ð¿Ð¾Ñ‚Ð¾Ðº Ð´Ð°Ð½Ð½Ñ‹Ñ….",
      },
      {
        title: "Web Developer",
        desc: "Ð Ð°Ð·Ñ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÑ‚ frontend/backend ÑÐ»Ð¾Ð¹, ÑÐ²ÑÐ·Ñ‹Ð²Ð°ÑŽÑ‰Ð¸Ð¹ automation Ñ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ð¼ Ð¾Ð¿Ñ‹Ñ‚Ð¾Ð¼.",
      },
      {
        title: "Delivery Lead",
        desc: "Ð’ÐµÐ´ÐµÑ‚ ÑÑ‚Ð°Ð¿Ñ‹ Ð²Ð½ÐµÐ´Ñ€ÐµÐ½Ð¸Ñ, ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð¸Ñ€ÑƒÐµÑ‚ rollout Ð¸ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾ handover.",
      },
      {
        title: "Data Analyst / AI Workflow Designer",
        desc: "ÐŸÑ€ÐµÐ¾Ð±Ñ€Ð°Ð·ÑƒÐµÑ‚ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ, Ð¾Ñ‚Ñ‡ÐµÑ‚Ñ‹ Ð¸ AI-Ð»Ð¾Ð³Ð¸ÐºÑƒ.",
      },
    ],
    securityTitle: "Ð‘ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚ÑŒ Ð¸ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾",
    securityPoints: [
      "Ð”Ð¾ÑÑ‚ÑƒÐ¿ Ð¿Ð¾ Ð¿Ñ€Ð¸Ð½Ñ†Ð¸Ð¿Ñƒ Ð½Ð°Ð¸Ð¼ÐµÐ½ÑŒÑˆÐ¸Ñ… Ð¿Ñ€Ð¸Ð²Ð¸Ð»ÐµÐ³Ð¸Ð¹",
      "ÐŸÐ¾Ð»Ð½Ð°Ñ Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ð°Ñ†Ð¸Ñ Ð´Ð»Ñ Ð²Ð½ÐµÐ´Ñ€ÐµÐ½Ð¸Ñ Ð¸ Ð¿ÐµÑ€ÐµÐ´Ð°Ñ‡Ð¸",
      "Human-in-the-loop ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»ÑŒ Ð´Ð»Ñ Ñ‡ÑƒÐ²ÑÑ‚Ð²Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ñ… Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ð¹",
    ],
    ctaTitle: "Ð¥Ð¾Ñ‚Ð¸Ñ‚Ðµ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð¿Ñ€Ð¾Ñ†ÐµÑÑ?",
    ctaBody: "Ð—Ð°Ð¿Ð¸ÑˆÐ¸Ñ‚ÐµÑÑŒ Ð½Ð° Ð±ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ñ‹Ð¹ automation-Ð°ÑƒÐ´Ð¸Ñ‚, Ð¸ Ð¼Ñ‹ Ð¿Ð¾ÐºÐ°Ð¶ÐµÐ¼, Ð³Ð´Ðµ ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° ÑÑÐºÐ¾Ð½Ð¾Ð¼Ð¸Ñ‚ Ð²Ñ€ÐµÐ¼Ñ Ð¸ ÑÐ½Ð¸Ð·Ð¸Ñ‚ Ñ€ÑƒÑ‡Ð½ÑƒÑŽ Ð½Ð°Ð³Ñ€ÑƒÐ·ÐºÑƒ.",
    ctaPrimary: "Ð—Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒÑÑ Ð½Ð° Ð°ÑƒÐ´Ð¸Ñ‚",
    ctaSecondary: "Ð¡Ð¼Ð¾Ñ‚Ñ€ÐµÑ‚ÑŒ ÐºÐµÐ¹ÑÑ‹",
  },
  ar: {
    heroBadge: "Ø­ÙˆÙ„ ZEC",
    heroTitle: "Ø£Ù†Ø¸Ù…Ø© Ø£ØªÙ…ØªØ© Ù…Ø¨Ù†ÙŠØ© Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø­Ù‚ÙŠÙ‚ÙŠØ©",
    heroBody:
      "ZEC AI Automation Agency ÙØ±ÙŠÙ‚ ÙŠØ±ÙƒØ² Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ø¹Ù…Ù„ÙŠØ© ÙˆÙ„ÙŠØ³ Ø§Ù„Ø¹Ø±ÙˆØ¶ Ø§Ù„Ø´ÙƒÙ„ÙŠØ©. Ù†Ø¨Ù†ÙŠ workflows ØªÙ‚Ù„Ù„ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠØ¯ÙˆÙŠ ÙˆØªØ²ÙŠØ¯ Ø³Ø±Ø¹Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØªØ¨Ù‚Ù‰ Ù…ÙˆØ«ÙˆÙ‚Ø© Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.",
    whyNowTitle: "Ù„Ù…Ø§Ø°Ø§ Ø§Ù„Ø¢Ù† (2026)",
    whyNowBody:
      "ÙÙŠ 2026 Ø£ØµØ¨Ø­Øª Ø§Ù„Ø£ØªÙ…ØªØ© ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø¬Ø²Ø¡Ø§ Ù…Ù† Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„ÙŠÙˆÙ…ÙŠØ©ØŒ Ù„ÙƒÙ† Ø§Ù„ÙƒØ«ÙŠØ± Ù…Ù† Ø§Ù„ÙØ±Ù‚ Ù…Ø§ Ø²Ø§Ù„Øª ØªØ¹Ø§Ù†ÙŠ Ù…Ù† Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ÙŠØ© ÙˆØ§Ù„ØªÙ†ÙÙŠØ°. Ø§Ù„Ø´Ø±ÙƒØ§Øª ØªØ­ØªØ§Ø¬ Ø£Ù†Ø¸Ù…Ø© Ù…Ø³ØªÙ‚Ø±Ø© Ø¨Ù†ØªØ§Ø¦Ø¬ ÙˆØ§Ø¶Ø­Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù‚ÙŠØ§Ø³.",
    whatZecTitle: "Ù…Ø§Ø°Ø§ ÙŠØ¹Ù†ÙŠ ZEC",
    whatZecBody: "ZEC = Z + EC (tech). Ø§Ù„Ø§Ø³Ù… ÙŠØ¹ÙƒØ³ Ø§Ù†Ø¶Ø¨Ø§Ø·Ø§ Ù‡Ù†Ø¯Ø³ÙŠØ§ ÙˆØªÙ†ÙÙŠØ°Ø§ ÙˆØ§Ø¶Ø­Ø§ ÙˆØ£ØªÙ…ØªØ© Ø¹Ù…Ù„ÙŠØ©.",
    toolsTitle: "Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„ØªÙŠ Ù†Ø³ØªØ®Ø¯Ù…Ù‡Ø§",
    founderTitle: "Ø§Ù„Ù…Ø¤Ø³Ø³",
    founderName: "Henok Tariku",
    founderRole: "Ø§Ù„Ù…Ø¤Ø³Ø³ ÙˆÙ…Ù‡Ù†Ø¯Ø³ Ø£ØªÙ…ØªØ©",
    founderBio:
      "Henok Tariku Ø·Ø§Ù„Ø¨ Ù…Ø§Ø¬Ø³ØªÙŠØ± ÙÙŠ Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…Ø§Ù„ÙŠØ© Ø¨Ø¬Ø§Ù…Ø¹Ø© WorldQuant Ù…Ø¹ Ø®Ù„ÙÙŠØ© Ù‚ÙˆÙŠØ© ÙÙŠ Ø¹Ù„ÙˆÙ… Ø§Ù„Ø­Ø§Ø³ÙˆØ¨. ÙŠØ±ÙƒØ² Ø¹Ù„Ù‰ Ø§Ù„Ø£ØªÙ…ØªØ© Ø§Ù„Ø¹Ù…Ù„ÙŠØ© Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØªØµÙ…ÙŠÙ… workflows ÙˆØ§Ù„ØªÙƒØ§Ù…Ù„ Ø¹Ø¨Ø± APIs ÙˆØ§Ù„Ø¥Ø·Ù„Ø§Ù‚ Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚.",
    educationTitle: "Ø§Ù„Ø®Ù„ÙÙŠØ© Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©",
    education: [
      "WorldQuant University: Master's in Financial Engineering (February 2026 - Present)",
      "MIPT: Bachelor's in Computer Science (November 2025 - Present)",
      "University of the People: Bachelor's in Computer Science (Dec 2023 - Jan 2026, CGPA 3.95)",
    ],
    teamTitle: "Ø§Ù„ÙØ±ÙŠÙ‚",
    teamSubtitle: "ÙØ±ÙŠÙ‚ Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„ØªØ®ØµØµØ§Øª Ù„ØªÙ†ÙÙŠØ° ÙˆØ§Ø¶Ø­ Ø¹Ø¨Ø± Ø§Ù„Ø£ØªÙ…ØªØ© ÙˆØ§Ù„ØªÙƒØ§Ù…Ù„Ø§Øª ÙˆØ§Ù„Ù…Ù†ØªØ¬ ÙˆØ§Ù„Ø¥Ø·Ù„Ø§Ù‚.",
    teamRoles: [
      {
        title: "Automation Architect",
        desc: "ÙŠØµÙ…Ù… Ù…Ø¹Ù…Ø§Ø±ÙŠØ© workflow Ø§Ù„Ø´Ø§Ù…Ù„Ø© ÙˆÙ…Ø³Ø§Ø±Ø§Øª Ø§Ù„Ù…Ù†Ø·Ù‚ ÙˆØ¶ÙˆØ§Ø¨Ø· Ø§Ù„Ù†Ø¸Ø§Ù….",
      },
      {
        title: "Integration Engineer",
        desc: "ÙŠØ±Ø¨Ø· APIs Ùˆwebhooks ÙˆCRM ÙˆØ£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø±Ø§Ø³Ù„Ø© Ø¨ØªØ¯ÙÙ‚ Ø¨ÙŠØ§Ù†Ø§Øª Ù…ÙˆØ«ÙˆÙ‚.",
      },
      {
        title: "Web Developer",
        desc: "ÙŠØ¨Ù†ÙŠ Ø·Ø¨Ù‚Ø§Øª frontend/backend ØªØ±Ø¨Ø· Ø§Ù„Ø£ØªÙ…ØªØ© Ø¨ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù….",
      },
      {
        title: "Delivery Lead",
        desc: "ÙŠØ¯ÙŠØ± Ù…Ø±Ø§Ø­Ù„ Ø§Ù„ØªÙ†ÙÙŠØ° ÙˆØ§Ù„ØªÙ†Ø³ÙŠÙ‚ ÙˆØ¬ÙˆØ¯Ø© Ø§Ù„ØªØ³Ù„ÙŠÙ….",
      },
      {
        title: "Data Analyst / AI Workflow Designer",
        desc: "ÙŠØ­ÙˆÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø¥Ù„Ù‰ Ù‚Ø±Ø§Ø±Ø§Øª Ø£ØªÙ…ØªØ© ÙˆØªÙ‚Ø§Ø±ÙŠØ± ÙˆÙ…Ù†Ø·Ù‚ AI Ø¹Ù…Ù„ÙŠ.",
      },
    ],
    securityTitle: "Ø§Ù„Ø£Ù…Ø§Ù† ÙˆØ§Ù„Ø¬ÙˆØ¯Ø©",
    securityPoints: [
      "ÙˆØµÙˆÙ„ Ø¨Ø£Ù‚Ù„ ØµÙ„Ø§Ø­ÙŠØ§Øª Ù„Ù„Ø£Ù†Ø¸Ù…Ø© ÙˆØ§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯Ø§Øª",
      "ØªÙˆØ«ÙŠÙ‚ ÙƒØ§Ù…Ù„ Ù„Ù„ØªÙ†ÙÙŠØ° ÙˆØ§Ù„ØªØ³Ù„ÙŠÙ…",
      "Ø¶ÙˆØ§Ø¨Ø· Human-in-the-loop Ù„Ù„Ø®Ø·ÙˆØ§Øª Ø§Ù„Ø­Ø³Ø§Ø³Ø©",
    ],
    ctaTitle: "Ù‡Ù„ ØªØ±ÙŠØ¯ Ø£ØªÙ…ØªØ© Ø³ÙŠØ± Ø¹Ù…Ù„ÙƒØŸ",
    ctaBody: "Ø§Ø­Ø¬Ø² ØªØ¯Ù‚ÙŠÙ‚ Ø£ØªÙ…ØªØ© Ù…Ø¬Ø§Ù†ÙŠ ÙˆØ³Ù†Ø­Ø¯Ø¯ Ø£ÙŠÙ† ÙŠÙ…ÙƒÙ† Ù„ÙØ±ÙŠÙ‚Ùƒ ØªÙˆÙÙŠØ± Ø§Ù„ÙˆÙ‚Øª ÙˆØªÙ‚Ù„ÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠØ¯ÙˆÙŠ.",
    ctaPrimary: "Ø§Ø­Ø¬Ø² Ø§Ù„ØªØ¯Ù‚ÙŠÙ‚",
    ctaSecondary: "Ø¹Ø±Ø¶ Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø­Ø§Ù„Ø©",
  },
} as const;

export default function AboutPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const ui = decodeMojibakeDeep(UI_BY_LANG[lang]);
  const isRtl = lang === "ar";

  useLocalizedMeta(t.meta.pages.about.title, t.meta.pages.about.description);

  return (
    <div className={`mx-auto flex w-full max-w-[1000px] flex-col gap-8 pb-16 ${isRtl ? "text-right" : "text-left"}`}>
      <section className="rounded-3xl border border-edge bg-panel p-8 md:p-10 animate-[hero-in-up_320ms_ease_both]">
        <p className="inline-flex rounded-full border border-edge bg-panel2 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          {ui.heroBadge}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-text md:text-5xl">{ui.heroTitle}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{ui.heroBody}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "60ms" }}>
        <article className="rounded-3xl border border-edge bg-panel p-6">
          <h2 className="font-display text-2xl text-text">{t.aboutPage.valuesTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {t.aboutPage.values.map((value) => (
              <li key={value}>- {value}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-edge bg-panel p-6">
          <h2 className="font-display text-2xl text-text">{t.aboutPage.workStyleTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {t.aboutPage.workStyle.map((value) => (
              <li key={value}>- {value}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "100ms" }}>
        <article className="rounded-3xl border border-edge bg-panel p-6">
          <h2 className="font-display text-2xl text-text">{ui.whyNowTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{ui.whyNowBody}</p>
        </article>

        <article className="rounded-3xl border border-edge bg-panel p-6">
          <h2 className="font-display text-2xl text-text">{ui.whatZecTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{ui.whatZecBody}</p>
        </article>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "140ms" }}>
        <h2 className="font-display text-2xl text-text">{ui.toolsTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {TOOL_STACK.map((tool) => (
            <span key={tool} className="rounded-full border border-edge bg-panel2 px-3 py-1.5 text-xs text-text">
              {tool}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "180ms" }}>
        <h2 className="font-display text-2xl text-text">{ui.founderTitle}</h2>
        <article className="mt-4 grid gap-6 rounded-2xl border border-edge bg-panel2 p-5 md:grid-cols-[auto_1fr] md:items-center">
          <div className="founder-avatar-shell mx-auto md:mx-0">
            <Image
              src={founderImage}
              alt={`${ui.founderName} - ${ui.founderRole}`}
              width={168}
              height={168}
              className="h-40 w-40 rounded-full object-cover md:h-44 md:w-44"
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{ui.founderName}</p>
            <h3 className="mt-2 font-display text-2xl text-text">{ui.founderRole}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{ui.founderBio}</p>
            <a
              href={FOUNDER_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1.5 hover:border-brand"
            >
              <Image src="/logos/linkedin.svg" alt="LinkedIn" width={14} height={14} className="h-3.5 w-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text">LinkedIn</span>
            </a>

            <div className="mt-4 rounded-xl border border-edge bg-panel px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{ui.educationTitle}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {ui.education.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "220ms" }}>
        <h2 className="font-display text-2xl text-text">{ui.teamTitle}</h2>
        <p className="mt-2 text-sm text-muted">{ui.teamSubtitle}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {ui.teamRoles.map((role) => (
            <article key={role.title} className="rounded-2xl border border-edge bg-panel2 p-5 card-hover">
              <h3 className="text-sm font-semibold text-text">{role.title}</h3>
              <p className="mt-2 text-sm text-muted">{role.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "260ms" }}>
        <h2 className="font-display text-2xl text-text">{ui.securityTitle}</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {ui.securityPoints.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "300ms" }}>
        <h2 className="font-display text-3xl text-text">{ui.ctaTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted">{ui.ctaBody}</p>
        <div className={`mt-5 flex flex-wrap gap-3 ${isRtl ? "justify-end" : "justify-start"}`}>
          <Link href="/contact#schedule" className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {ui.ctaPrimary}
          </Link>
          <Link href="/case-studies" className="rounded-full border border-edge px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand">
            {ui.ctaSecondary}
          </Link>
        </div>
      </section>
    </div>
  );
}
