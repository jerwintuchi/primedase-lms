import { LucideIcon } from 'lucide-react';
import React from 'react'; // Make sure to import React

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => {
  return (
    <div>
      {/* Render your SidebarItem content here */}
      {label} - {href}
    </div>
  );
};

export default SidebarItem; // Export the component
