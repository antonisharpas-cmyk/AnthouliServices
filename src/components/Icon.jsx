import {
  Calculator, FileCheck2, TrendingUp, BookOpen, Receipt, Users, Building2, Briefcase, Plane,
  Landmark, Scale, ClipboardCheck, UserCheck, Ship, Globe2, Check,
} from 'lucide-react'

const MAP = {
  calculator: Calculator,
  'file-check': FileCheck2,
  'trending-up': TrendingUp,
  'book-open': BookOpen,
  receipt: Receipt,
  users: Users,
  building: Building2,
  briefcase: Briefcase,
  plane: Plane,
  landmark: Landmark,
  scale: Scale,
  'clipboard-check': ClipboardCheck,
  'user-check': UserCheck,
  ship: Ship,
  globe: Globe2,
  check: Check,
}

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.75 }) {
  const Cmp = MAP[name] || Check
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
