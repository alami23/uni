'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Armchair, 
  FileText, 
  Users, 
  UserRound, 
  Receipt, 
  Package, 
  Tags, 
  UserSquare2, 
  History, 
  ArrowLeftRight, 
  MessageSquare, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  submenu?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'POS Wood', href: '/pos-wood', icon: ShoppingCart },
  { title: 'POS Furniture', href: '/pos-furniture', icon: Armchair },
  { title: 'Invoice', href: '/invoices', icon: FileText },
  { title: 'Customer', href: '/customers', icon: Users },
  { title: 'Customer Statement', href: '/customer-statement', icon: UserRound },
  { title: 'Bills', href: '/bills', icon: Receipt },
  { 
    title: 'Inventory', 
    icon: Package,
    submenu: [
      { title: 'Furniture', href: '/inventory/furniture' },
      { title: 'Wood', href: '/inventory/wood' },
    ]
  },
  { 
    title: 'Category', 
    icon: Tags,
    submenu: [
      { title: 'Furniture', href: '/category/furniture' },
      { title: 'Wood', href: '/category/wood' },
    ]
  },
  { title: 'Staff', href: '/staff', icon: UserSquare2 },
  { title: 'Staff Statement', href: '/staff-statement', icon: History },
  { title: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { title: 'SMS', href: '/sms', icon: MessageSquare },
  { title: 'Reports', href: '/reports', icon: BarChart3 },
  { title: 'Setting', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-card text-card-foreground">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
          A
        </div>
        <span className="font-bold text-xl tracking-tight">Aranya ERP</span>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.submenu?.some(sub => pathname === sub.href));
            const isOpen = openSubmenus.includes(item.title);

            if (item.submenu) {
              return (
                <div key={item.title} className="space-y-1">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between font-normal hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground font-medium"
                    )}
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </Button>
                  {isOpen && (
                    <div className="pl-9 space-y-1">
                      {item.submenu.map((sub) => (
                        <Link key={sub.href} href={sub.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start font-normal h-8 text-sm",
                              pathname === sub.href && "text-primary font-medium"
                            )}
                          >
                            {sub.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href!}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 font-normal hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href && "bg-accent text-accent-foreground font-medium"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
