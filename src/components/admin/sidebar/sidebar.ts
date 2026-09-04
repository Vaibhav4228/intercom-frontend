import {
  Users,
  Contact,
  History,
  Eye,
  BarChart3,
  Blocks,
  BookOpen,
  MessageCircle,
  Bot
} from "lucide-react";

export const navigationItems = [
   
  {
    name: "Agents",
    href: "/admin/agents",
    icon: Users,
    badge: "4",
  },
  {
    name: "Leads",
    href: "/admin/leads",
    icon: Contact,
  },
  {
    name: "Sessions",
    href: "/admin/sessions",
    icon: History,
    badge: "Live",
  },
  {
    name: "Chat",
    href: "/admin/chats",
    icon: MessageCircle,
  },

  
  {
    name: "Test Agent",
    href: "/admin/test-agents",
    icon: Bot,
  },
  
  {
    name: "Knowledge Base",
    href: "/admin/knowledgebases",
    icon: BookOpen,
  },
];