export const siteConfig = {
  name: "Nexus Admin",
  description: "AI-Native Admin & Content Control Plane",
  links: {
    docs: "#",
    support: "#",
  },
  nav: [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Characters & Episodes", href: "/characters-episodes" },
    { title: "Chats", href: "/chats" },
    { title: "Episodes", href: "/episodes" },
    { title: "Story Flows", href: "/story-flows" },
    { title: "Prompts", href: "/prompts" },
    { title: "Conversations", href: "/conversations" },
    { title: "Users", href: "/users" },
    { title: "Roles", href: "/roles" },
    { title: "Permissions", href: "/permissions" },
    { title: "Genres & Tags", href: "/taxonomy" },
    { title: "CMS Pages", href: "/cms" },
    { title: "Notifications", href: "/notifications" },
    { title: "Audit Logs", href: "/audit-logs" },
    { title: "Analytics", href: "/analytics" },
    { title: "Moderation", href: "/moderation" },
    { title: "Media Library", href: "/media" },
    { title: "Settings", href: "/settings" },
  ],
};

export type SiteConfig = typeof siteConfig;
