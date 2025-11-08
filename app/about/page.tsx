"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Leaf, Star, Shield, Heart, Zap, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const qualifications = [
    { title: "BAMS", subtitle: "Bachelor of Ayurvedic Medicine & Surgery", year: "2015", icon: BookOpen },
    { title: "MD Ayurveda", subtitle: "Doctor of Medicine - Ayurveda (Dermatology)", year: "2017", icon: Award },
    { title: "Advanced Diploma", subtitle: "Panchakarma & Detoxification Therapies", year: "2018", icon: Leaf },
    { title: "Certification", subtitle: "Specialized Training in Skin Diseases", year: "2019", icon: Shield },
  ]

  const experience = [
    { years: "7+", title: "Years of Practice", description: "Dedicated service to healing" },
    { years: "500+", title: "Patients Transformed", description: "Life-changing treatments" },
    { years: "95%", title: "Success Rate", description: "Proven results in skin health" },
    { years: "100%", title: "Natural Approach", description: "Pure organic Ayurvedic care" },
  ]

  const coreValues = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with genuine concern and empathy, understanding their journey.",
    },
    {
      icon: Leaf,
      title: "Natural Healing",
      description: "Ancient Ayurvedic wisdom combined with modern scientific understanding.",
    },
    {
      icon: Zap,
      title: "Root Cause Treatment",
      description: "We address the underlying causes, not just manage symptoms temporarily.",
    },
    {
      icon: Shield,
      title: "Holistic Wellness",
      description: "Mind, body, and spirit - we believe true healing encompasses the whole person.",
    },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      condition: "Psoriasis",
      text: "Dr. Manpreet completely changed my life. After years of struggling with psoriasis and trying countless treatments, his personalized Ayurvedic approach brought remarkable relief. I feel like myself again!",
      image: "/woman-professional.jpg",
    },
    {
      name: "Rajesh Kumar",
      condition: "Eczema & Dermatitis",
      text: "The natural approach and genuine care shown by Dr. Manpreet is unmatched. My skin condition improved significantly within 3 months. His dedication to understanding each patient is truly special.",
      image: "/man-confident.jpg",
    },
    {
      name: "Neha Patel",
      condition: "Acne & Pigmentation",
      text: "Finally found a doctor who understands the root cause! Dr. Manpreet's treatment not only cleared my acne but also improved my overall health and confidence. Absolutely fantastic results!",
      image: "/woman-happy.jpg",
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
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Our Story & Mission</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Transforming Lives Through{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Authentic Ayurveda
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Dr. Manpreet Singh believes that true healing comes from understanding your unique constitution and
              addressing the root cause of imbalance. With 7+ years of dedicated practice, he's helped 500+ patients
              reclaim their skin health and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Dr. Manpreet's Journey */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/ayurvedic-doctor-consultation-patient-healing.jpg"
                  alt="Dr. Manpreet Singh"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Dr. Manpreet Singh's Journey</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Dr. Manpreet's passion for Ayurveda began during his college years when he witnessed the
                  transformative power of natural healing. After completing his BAMS degree in 2015, he pursued
                  specialized training in dermatology, earning his MD in Ayurveda in 2017.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  What sets Dr. Manpreet apart is his commitment to evidence-based Ayurveda. He combines 5,000+ years of
                  ancient wisdom with modern scientific research, ensuring every patient receives the most effective
                  treatment possible.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, Dr. Manpreet runs a thriving practice where he's helped transform the lives of 500+ patients
                  suffering from psoriasis, eczema, acne, and other chronic skin conditions. His 95% success rate speaks
                  to his dedication and expertise.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">7+</div>
                  <p className="text-sm text-muted-foreground">Years Specializing in Skin Diseases</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-accent">500+</div>
                  <p className="text-sm text-muted-foreground">Patients Successfully Treated</p>
                </div>
              </div>

              <Link href="/team">
                <button className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300">
                  Meet the Team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every patient we treat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon
              return (
                <Card
                  key={idx}
                  className="p-8 border border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Education & Credentials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rigorous academic training combined with decades of clinical experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qualifications.map((qual, idx) => {
              const Icon = qual.icon
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-1 hover:from-primary/20 hover:to-accent/20 transition-all duration-300"
                >
                  <Card className="p-8 border border-border bg-card relative z-10 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                        <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                      </div>
                      <Badge className="ml-auto">{qual.year}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{qual.title}</h3>
                    <p className="text-muted-foreground">{qual.subtitle}</p>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Metrics */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-transparent to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">By The Numbers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                    {exp.years}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Patient Transformations</h2>
            <p className="text-lg text-muted-foreground">Real stories from real patients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="group">
                <Card className="p-8 border border-border bg-card hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1 italic">{`"${testimonial.text}"`}</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-primary">{testimonial.condition}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 to-accent/20 border-t border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Start Your Healing Journey Today</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience the transformative power of authentic Ayurvedic treatment with Dr. Manpreet and his dedicated
            team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2 group">
                Book Free Consultation
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
