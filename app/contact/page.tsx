"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitted(true)
    setLoading(false)

    setTimeout(() => {
      setSubmitted(false)
      ;(e.target as HTMLFormElement).reset()
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book your consultation or send us a message. We're here to help you start your healing journey.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 border border-border bg-card text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">+91 (XXX) XXX-XXXX</p>
              <p className="text-xs text-muted-foreground mt-1">Available Mon-Sat, 10 AM - 6 PM</p>
            </Card>

            <Card className="p-6 border border-border bg-card text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">contact@drmanpreetayurveda.com</p>
              <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
            </Card>

            <Card className="p-6 border border-border bg-card text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">New Delhi, India</p>
              <p className="text-xs text-muted-foreground mt-1">Direct & online consultations</p>
            </Card>

            <Card className="p-6 border border-border bg-card text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Hours</h3>
              <p className="text-sm text-muted-foreground">Mon-Sat: 10 AM - 6 PM</p>
              <p className="text-xs text-muted-foreground mt-1">Sunday: By appointment</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("contact")}
              className={`pb-3 px-4 font-semibold transition-colors ${
                activeTab === "contact"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="w-5 h-5 inline mr-2" />
              Send Message
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`pb-3 px-4 font-semibold transition-colors ${
                activeTab === "booking"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clock className="w-5 h-5 inline mr-2" />
              Book Appointment
            </button>
          </div>

          <div className="max-w-2xl">
            {/* Contact Form */}
            {activeTab === "contact" && (
              <Card className="p-8 border border-border bg-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="psoriasis">Psoriasis Treatment</option>
                      <option value="eczema">Eczema Treatment</option>
                      <option value="acne">Acne Treatment</option>
                      <option value="other">Other Skin Condition</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us about your skin concern..."
                    />
                  </div>

                  {submitted && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-700 rounded-lg text-sm">
                      Thank you for your message! We'll get back to you within 24 hours.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Card>
            )}

            {/* Booking Form */}
            {activeTab === "booking" && (
              <Card className="p-8 border border-border bg-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Book an Appointment</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Skin Condition *</label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select condition</option>
                      <option value="psoriasis">Psoriasis</option>
                      <option value="eczema">Eczema & Dermatitis</option>
                      <option value="acne">Acne & Pigmentation</option>
                      <option value="vitiligo">Vitiligo</option>
                      <option value="urticaria">Urticaria & Allergies</option>
                      <option value="alopecia">Hair Loss & Alopecia</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Preferred Time *</label>
                      <select
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select time slot</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="10:30">10:30 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="02:00">2:00 PM</option>
                        <option value="02:30">2:30 PM</option>
                        <option value="03:00">3:00 PM</option>
                        <option value="03:30">3:30 PM</option>
                        <option value="04:00">4:00 PM</option>
                        <option value="04:30">4:30 PM</option>
                        <option value="05:00">5:00 PM</option>
                        <option value="05:30">5:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Consultation Type *</label>
                    <div className="space-y-2">
                      {[
                        { id: "in-person", label: "In-Person Consultation", desc: "Direct consultation at clinic" },
                        { id: "online", label: "Online Consultation", desc: "Via video call" },
                      ].map((type) => (
                        <label
                          key={type.id}
                          className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
                        >
                          <input type="radio" name="type" value={type.id} required className="w-4 h-4" />
                          <div className="ml-3">
                            <span className="font-medium text-foreground">{type.label}</span>
                            <p className="text-sm text-muted-foreground">{type.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Any additional information about your condition..."
                    />
                  </div>

                  {submitted && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-700 rounded-lg text-sm">
                      Appointment request submitted! We'll confirm your booking within 2 hours.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Book Appointment"
                    )}
                  </Button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Common questions about appointments and consultations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "How long is the first consultation?",
                a: "The initial consultation typically takes 45-60 minutes. Dr. Manpreet will conduct a thorough assessment of your condition and constitution before recommending a treatment plan.",
              },
              {
                q: "What's the consultation fee?",
                a: "Initial consultation fee is ₹500. Online consultations are available at the same rate. Subsequent follow-up sessions are ₹300.",
              },
              {
                q: "How do I prepare for my consultation?",
                a: "Wear comfortable, loose clothing that allows easy skin examination. Avoid using any new skincare products 2-3 days before. Bring any medical reports or previous treatment history.",
              },
              {
                q: "Can I reschedule my appointment?",
                a: "Yes, appointments can be rescheduled up to 24 hours in advance. Contact us via phone or email to reschedule.",
              },
              {
                q: "Do you offer follow-up consultations?",
                a: "Yes, follow-up consultations are essential for treatment monitoring. They're typically scheduled at 2-4 week intervals depending on your condition.",
              },
              {
                q: "How is online consultation conducted?",
                a: "Online consultations are done via secure video call. After booking, you'll receive a video link and Dr. Manpreet will connect with you at your scheduled time.",
              },
            ].map((faq, idx) => (
              <Card key={idx} className="p-6 border border-border bg-card">
                <h3 className="font-bold text-foreground mb-3">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
