'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiPackage, FiShoppingCart, FiLogOut, FiClock } from 'react-icons/fi';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Inventory', path: '/inventory', icon: FiPackage },
    { 
      name: 'Orders', 
      path: '/orders', 
      icon: FiShoppingCart,
      submenu: [
        { name: 'New Order', path: '/orders' },
        { name: 'Order History', path: '/orders?tab=history', icon: FiClock }
      ]
    }
  ];

  const isActive = (path: string) => {
    // Handle query parameters
    const basePath = path.split('?')[0];
    if (basePath === '/orders' && pathname === '/orders') {
      // For orders, check if tab matches
      if (path.includes('tab=')) {
        const tabParam = path.split('tab=')[1];
        const currentParams = new URLSearchParams(window.location.search);
        return currentParams.get('tab') === tabParam;
      }
      // Default orders page (no tab or tab=new)
      const currentParams = new URLSearchParams(window.location.search);
      return !currentParams.get('tab') || currentParams.get('tab') === 'new';
    }
    return pathname === path;
  };

  const [expandedMenu, setExpandedMenu] = useState<string>('Orders');

  const toggleMenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? '' : menuName);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-900 text-white transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h1 className="font-serif text-2xl font-bold text-primary">Tomas</h1>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const hasSubmenu = 'submenu' in item && item.submenu;
            const isExpanded = expandedMenu === item.name;
            
            return (
              <div key={index}>
                {/* Main Menu Item */}
                <button
                  onClick={() => hasSubmenu ? toggleMenu(item.name) : window.location.href = item.path}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive(item.path) && !hasSubmenu
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="text-xl" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </div>
                  {!isCollapsed && hasSubmenu && (
                    <span className="text-sm">{isExpanded ? '▼' : '▶'}</span>
                  )}
                </button>

                {/* Submenu Items */}
                {!isCollapsed && hasSubmenu && isExpanded && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => {
                      const SubIcon = 'icon' in subItem ? subItem.icon : null;
                      return (
                        <button
                          key={subIndex}
                          onClick={() => {
                            window.location.href = subItem.path;
                          }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all w-full ${
                            isActive(subItem.path)
                              ? 'bg-primary text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          {SubIcon && <SubIcon className="text-base" />}
                          <span>{subItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={() => window.location.href = '/login'}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all w-fit"
          >
            <FiLogOut className="text-xl" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
