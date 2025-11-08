"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Leaf, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-foreground">Dr. Manpreet Ayurveda</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Authentic Ayurvedic treatment for skin diseases and holistic wellness.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Dr. Manpreet
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-muted-foreground hover:text-primary transition-colors">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog & Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/treatments/psoriasis"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Psoriasis Treatment
                </Link>
              </li>
              <li>
                <Link href="/treatments/eczema" className="text-muted-foreground hover:text-primary transition-colors">
                  Eczema & Dermatitis
                </Link>
              </li>
              <li>
                <Link href="/treatments/acne" className="text-muted-foreground hover:text-primary transition-colors">
                  Acne & Pigmentation
                </Link>
              </li>
              <li>
                <Link href="/ai-consultation" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-primary flex-shrink-0" />
                +91 (XXX) XXX-XXXX
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-primary flex-shrink-0" />
                contact@drmanpreetayurveda.com
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Credentials */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Credentials</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ BAMS (Bachelor of Ayurvedic Medicine)</li>
                <li>✓ MD (Doctor of Medicine) - Ayurveda</li>
                <li>✓ 7+ Years Experience</li>
                <li>✓ Specialized in Skin Diseases</li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Hours</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Monday - Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: By Appointment</li>
                <li>Online Consultations: Available 24/7</li>
                <li>Emergency: Call for availability</li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">© 2025 Dr. Manpreet Ayurveda. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
