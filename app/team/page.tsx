"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Award, Heart, MessageCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Manpreet Singh",
      role: "Founder & Lead Ayurvedic Specialist",
      specialization: "Dermatology & Chronic Skin Diseases",
      image: "/ayurvedic-doctor-consultation-patient-healing.jpg",
      bio: "Dr. Manpreet Singh is the founder and lead physician at Dr. Manpreet Ayurveda. With 7+ years of specialized experience in treating chronic skin diseases, he combines ancient Ayurvedic wisdom with modern scientific understanding.",
      qualifications: [
        "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
        "MD Ayurveda (Dermatology Specialist)",
        "Advanced Diploma in Panchakarma & Detoxification",
      ],
      expertise: [
        "Psoriasis Treatment",
        "Eczema Management",
        "Acne & Pigmentation",
        "Vitiligo Treatment",
        "Evidence-Based Ayurveda",
      ],
      patientsHelped: "500+",
      successRate: "95%",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      role: "Senior Ayurvedic Therapist",
      specialization: "Panchakarma & Detoxification",
      image: "/woman-professional.png",
      bio: "Dr. Priya brings 5 years of expertise in Panchakarma therapies and detoxification treatments. She specializes in personalized wellness plans and holistic healing approaches tailored to individual constitutions.",
      qualifications: ["BAMS", "Diploma in Panchakarma Therapies", "Certified Wellness Coach"],
      expertise: ["Panchakarma Treatment", "Detox Therapies", "Personalized Wellness Plans", "Lifestyle Counseling"],
      patientsHelped: "300+",
      successRate: "92%",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      role: "Clinical Support & Patient Care Coordinator",
      specialization: "Patient Management & Follow-ups",
      image: "/man-confident.jpg",
      bio: "Rajesh ensures every patient receives compassionate care and comprehensive support throughout their healing journey. With 6 years of experience, he manages patient records, schedules, and follow-up treatments.",
      qualifications: ["Clinical Support Certification", "Patient Care Management", "Ayurvedic Basics Certified"],
      expertise: ["Patient Coordination", "Care Management", "Treatment Follow-ups", "Patient Education"],
      patientsHelped: "600+",
      successRate: "90%",
    },
  ]

  const clinicValues = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with genuine empathy and understanding",
    },
    {
      icon: Award,
      title: "Expertise",
      description: "Combined 18+ years of dedicated Ayurvedic practice",
    },
    {
      icon: BookOpen,
      title: "Evidence-Based",
      description: "Blending ancient wisdom with modern scientific research",
    },
    {
      icon: Users,
      title: "Patient-Centric",
      description: "Your health and satisfaction is our primary goal",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/15 via-background to-accent/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Meet Our Experts</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            A Team Dedicated to Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Healing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our experienced team of Ayurvedic specialists combines decades of expertise to provide you with authentic,
            effective, and personalized treatment for skin diseases and holistic wellness.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {teamMembers.map((member, idx) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
              >
                <div className="relative mb-8 h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <Card className="p-8 border border-border bg-card hover:shadow-xl transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                    <p className="text-lg text-primary font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      {member.specialization}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">{member.bio}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-border">
                    <div>
                      <div className="text-2xl font-bold text-primary">{member.patientsHelped}</div>
                      <p className="text-xs text-muted-foreground">Patients Helped</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">{member.successRate}</div>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {selectedMember === member.id && (
                    <div className="mt-6 pt-6 border-t border-border animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="mb-6">
                        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          Qualifications
                        </h4>
                        <ul className="space-y-2">
                          {member.qualifications.map((qual, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{qual}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-accent" />
                          Areas of Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((exp, i) => (
                            <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <button className="mt-6 w-full group/btn inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-semibold transition-all duration-300">
                    {selectedMember === member.id ? "Show Less" : "View Details"}
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Our Team?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, compassion, and proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicValues.map((value, idx) => {
              const Icon = value.icon
              return (
                <Card
                  key={idx}
                  className="p-8 text-center border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Clinic Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Clinic Philosophy</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At Dr. Manpreet Ayurveda, we believe that true healing requires understanding the individual. Each
                  patient is unique, and their treatment should reflect that uniqueness.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our team works collaboratively to develop personalized treatment plans that address not just the
                  symptoms, but the root cause of imbalance. We combine traditional Ayurvedic practices with modern
                  scientific validation to ensure the most effective results.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With combined experience of 18+ years, our team has helped over 1,000+ patients transform their health
                  and regain their confidence through authentic Ayurvedic treatment.
                </p>
              </div>

              <Link href="/contact">
                <button className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300">
                  Schedule Your Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-8 text-center border border-border bg-card hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">18+</div>
                <p className="text-muted-foreground">Years Combined Experience</p>
              </Card>
              <Card className="p-8 text-center border border-border bg-card hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-accent mb-2">1000+</div>
                <p className="text-muted-foreground">Patients Healed</p>
              </Card>
              <Card className="p-8 text-center border border-border bg-card hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">93%</div>
                <p className="text-muted-foreground">Average Success Rate</p>
              </Card>
              <Card className="p-8 text-center border border-border bg-card hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <p className="text-muted-foreground">Patient Support</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 to-accent/20 border-t border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Experience Expert Ayurvedic Care?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our dedicated team is here to guide you on your journey to better skin health and overall wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2 group">
                Book Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/ai-consultation">
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300">
                Try AI Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
