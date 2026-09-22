export interface AdminSidebarProps {
  open: boolean;
  onToggle: () => void;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export interface AdminHeaderProps {
  onOpenMobileDrawer: () => void;
  title?: string;
  subtitle?: string;
}
