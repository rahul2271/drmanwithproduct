"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      submenu: [
        { label: "Dr. Manpreet Profile", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    },
    {
      label: "Services",
      href: "/treatments",
      submenu: [
        { label: "All Treatments", href: "/treatments" },
        { label: "Psoriasis", href: "/treatments/psoriasis" },
        { label: "Eczema & Dermatitis", href: "/treatments/eczema" },
        { label: "Acne & Pigmentation", href: "/treatments/acne" },
        { label: "Vitiligo", href: "/treatments/vitiligo" },
        { label: "Hair Loss", href: "/treatments/alopecia" },
        { label: "Ayurvedic Products", href: "/products" }, // Added products link to navigation
      ],
    },
    { label: "Blog", href: "/blogs" },
    { label: "AI Consultation", href: "/ai-consultation" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">ॐ</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">Dr. Manpreet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50 rounded-md transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </Link>

                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild className="ml-4" size="sm">
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {navItems.map((item) => (
              <div key={item.href}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 rounded-md flex items-center justify-between"
                >
                  <Link href={item.href} className="flex-1">
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${openDropdown === item.href ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {item.submenu && openDropdown === item.href && (
                  <div className="bg-secondary/30 border-l-2 border-primary">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-8 py-2 text-sm text-foreground hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-4 pt-2">
              <Button asChild className="w-full" size="sm">
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
