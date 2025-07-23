'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Code, 
  BookOpen, 
  Trophy, 
  Play, 
  MessageSquare,
  X,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  open: boolean
  onClose: () => void
  className?: string
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: Omit<NavItem, 'children'>[]
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Problems',
    href: '/problems',
    icon: Code,
    children: [
      { title: 'All Problems', href: '/problems', icon: Code },
      { title: 'Easy', href: '/problems/difficulty/easy', icon: Code },
      { title: 'Medium', href: '/problems/difficulty/medium', icon: Code },
      { title: 'Hard', href: '/problems/difficulty/hard', icon: Code },
      { title: 'My Submissions', href: '/problems/submissions', icon: Code },
    ]
  },
  {
    title: 'Study Plans',
    href: '/study-plans',
    icon: BookOpen,
    children: [
      { title: 'All Plans', href: '/study-plans', icon: BookOpen },
      { title: 'Algorithms', href: '/study-plans/algorithms', icon: BookOpen },
      { title: 'Data Structures', href: '/study-plans/data-structures', icon: BookOpen },
      { title: 'System Design', href: '/study-plans/system-design', icon: BookOpen },
      { title: 'My Progress', href: '/study-plans/progress', icon: BookOpen },
    ]
  },
  {
    title: 'Contests',
    href: '/contests',
    icon: Trophy,
    badge: 'New',
    children: [
      { title: 'Active Contests', href: '/contests', icon: Trophy },
      { title: 'Past Contests', href: '/contests/past', icon: Trophy },
      { title: 'Leaderboard', href: '/contests/leaderboard', icon: Trophy },
      { title: 'My Results', href: '/contests/results', icon: Trophy },
    ]
  },
  {
    title: 'Playground',
    href: '/playground',
    icon: Play,
  },
  {
    title: 'Discuss',
    href: '/discuss',
    icon: MessageSquare,
    children: [
      { title: 'All Discussions', href: '/discuss', icon: MessageSquare },
      { title: 'Problem Solutions', href: '/discuss/solutions', icon: MessageSquare },
      { title: 'Study Groups', href: '/discuss/groups', icon: MessageSquare },
      { title: 'My Posts', href: '/discuss/my-posts', icon: MessageSquare },
    ]
  },
]

export function Sidebar({ open, onClose, className }: SidebarProps) {
  const pathname = usePathname()

  const NavItemComponent = ({ item, level = 0 }: { item: NavItem; level?: number }) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
    const hasChildren = item.children && item.children.length > 0

    return (
      <div>
        <Link href={item.href}>
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start h-10 px-3",
              level > 0 && "ml-4",
              isActive && "bg-secondary text-secondary-foreground"
            )}
            onClick={() => {
              if (hasChildren) {
                setIsExpanded(!isExpanded)
              }
            }}
          >
            <item.icon className="mr-3 h-4 w-4" />
            <span className="flex-1 text-left">{item.title}</span>
            {item.badge && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronRight 
                className={cn(
                  "ml-auto h-4 w-4 transition-transform",
                  isExpanded && "rotate-90"
                )} 
              />
            )}
          </Button>
        </Link>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child, index) => (
              <NavItemComponent key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className={cn("flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Navigation</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item, index) => (
          <NavItemComponent key={index} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <p>NeuroCode v1.0.0</p>
          <p>AI-Powered Learning</p>
        </div>
      </div>
    </aside>
  )
} 