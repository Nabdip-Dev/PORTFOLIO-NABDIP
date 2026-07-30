export type Language = "en" | "bn";

// Covers static UI chrome only — nav labels, section headings, common button
// text. Admin-entered content (project descriptions, blog posts, testimonials,
// bio) is NOT translated — that would require per-field translated copies in
// every collection, which is a much larger scope than a UI-language toggle.
export const translations = {
  en: {
    nav: {
      home: "Home", about: "About", skills: "Skills", services: "Services",
      portfolio: "Portfolio", blog: "Blog", experience: "Experience",
      testimonials: "Testimonials", faq: "FAQ", contact: "Contact",
    },
    sections: {
      about: { eyebrow: "About", title: "Get to know me" },
      skills: { eyebrow: "Skills", title: "Tools I build with" },
      services: { eyebrow: "Services", title: "What I can do for you" },
      pricing: { eyebrow: "Pricing", title: "Packages", description: "Pick the scope that fits your project." },
      portfolio: { eyebrow: "Portfolio", title: "Selected work" },
      experience: { eyebrow: "Experience", title: "Where I've worked" },
      education: { eyebrow: "Education", title: "Academic background" },
      testimonials: { eyebrow: "Testimonials", title: "What clients say" },
      faq: { eyebrow: "FAQ", title: "Common questions" },
      contact: { eyebrow: "Contact", title: "Let's work together", description: "Have a project in mind? Send a few details and I'll follow up." },
    },
    buttons: {
      hireMe: "Hire Me", contact: "Contact", resume: "Resume", chat: "Chat",
      sendMessage: "Send message", submitReview: "Submit review", getStarted: "Get started",
      sending: "Sending...", submitting: "Submitting...",
    },
  },
  bn: {
    nav: {
      home: "হোম", about: "সম্পর্কে", skills: "দক্ষতা", services: "সেবা",
      portfolio: "পোর্টফোলিও", blog: "ব্লগ", experience: "অভিজ্ঞতা",
      testimonials: "রিভিউ", faq: "সচরাচর প্রশ্ন", contact: "যোগাযোগ",
    },
    sections: {
      about: { eyebrow: "সম্পর্কে", title: "আমার সম্পর্কে জানুন" },
      skills: { eyebrow: "দক্ষতা", title: "যেসব টুল দিয়ে কাজ করি" },
      services: { eyebrow: "সেবা", title: "আপনার জন্য যা করতে পারি" },
      pricing: { eyebrow: "মূল্য", title: "প্যাকেজসমূহ", description: "আপনার প্রজেক্টের সাথে মানানসই প্যাকেজ বেছে নিন।" },
      portfolio: { eyebrow: "পোর্টফোলিও", title: "নির্বাচিত কাজ" },
      experience: { eyebrow: "অভিজ্ঞতা", title: "কোথায় কাজ করেছি" },
      education: { eyebrow: "শিক্ষা", title: "শিক্ষাগত যোগ্যতা" },
      testimonials: { eyebrow: "রিভিউ", title: "ক্লায়েন্টরা যা বলেন" },
      faq: { eyebrow: "সচরাচর প্রশ্ন", title: "সাধারণ প্রশ্নাবলী" },
      contact: { eyebrow: "যোগাযোগ", title: "একসাথে কাজ করি", description: "কোনো প্রজেক্ট আছে? কিছু তথ্য পাঠান, আমি যোগাযোগ করব।" },
    },
    buttons: {
      hireMe: "হায়ার করুন", contact: "যোগাযোগ", resume: "জীবনবৃত্তান্ত", chat: "চ্যাট",
      sendMessage: "মেসেজ পাঠান", submitReview: "রিভিউ জমা দিন", getStarted: "শুরু করুন",
      sending: "পাঠানো হচ্ছে...", submitting: "জমা দেওয়া হচ্ছে...",
    },
  },
} as const;

export type TranslationKey = typeof translations.en;
