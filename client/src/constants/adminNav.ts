export const ADMIN_NAV_GROUPS = [
  {
    label: "General",
    items: [
      { label: "Overview", href: "/admin" },
      { label: "Analytics", href: "/admin/analytics" },
      { label: "Contact Messages", href: "/admin/messages" },
      { label: "Chat", href: "/admin/chat" },
      { label: "Activity Log", href: "/admin/activity-log" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Hero Section", href: "/admin/hero" },
      { label: "About Section", href: "/admin/about" },
      { label: "Skills", href: "/admin/skills" },
      { label: "Services", href: "/admin/services" },
      { label: "Portfolio Projects", href: "/admin/projects" },
      { label: "Blog", href: "/admin/blog" },
      { label: "Pricing Packages", href: "/admin/pricing" },
      { label: "Experience", href: "/admin/experience" },
      { label: "Education", href: "/admin/education" },
      { label: "Testimonials", href: "/admin/testimonials" },
      { label: "FAQ", href: "/admin/faqs" },
      { label: "Social Links", href: "/admin/social-links" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Theme Manager", href: "/admin/theme" },
      { label: "Website Settings", href: "/admin/settings" },
      { label: "Profile", href: "/admin/profile" },
    ],
  },
] as const;
