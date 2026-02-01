export type Lang = "en" | "ru" | "ar";

export const copy = {
  en: {
    nav: {
      product: "Services",
      features: "Capabilities",
      builder: "Process",
      templates: "Use cases",
      pricing: "Pricing",
      contact: "Contact",
      signIn: "Sign in",
      signOut: "Sign out",
      startFree: "Get started",
    },
    labels: {
      steps: "Step",
      features: "Services",
      templates: "Use cases",
      pricing: "Pricing",
    },
    forms: {
      name: "Name",
      email: "Email",
      password: "Password",
      error: "Something went wrong.",
    },
    hero: {
      eyebrow: "Global AI Automation Agency",
      title: "Automate. Scale. Succeed.",
      subtitle:
        "We replace manual work with intelligent systems that scale across teams, regions, and platforms.",
      badge: "enterprise-ready",
      ctaPrimary: "Book a strategy call",
      ctaSecondary: "Get free audit",
      stats: ["AI agents + CRM", "Multi-language automation", "Secure, scalable delivery"],
    },
    integrations: {
      title: "Regional-first integrations",
      highlight: "Russia • MENA • Global",
      subtitle:
        "Telegram, VK, Yandex, WhatsApp, HubSpot, Slack, and APIs—connected into one workflow.",
      cta: "See all integrations",
    },
    features: {
      title: "Core automation services",
      subtitle:
        "Business-first systems for sales, support, HR, content, and internal operations.",
      items: [
        {
          title: "AI Agents for Business",
          text: "24/7 lead handling, support automation, knowledge assistants, and human handoff.",
        },
        {
          title: "CRM & Sales Automation",
          text: "Lead → qualification → deal, auto follow-ups, routing, and reporting.",
        },
        {
          title: "HR & Recruitment Automation",
          text: "Resume intake, AI screening, summaries, and ATS/CRM sync.",
        },
        {
          title: "Content & Social Automation",
          text: "Planning, AI generation, auto publishing, and analytics across channels.",
        },
      ],
    },
    builder: {
      eyebrow: "How AI automation works",
      title: "Data → Logic → Action → Result.",
      text:
        "We connect your data, apply business rules, and trigger actions across your tools.",
      cta: "Book a strategy call",
    },
    steps: [
      {
        title: "Audit",
        text: "We map goals, data sources, and workflows to define the highest ROI automation.",
      },
      {
        title: "Build",
        text: "We design, implement, and test automation with clear success metrics.",
      },
      {
        title: "Scale",
        text: "We optimize, expand, and maintain long-term performance.",
      },
    ],
    templates: {
      title: "Use cases we ship",
      subtitle:
        "Enterprise-grade automations that connect front-office and back-office systems.",
      items: [
        "AI sales agent → CRM → follow-ups",
        "AI support agent trained on your docs",
        "HR screening → shortlist → notifications",
        "Content pipeline: plan → publish → report",
        "Internal ops automation and alerts",
        "Reporting dashboards and analytics",
      ],
    },
    ops: {
      eyebrow: "Internal workflows",
      title: "Automate the backend.",
      text: "Task automation, data pipelines, reporting dashboards, and notifications.",
      bullets: ["Task automation", "Data pipelines", "Real-time reporting"],
    },
    pricing: {
      title: "Flexible pricing by region",
      subtitle: "Start with a Pilot/MVP, then scale into ongoing support.",
      tiers: [
        { name: "Starter", price: "from $1,000", text: "One focused workflow in 7–10 days." },
        { name: "Growth", price: "from $3,000", text: "2–3 workflows + CRM/AI integration." },
        { name: "Enterprise", price: "Custom", text: "Multi-team systems with governance." },
      ],
    },
    pricingModels: {
      title: "Flexible collaboration models",
      intro:
        "We match the format to your business, budget, and region. You pay only for what you truly need.",
      items: [
        {
          title: "Hourly",
          text: "For small tasks and consultations when scope is clear.",
        },
        {
          title: "Daily format",
          text: "For urgent fixes with focus on one outcome.",
        },
        {
          title: "Turnkey project",
          text: "Fixed goal and result. Best for AI agents and CRM automation.",
        },
        {
          title: "Monthly support",
          text: "Continuous improvements, support, and growth with regular calls.",
        },
        {
          title: "Dedicated specialist",
          text: "We work as part of your team on strategy and scaling.",
        },
      ],
      note: "We don’t sell hours — we take responsibility for outcomes.",
    },
    regionalPricing: {
      title: "Pricing depends on region",
      items: [
        "Russia — prices in ₽, fast launch, Telegram-first",
        "US/UK — focus on ROI and scaling",
        "UAE — flexible terms and partnership approach",
        "Other countries — custom proposal",
      ],
      note: "Region changes the format, not the quality.",
    },
    audienceSplit: {
      title: "For individuals and companies",
      individuals: {
        title: "Individuals / freelancers",
        bullets: [
          "Small scoped tasks",
          "Hourly or project format",
          "Low risk entry",
          "Fast start",
        ],
      },
      companies: {
        title: "Companies",
        bullets: [
          "Turnkey projects",
          "Monthly support",
          "Scaling and optimization",
          "Dedicated specialist",
        ],
      },
      cta: "We always start small and scale only when it makes business sense.",
    },
    mvp: {
      title: "Pilot launch / MVP",
      text:
        "For startups and hypothesis testing. One limited scenario, short timeline, ready to scale.",
      note: "We don’t build cheap solutions — we reduce the scope of work.",
    },
    meetings: {
      title: "Dedicated specialist and team calls",
      text:
        "Regular meetings, priority support, continuous improvements, and work like an internal team member.",
      options: ["Monthly calls", "Weekly strategy calls", "Fractional automation lead"],
    },
    booking: {
      title: "Contact us",
      text: "Choose the most convenient channel — we respond quickly.",
      buttons: ["Book a call", "Get free audit", "Message on Telegram"],
    },
    founderTeam: {
      title: "Founder & Team",
      founderName: "Henok Tariku Yadeta",
      founderTitle:
        "Founder & AI Automation Expert\nData Analyst (Junior → Professional Growth Path)",
      founderBio:
        "Founder with a strong background in computer science, AI automation, and data analysis. Experienced in building intelligent workflows, AI agents, and data-driven systems for business operations. Hands-on experience through academic excellence, global hackathons, and industry certifications.",
      highlightsTitle: "Key highlights",
      highlights: [
        "AI Automation & Workflow Design",
        "Data Analysis & Business Intelligence",
        "AI Agents & CRM Automation",
        "Microsoft AI Hackathon participant",
        "Oracle Cloud AI Certified",
        "Strong academic background in Computer Science",
      ],
      certificationsTitle: "Certifications",
      certifications: [
        "Microsoft AI / Data certifications",
        "Oracle Cloud Infrastructure – AI Foundations",
        "Oracle Data Science & Generative AI certifications",
      ],
      certificationsSection: {
        title: "Certifications",
        items: [
          {
            name: "Microsoft Certified: Power BI Data Analyst Associate",
            provider: "Microsoft",
            issued: "Dec 2025",
            expires: "Dec 2026",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          },
          {
            name: "Microsoft Certified: Azure Data Fundamentals",
            provider: "Microsoft",
            issued: "Jun 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
            provider: "Oracle",
            issued: "Nov 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
            provider: "Oracle",
            issued: "Oct 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
            provider: "Oracle",
            issued: "Oct 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
        ],
        focusAreas: "Focus areas: AI automation, data analysis, BI, cloud AI, and GenAI.",
      },
      linkedinCta: "View LinkedIn Profile",
      teamTitle: "Our Team",
      teamDescription:
        "We are a small, focused team of automation engineers, data analysts, and AI specialists. We combine technical expertise with business understanding to deliver practical automation solutions.",
      roles: [
        "AI Automation Engineer",
        "Data Analyst",
        "Workflow & Integration Specialist",
        "UI / Automation Designer",
      ],
      scaleNote: "Team size can scale based on project needs.",
      ctaTitle: "Want to work directly with the founder and the team?",
      ctaButtons: ["Book a strategy call", "Contact us"],
    },
    cta: {
      eyebrow: "Ready to start",
      title: "Ready to replace manual work?",
      text: "Book a strategy call or request a free audit. We’ll map your workflow and deliver a clear plan.",
      primary: "Book a strategy call",
      secondary: "Get free audit",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s build your automation roadmap.",
      subtitle: "Tell us your goals and tools. We’ll recommend the best starting scenario.",
      benefits: [
        "Response within 24 hours",
        "Global + regional delivery",
        "Security-first approach",
      ],
      name: "Name",
      email: "Email",
      company: "Company",
      role: "Role",
      focus: "Project focus",
      timeline: "Timeline",
      subject: "Subject",
      message: "Message",
      focusOptions: [
        "Select focus",
        "AI agents for sales/support",
        "CRM & sales automation",
        "HR & recruiting automation",
        "Content & social automation",
        "Backend workflows & reporting",
      ],
      timelineOptions: ["Select timeline", "ASAP", "2-4 weeks", "1-2 months", "Planning for later"],
      submit: "Send request",
      success: "Sent successfully.",
      error: "Something went wrong.",
    },
    auth: {
      title: "Access portal",
      subtitle: "Create an account to manage projects and appointments.",
      register: "Create account",
      signIn: "Sign in",
    },
    dashboard: {
      title: "Team dashboard",
      projects: "Project requests",
      appointments: "Appointments",
      emptyProjects: "No projects yet.",
      emptyAppointments: "No appointments yet.",
    },
    footer: {
      product: "Services",
      company: "Company",
      contact: "Contact",
    },
    footerLinks: {
      careers: "Careers",
      blog: "Blog",
      contact: "Contact",
      security: "Security",
    },
  },
  ru: {
    ruLanding: {
      hero: {
        eyebrow: "Глобальное AI-агентство автоматизации",
        title: "Автоматизируйте процессы и масштабируйтесь без ручной рутины.",
        subtitle:
          "Мы заменяем ручную работу интеллектуальными системами для продаж, поддержки, HR и внутренних процессов.",
        bullets: [
          "AI-агенты 24/7 для лидов и поддержки",
          "CRM + мессенджеры в одном процессе",
          "Быстрый MVP за 7–14 дней",
        ],
        ctas: {
          audit: "Запросить бесплатный аудит",
          telegram: "Написать в Telegram",
          calc: "Получить расчет",
        },
      },
      problems: {
        title: "Проблемы, которые мы решаем",
        items: [
          "Ручные процессы и потеря времени",
          "Потерянные лиды и медленные ответы",
          "Разрозненные инструменты без единой логики",
          "Низкая прозрачность и контроль",
          "Сложность масштабирования",
        ],
      },
      solutions: {
        title: "AI-автоматизация без магии",
        subtitle: "Данные → логика → действие → результат.",
        bullets: [
          "Снижение нагрузки на команду",
          "Скорость реакции 24/7",
          "Прозрачные метрики и отчетность",
        ],
      },
      how: {
        title: "Как мы работаем",
        steps: [
          { title: "Аудит", text: "Разбираем цели, данные и текущие процессы." },
          { title: "Дизайн", text: "Проектируем логику и архитектуру решения." },
          { title: "Сборка", text: "Внедряем и тестируем систему под KPI." },
          { title: "Запуск и масштаб", text: "Сопровождаем, улучшаем, расширяем." },
        ],
      },
      services: {
        title: "Ключевые направления",
        items: [
          {
            title: "AI-агенты для бизнеса",
            text: "Лиды, поддержка, базы знаний, квалификация, передача человеку.",
          },
          {
            title: "CRM и продажи",
            text: "Лид → квалификация → сделка, фоллоу-апы и отчеты.",
          },
          {
            title: "HR и рекрутинг",
            text: "Сбор резюме, AI-скрининг, уведомления, интеграция с ATS.",
          },
          {
            title: "Контент и соцсети",
            text: "Планирование, генерация, публикация, аналитика.",
          },
        ],
      },
      integrations: {
        title: "Интеграции для России и глобальных рынков",
        items: [
          "Telegram",
          "VK",
          "Yandex (Forms, Mail, Analytics, Cloud)",
          "Rutube",
          "amoCRM / Bitrix24",
          "Email и API",
        ],
      },
      cases: {
        title: "Примеры сценариев",
        items: [
          {
            title: "AI-агент продаж",
            bullets: [
              "Сбор и квалификация лидов 24/7",
              "Запись в CRM и постановка задач",
              "Авто фоллоу-апы",
              "Переадресация менеджеру",
            ],
          },
          {
            title: "HR-скрининг",
            bullets: [
              "Сбор резюме из формы/почты",
              "AI-ранжирование кандидатов",
              "Краткие summaries для HR",
              "Уведомления в Telegram/Email",
            ],
          },
          {
            title: "Контент-автоматизация",
            bullets: [
              "План → генерация → публикация",
              "VK/Telegram/Rutube/YouTube",
              "Аналитика и отчеты",
              "Единый календарь контента",
            ],
          },
          {
            title: "CRM-воркфлоу",
            bullets: [
              "Маршрутизация лидов",
              "Авто-напоминания",
              "Дашборды продаж",
              "Интеграции с мессенджерами",
            ],
          },
        ],
      },
      pricing: {
        title: "Цены для России (RUB)",
        subtitle:
          "Гибкое ценообразование под задачи бизнеса. Начните с пилота и масштабируйтесь.",
        tiers: [
          {
            name: "Starter",
            price: "от 120 000 ₽",
            text: "Один ключевой процесс за 7–10 дней.",
          },
          {
            name: "Business",
            price: "от 250 000 ₽",
            text: "2–3 процесса + CRM/AI интеграция.",
          },
          {
            name: "Pro",
            price: "от 500 000 ₽",
            text: "Многоэтапная автоматизация и масштабирование.",
          },
        ],
        support: "Поддержка: от 25 000 ₽ / месяц",
        micro: {
          title: "Микро-задачи",
          items: [
            "Консультация: от 1 000 ₽ / час",
            "Правки/доработки: от 10 000 ₽",
            "Интеграция: от 60 000 ₽",
            "Отчет/дашборд: от 30 000 ₽",
            "Аудит + стратегия: от 15 000 ₽",
          ],
        },
        pilot: {
          title: "Pilot / MVP",
          bullets: [
            "Скорость запуска и быстрый результат",
            "5–7 дней на первый прототип",
            "Оптимизированный объем работ",
            "Понятные метрики эффективности",
          ],
          note: "Сокращаем объем, но не качество — фокус на максимальном эффекте.",
        },
      },
      why: {
        title: "Почему HULUBET",
        bullets: [
          "Бизнес-ориентированный подход",
          "Быстрая доставка без потери качества",
          "Прозрачные метрики и отчетность",
          "Долгосрочное партнерство",
        ],
      },
      cta: {
        title: "Готовы заменить ручную работу?",
        subtitle:
          "Запишитесь на стратегический звонок или запросите бесплатный аудит.",
        audit: "Запросить бесплатный аудит",
        telegram: "Написать в Telegram",
        calc: "Получить расчет",
      },
    },
    nav: {
      product: "Услуги",
      features: "Возможности",
      builder: "Процесс",
      templates: "Кейсы",
      pricing: "Цены",
      contact: "Контакты",
      signIn: "Войти",
      signOut: "Выйти",
      startFree: "Начать",
    },
    labels: {
      steps: "Шаг",
      features: "Сервисы",
      templates: "Сценарии",
      pricing: "Цены",
    },
    forms: {
      name: "Имя",
      email: "Email",
      password: "Пароль",
      error: "Что-то пошло не так.",
    },
    hero: {
      eyebrow: "Глобальное AI-агентство автоматизации",
      title: "Автоматизируйте. Масштабируйте. Успевайте.",
      subtitle:
        "Мы заменяем ручную работу интеллектуальными системами, которые масштабируются по командам и регионам.",
      badge: "enterprise-ready",
      ctaPrimary: "Забронировать стратегический звонок",
      ctaSecondary: "Получить бесплатный аудит",
      stats: ["AI-агенты + CRM", "Мультиязычные сценарии", "Безопасная инфраструктура"],
    },
    integrations: {
      title: "Интеграции под ваш регион",
      highlight: "Россия • MENA • Global",
      subtitle:
        "Telegram, VK, Yandex, WhatsApp, HubSpot, Slack и API — в одном процессе.",
      cta: "Все интеграции",
    },
    features: {
      title: "Ключевые услуги автоматизации",
      subtitle: "Бизнес-подход без лишней сложности и шума.",
      items: [
        {
          title: "AI-агенты для бизнеса",
          text: "Лиды, поддержка, базы знаний, квалификация, передача человеку.",
        },
        {
          title: "CRM и продажи",
          text: "Лид → квалификация → сделка, фоллоу-апы, отчеты.",
        },
        {
          title: "HR и рекрутинг",
          text: "Сбор резюме, AI-скрининг, уведомления, ATS/CRM.",
        },
        {
          title: "Контент и соцсети",
          text: "Планирование, генерация, публикация и аналитика.",
        },
      ],
    },
    builder: {
      eyebrow: "Как работает автоматизация",
      title: "Данные → Логика → Действие → Результат.",
      text: "Подключаем данные, применяем правила и запускаем действия в нужных системах.",
      cta: "Забронировать стратегический звонок",
    },
    steps: [
      {
        title: "Аудит",
        text: "Определяем цели, данные и точки роста.",
      },
      {
        title: "Сборка",
        text: "Проектируем, внедряем и тестируем решение.",
      },
      {
        title: "Масштаб",
        text: "Оптимизируем и расширяем систему.",
      },
    ],
    templates: {
      title: "Сценарии, которые запускаем",
      subtitle: "От лидогенерации до внутренней автоматизации.",
      items: [
        "AI-агент продаж → CRM → фоллоу-апы",
        "AI-агент поддержки по вашей базе знаний",
        "HR скрининг → шорт-лист → уведомления",
        "Контент-пайплайн: план → публикация → отчет",
        "Автоматизация внутренних задач и алерты",
        "Отчеты и дашборды для руководства",
      ],
    },
    ops: {
      eyebrow: "Внутренние процессы",
      title: "Автоматизируйте бэк-офис.",
      text: "Задачи, пайплайны данных, отчеты и уведомления.",
      bullets: ["Задачи и контроль", "Данные и аналитика", "Отчеты и алерты"],
    },
    pricing: {
      title: "Гибкое ценообразование по регионам",
      subtitle: "Начните с Pilot/MVP и масштабируйтесь.",
      tiers: [
        { name: "Starter", price: "от 120 000 ₽", text: "Один процесс за 7–10 дней." },
        { name: "Business", price: "от 250 000 ₽", text: "2–3 процесса + CRM/AI." },
        { name: "Pro", price: "от 500 000 ₽", text: "Многоэтапная автоматизация." },
      ],
    },
    pricingModels: {
      title: "Гибкие форматы сотрудничества",
      intro:
        "Мы подбираем формат работы под ваш бизнес, бюджет и регион. Вы платите только за то, что действительно нужно.",
      items: [
        {
          title: "Почасовая работа",
          text: "Для небольших задач и консультаций, когда объём понятен.",
        },
        {
          title: "Дневной формат",
          text: "Для быстрых правок и срочных задач с фокусом на результат.",
        },
        {
          title: "Проект под ключ",
          text: "Чёткая цель и фиксированный результат. Подходит для AI-агентов и CRM.",
        },
        {
          title: "Ежемесячное сопровождение",
          text: "Постоянные улучшения, поддержка и развитие с регулярными звонками.",
        },
        {
          title: "Контракт / выделенный специалист",
          text: "Работаем как часть вашей команды над стратегией и масштабированием.",
        },
      ],
      note: "Мы не продаём часы — мы берём ответственность за результат.",
    },
    regionalPricing: {
      title: "Стоимость зависит от региона",
      items: [
        "Россия — цены в ₽, быстрый запуск, Telegram-first",
        "США / Великобритания — фокус на ROI и масштабирование",
        "ОАЭ — гибкие условия и партнёрский подход",
        "Другие страны — индивидуальное предложение",
      ],
      note: "Регион влияет на формат, но не на качество.",
    },
    audienceSplit: {
      title: "Для частных специалистов и компаний",
      individuals: {
        title: "Частные специалисты / фрилансеры",
        bullets: [
          "Небольшие задачи",
          "Почасовой / проектный формат",
          "Минимальный риск",
          "Быстрый старт",
        ],
      },
      companies: {
        title: "Компании",
        bullets: [
          "Проекты под ключ",
          "Ежемесячное сопровождение",
          "Масштабирование",
          "Выделенный специалист",
        ],
      },
      cta: "Мы всегда начинаем с малого и масштабируемся только если это выгодно.",
    },
    mvp: {
      title: "Пилотный запуск / MVP",
      text:
        "Для стартапов и тестирования гипотез. Ограниченный сценарий, короткий срок, возможность масштабирования.",
      note: "Мы не делаем дешёвые решения — мы уменьшаем объём работ.",
    },
    meetings: {
      title: "Выделенный специалист и звонки с командой",
      text:
        "Регулярные встречи, приоритетная поддержка, постоянные улучшения и работа как внутренний сотрудник.",
      options: ["Ежемесячные звонки", "Еженедельные стратегии", "Fractional automation lead"],
    },
    booking: {
      title: "Связаться с нами",
      text: "Выберите удобный формат — мы ответим быстро.",
      buttons: ["Забронировать звонок", "Получить бесплатный аудит", "Написать в Telegram"],
    },
    founderTeam: {
      title: "Основатель и команда",
      founderName: "Henok Tariku Yadeta",
      founderTitle:
        "Founder & AI Automation Expert\nData Analyst (Junior → Professional Growth Path)",
      founderBio:
        "Основатель с сильным бэкграундом в компьютерных науках, AI‑автоматизации и анализе данных. Опыт создания интеллектуальных процессов, AI‑агентов и data‑driven систем для бизнес‑операций. Практический опыт через академические достижения, международные хакатоны и индустриальные сертификации.",
      highlightsTitle: "Ключевые факты",
      highlights: [
        "AI‑автоматизация и дизайн процессов",
        "Аналитика данных и BI",
        "AI‑агенты и CRM‑автоматизация",
        "Участник Microsoft AI Hackathon",
        "Oracle Cloud AI Certified",
        "Сильный академический бэкграунд в Computer Science",
      ],
      certificationsTitle: "Сертификации",
      certifications: [
        "Microsoft AI / Data certifications",
        "Oracle Cloud Infrastructure – AI Foundations",
        "Oracle Data Science & Generative AI certifications",
      ],
      certificationsSection: {
        title: "Certifications",
        items: [
          {
            name: "Microsoft Certified: Power BI Data Analyst Associate",
            provider: "Microsoft",
            issued: "Dec 2025",
            expires: "Dec 2026",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          },
          {
            name: "Microsoft Certified: Azure Data Fundamentals",
            provider: "Microsoft",
            issued: "Jun 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
            provider: "Oracle",
            issued: "Nov 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
            provider: "Oracle",
            issued: "Oct 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
            provider: "Oracle",
            issued: "Oct 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
        ],
        focusAreas: "Focus areas: AI automation, data analysis, BI, cloud AI, and GenAI.",
      },
      linkedinCta: "Открыть профиль LinkedIn",
      teamTitle: "Наша команда",
      teamDescription:
        "Мы небольшая сфокусированная команда инженеров по автоматизации, аналитиков данных и AI‑специалистов. Совмещаем техническую глубину и бизнес‑понимание для практичных решений.",
      roles: [
        "Инженер AI‑автоматизации",
        "Аналитик данных",
        "Специалист по интеграциям",
        "UI / Automation Designer",
      ],
      scaleNote: "Размер команды масштабируется под задачи проекта.",
      ctaTitle: "Хотите работать напрямую с основателем и командой?",
      ctaButtons: ["Забронировать звонок", "Связаться"],
    },
    cta: {
      eyebrow: "Готовы начать",
      title: "Готовы заменить ручную работу?",
      text: "Запишитесь на звонок или запросите бесплатный аудит.",
      primary: "Забронировать стратегический звонок",
      secondary: "Получить бесплатный аудит",
    },
    contact: {
      eyebrow: "Контакты",
      title: "Построим вашу карту автоматизации.",
      subtitle: "Опишите цели и инструменты — предложим лучший старт.",
      benefits: [
        "Ответ в течение 24 часов",
        "Глобальная и региональная доставка",
        "Безопасность и надежность",
      ],
      name: "Имя",
      email: "Email",
      company: "Компания",
      role: "Роль",
      focus: "Фокус проекта",
      timeline: "Сроки",
      subject: "Тема",
      message: "Сообщение",
      focusOptions: [
        "Выберите фокус",
        "AI-агенты для продаж/поддержки",
        "CRM и продажи",
        "HR и рекрутинг",
        "Контент и соцсети",
        "Внутренние процессы и отчеты",
      ],
      timelineOptions: ["Выберите срок", "Срочно", "2-4 недели", "1-2 месяца", "Позже"],
      submit: "Отправить запрос",
      success: "Успешно отправлено.",
      error: "Что-то пошло не так.",
    },
    auth: {
      title: "Портал доступа",
      subtitle: "Создайте аккаунт для управления проектами и встречами.",
      register: "Создать аккаунт",
      signIn: "Войти",
    },
    dashboard: {
      title: "Командная панель",
      projects: "Заявки на проекты",
      appointments: "Встречи",
      emptyProjects: "Пока нет заявок.",
      emptyAppointments: "Пока нет встреч.",
    },
    footer: {
      product: "Услуги",
      company: "Компания",
      contact: "Контакты",
    },
    footerLinks: {
      careers: "Карьера",
      blog: "Блог",
      contact: "Контакты",
      security: "Безопасность",
    },
  },
  ar: {
    nav: {
      product: "الخدمات",
      features: "المزايا",
      builder: "المنهج",
      templates: "الحالات",
      pricing: "الأسعار",
      contact: "تواصل",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج",
      startFree: "ابدأ",
    },
    labels: {
      steps: "الخطوة",
      features: "الخدمات",
      templates: "حالات الاستخدام",
      pricing: "الأسعار",
    },
    forms: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      error: "حدث خطأ ما.",
    },
    hero: {
      eyebrow: "وكالة أتمتة ذكاء اصطناعي عالمية",
      title: "أتمتة. توسّع. نجاح.",
      subtitle:
        "نستبدل العمل اليدوي بأنظمة ذكية قابلة للتوسع عبر الفرق والمناطق والمنصات.",
      badge: "جاهز للمؤسسات",
      ctaPrimary: "احجز مكالمة استراتيجية",
      ctaSecondary: "تدقيق مجاني",
      stats: ["وكلاء AI + CRM", "أتمتة متعددة اللغات", "بنية آمنة وقابلة للتوسع"],
    },
    integrations: {
      title: "تكاملات بحسب المنطقة",
      highlight: "روسيا • الشرق الأوسط • عالمي",
      subtitle:
        "Telegram وVK وYandex وWhatsApp وHubSpot وSlack وواجهات API ضمن سير عمل واحد.",
      cta: "عرض جميع التكاملات",
    },
    features: {
      title: "الخدمات الأساسية للأتمتة",
      subtitle: "حلول عملية تركّز على النتائج للأقسام الأساسية في شركتك.",
      items: [
        {
          title: "وكلاء ذكاء اصطناعي للأعمال",
          text: "التعامل مع العملاء المحتملين، الدعم، المعرفة الداخلية، وتسليم للبشر.",
        },
        {
          title: "أتمتة CRM والمبيعات",
          text: "من العميل المحتمل إلى الصفقة مع متابعة تلقائية وتقارير.",
        },
        {
          title: "أتمتة الموارد البشرية",
          text: "استلام السير الذاتية، فرز بالذكاء الاصطناعي، ومزامنة ATS/CRM.",
        },
        {
          title: "أتمتة المحتوى والسوشيال",
          text: "تخطيط المحتوى، توليد بالذكاء الاصطناعي، نشر تلقائي وتحليلات.",
        },
      ],
    },
    builder: {
      eyebrow: "كيف تعمل الأتمتة",
      title: "بيانات → منطق → إجراء → نتيجة.",
      text:
        "نربط بياناتك، نطبّق قواعد العمل، وننفّذ الإجراءات عبر أدواتك الحالية.",
      cta: "احجز مكالمة استراتيجية",
    },
    steps: [
      {
        title: "تدقيق",
        text: "نحدّد الأهداف ومصادر البيانات وسير العمل.",
      },
      {
        title: "بناء",
        text: "نصمم الحل وننفّذه ونختبره وفق مؤشرات واضحة.",
      },
      {
        title: "توسّع",
        text: "نحسّن الأداء ونوسّع النظام مع نمو الأعمال.",
      },
    ],
    templates: {
      title: "حالات استخدام ننفّذها",
      subtitle: "أتمتة متكاملة تربط الواجهة الأمامية بالعمليات الداخلية.",
      items: [
        "وكيل مبيعات ذكي → CRM → متابعة",
        "وكيل دعم مدرّب على مستنداتك",
        "فرز السير الذاتية → قائمة مختصرة → إشعارات",
        "خط محتوى: خطة → نشر → تقرير",
        "أتمتة العمليات الداخلية والتنبيهات",
        "لوحات وتقارير أداء قابلة للتوسع",
      ],
    },
    ops: {
      eyebrow: "العمليات الداخلية",
      title: "أتمتة الخلفية.",
      text: "أتمتة المهام، خطوط البيانات، لوحات التقارير، والتنبيهات.",
      bullets: ["أتمتة المهام", "خطوط البيانات", "تقارير لحظية"],
    },
    pricing: {
      title: "تسعير مرن حسب المنطقة",
      subtitle: "ابدأ بـ Pilot/MVP ثم وسّع تدريجيًا مع الدعم المستمر.",
      tiers: [
        { name: "Starter", price: "from $1,000", text: "سير عمل واحد خلال 7–10 أيام." },
        { name: "Growth", price: "from $3,000", text: "2–3 سير عمل + تكامل CRM/AI." },
        { name: "Enterprise", price: "مخصص", text: "أنظمة متعددة الفرق مع حوكمة." },
      ],
    },
    pricingModels: {
      title: "نماذج تعاون مرنة",
      intro:
        "نختار النموذج الأنسب لأعمالك وميزانيتك ومنطقتك. أنت تدفع فقط لما تحتاجه فعلاً.",
      items: [
        {
          title: "بالساعة",
          text: "لمهام صغيرة واستشارات عندما يكون النطاق واضحًا.",
        },
        {
          title: "نظام يومي",
          text: "لتعديلات سريعة ومهام عاجلة مع تركيز على نتيجة واحدة.",
        },
        {
          title: "مشروع متكامل",
          text: "هدف واضح ونتيجة ثابتة. مناسب للوكلاء وCRM.",
        },
        {
          title: "دعم شهري",
          text: "تحسينات مستمرة، دعم وتطوير مع اجتماعات منتظمة.",
        },
        {
          title: "اختصاصي مخصص",
          text: "نعمل كجزء من فريقك على الاستراتيجية والتوسع.",
        },
      ],
      note: "نحن لا نبيع ساعات — نحن نتحمّل مسؤولية النتائج.",
    },
    regionalPricing: {
      title: "السعر يعتمد على المنطقة",
      items: [
        "روسيا — أسعار بالروبل، إطلاق سريع، Telegram أولاً",
        "الولايات المتحدة/المملكة المتحدة — تركيز على ROI والتوسع",
        "الإمارات — شروط مرنة ونهج شراكة",
        "دول أخرى — عرض مخصص",
      ],
      note: "المنطقة تغيّر النموذج، لا الجودة.",
    },
    audienceSplit: {
      title: "للأفراد وللشركات",
      individuals: {
        title: "الأفراد / المستقلون",
        bullets: [
          "مهام محدودة",
          "بالساعة أو مشروع",
          "مخاطر أقل",
          "بدء سريع",
        ],
      },
      companies: {
        title: "الشركات",
        bullets: [
          "مشاريع متكاملة",
          "دعم شهري",
          "توسع وتحسين",
          "اختصاصي مخصص",
        ],
      },
      cta: "نبدأ دائمًا صغيرًا ثم نوسّع فقط إذا كان ذلك مفيدًا للأعمال.",
    },
    mvp: {
      title: "إطلاق تجريبي / MVP",
      text:
        "للشركات الناشئة واختبار الفرضيات. سيناريو محدود، مدة قصيرة، وإمكانية توسّع.",
      note: "لا نقدم حلولاً رخيصة — نقلل نطاق العمل فقط.",
    },
    meetings: {
      title: "اختصاصي مخصص واجتماعات مع الفريق",
      text:
        "اجتماعات منتظمة، دعم أولوية، تحسينات مستمرة، والعمل كعضو داخلي.",
      options: ["اجتماعات شهرية", "اجتماعات استراتيجية أسبوعية", "قائد أتمتة جزئي"],
    },
    booking: {
      title: "تواصل معنا",
      text: "اختر القناة الأنسب — سنرد بسرعة.",
      buttons: ["احجز مكالمة", "تدقيق مجاني", "راسلنا عبر Telegram"],
    },
    founderTeam: {
      title: "المؤسس والفريق",
      founderName: "Henok Tariku Yadeta",
      founderTitle:
        "Founder & AI Automation Expert\nData Analyst (Junior → Professional Growth Path)",
      founderBio:
        "مؤسس بخلفية قوية في علوم الحاسب وأتمتة الذكاء الاصطناعي وتحليل البيانات. خبرة في بناء تدفقات عمل ذكية ووكلاء AI وأنظمة تعتمد على البيانات للعمليات التجارية. خبرة عملية عبر التميز الأكاديمي والهاكاثونات العالمية والشهادات الصناعية.",
      highlightsTitle: "أبرز النقاط",
      highlights: [
        "أتمتة الذكاء الاصطناعي وتصميم سير العمل",
        "تحليل البيانات وذكاء الأعمال",
        "وكلاء AI وأتمتة CRM",
        "مشارك في Microsoft AI Hackathon",
        "معتمد Oracle Cloud AI",
        "خلفية أكاديمية قوية في علوم الحاسب",
      ],
      certificationsTitle: "الشهادات",
      certifications: [
        "Microsoft AI / Data certifications",
        "Oracle Cloud Infrastructure – AI Foundations",
        "Oracle Data Science & Generative AI certifications",
      ],
      certificationsSection: {
        title: "Certifications",
        items: [
          {
            name: "Microsoft Certified: Power BI Data Analyst Associate",
            provider: "Microsoft",
            issued: "Dec 2025",
            expires: "Dec 2026",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          },
          {
            name: "Microsoft Certified: Azure Data Fundamentals",
            provider: "Microsoft",
            issued: "Jun 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
            provider: "Oracle",
            issued: "Nov 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
            provider: "Oracle",
            issued: "Oct 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
          {
            name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
            provider: "Oracle",
            issued: "Oct 2025",
            logoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
          },
        ],
        focusAreas: "Focus areas: AI automation, data analysis, BI, cloud AI, and GenAI.",
      },
      linkedinCta: "عرض ملف LinkedIn",
      teamTitle: "فريقنا",
      teamDescription:
        "نحن فريق صغير ومركّز من مهندسي الأتمتة ومحللي البيانات ومتخصصي الذكاء الاصطناعي. نجمع بين الخبرة التقنية وفهم الأعمال لتقديم حلول عملية.",
      roles: [
        "مهندس أتمتة ذكاء اصطناعي",
        "محلل بيانات",
        "اختصاصي تكامل وسير عمل",
        "مصمم UI / أتمتة",
      ],
      scaleNote: "يمكن توسيع حجم الفريق حسب متطلبات المشروع.",
      ctaTitle: "هل تريد العمل مباشرة مع المؤسس والفريق؟",
      ctaButtons: ["احجز مكالمة استراتيجية", "تواصل معنا"],
    },
    cta: {
      eyebrow: "جاهزون للبدء",
      title: "هل أنت مستعد لاستبدال العمل اليدوي؟",
      text: "احجز مكالمة استراتيجية أو اطلب تدقيقًا مجانيًا لخطة واضحة.",
      primary: "احجز مكالمة استراتيجية",
      secondary: "تدقيق مجاني",
    },
    contact: {
      eyebrow: "تواصل",
      title: "لنضع خارطة طريق الأتمتة.",
      subtitle: "أخبرنا بأهدافك وأدواتك لنقترح أفضل نقطة بدء.",
      benefits: [
        "رد خلال 24 ساعة",
        "تنفيذ عالمي وإقليمي",
        "نهج أمني موثوق",
      ],
      name: "الاسم",
      email: "البريد الإلكتروني",
      company: "الشركة",
      role: "الدور",
      focus: "تركيز المشروع",
      timeline: "الجدول الزمني",
      subject: "الموضوع",
      message: "الرسالة",
      focusOptions: [
        "اختر التركيز",
        "وكلاء AI للمبيعات/الدعم",
        "أتمتة CRM والمبيعات",
        "أتمتة الموارد البشرية",
        "أتمتة المحتوى والسوشيال",
        "سير العمل الداخلي والتقارير",
      ],
      timelineOptions: ["اختر المدة", "عاجل", "2-4 أسابيع", "1-2 شهر", "لاحقًا"],
      submit: "إرسال الطلب",
      success: "تم الإرسال بنجاح.",
      error: "حدث خطأ ما.",
    },
    auth: {
      title: "بوابة الدخول",
      subtitle: "أنشئ حسابًا لإدارة المشاريع والمواعيد.",
      register: "إنشاء حساب",
      signIn: "تسجيل الدخول",
    },
    dashboard: {
      title: "لوحة الفريق",
      projects: "طلبات المشاريع",
      appointments: "المواعيد",
      emptyProjects: "لا توجد طلبات بعد.",
      emptyAppointments: "لا توجد مواعيد بعد.",
    },
    footer: {
      product: "الخدمات",
      company: "الشركة",
      contact: "تواصل",
    },
    footerLinks: {
      careers: "الوظائف",
      blog: "المدونة",
      contact: "تواصل",
      security: "الأمان",
    },
  },
} as const;
