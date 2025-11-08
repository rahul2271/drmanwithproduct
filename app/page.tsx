"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Leaf,
  Heart,
  Users,
  Brain,
  Zap,
  CheckCircle,
  Award,
  Shield,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("psoriasis")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const treatmentCases = {
    psoriasis: {
      title: "Psoriasis Recovery",
      description: "Severe plaque psoriasis covering 40% of body",
      results: "85% improvement in 6 months, minimal relapse",
      timeline: "12-16 weeks for noticeable results",
      patient: "Rajesh Kumar, 45 - Delhi",
      improvement: "85%",
    },
    eczema: {
      title: "Eczema Management",
      description: "Chronic eczema with constant itching and inflammation",
      results: "95% relief from itching, complete healing in 8 months",
      timeline: "4-6 weeks for symptom relief",
      patient: "Priya Sharma, 32 - Mumbai",
      improvement: "95%",
    },
    acne: {
      title: "Acne & Scarring",
      description: "Severe cystic acne with persistent scarring",
      results: "Clear skin achieved, 70% scar reduction",
      timeline: "3-4 months for clear skin",
      patient: "Arjun Patel, 28 - Bangalore",
      improvement: "90%",
    },
  }

  const treatments = [
    {
      icon: Leaf,
      title: "Psoriasis",
      description: "Holistic treatment addressing root causes with traditional Ayurvedic herbs and therapies.",
      link: "/treatments/psoriasis",
      benefits: "Safe, Lasting, Natural",
    },
    {
      icon: Heart,
      title: "Eczema & Dermatitis",
      description: "Natural solutions to heal inflamed skin and restore skin barrier function.",
      link: "/treatments/eczema",
      benefits: "Gentle, Effective, Soothing",
    },
    {
      icon: Zap,
      title: "Acne & Pigmentation",
      description: "Targeted treatments to clear acne and balance skin tone naturally.",
      link: "/treatments/acne",
      benefits: "Proven, Gentle, Lasting",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "Ancient Wisdom",
      description: "5000+ years of Ayurvedic knowledge applied with modern understanding.",
    },
    {
      icon: Users,
      title: "Personalized Care",
      description: "Each treatment plan is customized based on your unique constitution (Dosha).",
    },
    {
      icon: Shield,
      title: "100% Natural",
      description: "All treatments use pure, organic herbs and traditional formulations.",
    },
  ]

  const credentials = [
    { label: "BAMS", description: "Bachelor of Ayurvedic Medicine & Surgery", icon: Award },
    { label: "MD Ayurveda", description: "Master's Degree in Ayurvedic Dermatology", icon: BookOpen },
    { label: "7+ Years", description: "Clinical Practice & Research Experience", icon: TrendingUp },
    { label: "500+ Patients", description: "Successfully Treated Cases", icon: Users },
  ]

  const treatmentSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Comprehensive assessment of skin condition, medical history, and Dosha analysis",
      icon: MessageCircle,
    },
    {
      step: 2,
      title: "Ayurvedic Diagnosis",
      description: "Traditional pulse reading (Nadi Pariksha) and detailed constitution evaluation",
      icon: Brain,
    },
    {
      step: 3,
      title: "Personalized Treatment Plan",
      description: "Customized herbal medicines, therapies, and lifestyle modifications",
      icon: BookOpen,
    },
    {
      step: 4,
      title: "Regular Monitoring",
      description: "Bi-weekly progress reviews and treatment adjustments as needed",
      icon: CheckCircle,
    },
  ]

  const successMetrics = [
    { metric: "95%", label: "Patient Satisfaction Rate", icon: Heart },
    { metric: "6-12 months", label: "Average Treatment Duration", icon: TrendingUp },
    { metric: "500+", label: "Cases Successfully Managed", icon: Users },
    { metric: "90%", label: "Without Recurrence (1-year follow-up)", icon: Shield },
  ]

  const faqs = [
    {
      q: "How long does Ayurvedic treatment take?",
      a: "Treatment duration varies from 6-12 months depending on the severity of the condition and individual constitution. Most patients see noticeable improvements within 4-6 weeks.",
    },
    {
      q: "Are the treatments completely natural?",
      a: "Yes, all treatments use pure, organic herbs, oils, and traditional formulations. No synthetic chemicals or steroids are used.",
    },
    {
      q: "Will the skin condition relapse after treatment?",
      a: "With proper lifestyle modifications and periodic maintenance therapy, relapse rates are minimal. Our 1-year follow-up success rate is 90%.",
    },
    {
      q: "What is included in the initial consultation?",
      a: "The consultation includes detailed skin assessment, medical history review, Dosha analysis, and a personalized treatment plan tailored to your needs.",
    },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Advanced Parallax */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float-bounce"></div>
          <div
            className="absolute bottom-20 left-5 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 hover-scale">
                <Sparkles size={16} className="animate-pulse-subtle" />
                <span className="text-sm font-semibold">BAMS MD | 7+ Years Experience</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
                Heal Your Skin Naturally
              </h1>

              <p className="text-xl text-muted-foreground mb-4 leading-relaxed text-pretty">
                Transform your skin health with evidence-based Ayurvedic expertise. Specializing in psoriasis, eczema,
                acne, and chronic skin conditions through holistic, natural remedies.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground animate-slide-in-left stagger-1">
                  <CheckCircle size={20} className="text-accent flex-shrink-0" />
                  <span className="font-medium">500+ successfully treated patients</span>
                </li>
                <li className="flex items-center gap-3 text-foreground animate-slide-in-left stagger-2">
                  <CheckCircle size={20} className="text-accent flex-shrink-0" />
                  <span className="font-medium">95% patient satisfaction rate</span>
                </li>
                <li className="flex items-center gap-3 text-foreground animate-slide-in-left stagger-3">
                  <CheckCircle size={20} className="text-accent flex-shrink-0" />
                  <span className="font-medium">Personalized Dosha-based treatment</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground hover-scale shadow-lg"
                >
                  <Link href="/contact" className="font-semibold">
                    Book Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="hover-scale bg-transparent">
                  <Link href="/ai-consultation" className="flex items-center gap-2 font-semibold">
                    Try AI Consultation <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div className="text-center hover-scale">
                  <p className="text-3xl font-bold text-primary">7+</p>
                  <p className="text-sm text-muted-foreground font-medium">Years</p>
                </div>
                <div className="text-center hover-scale">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground font-medium">Patients</p>
                </div>
                <div className="text-center hover-scale">
                  <p className="text-3xl font-bold text-primary">95%</p>
                  <p className="text-sm text-muted-foreground font-medium">Success</p>
                </div>
              </div>
            </div>

            <div
              className="relative h-96 md:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-zoom-in"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <Image
                src="/ayurvedic-doctor-consultation-patient-healing.jpg"
                alt="Dr. Manpreet treating patient"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section with Counter Animation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-accent/5 border-y border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 animate-fade-in-up">Our Track Record</h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
              Proven results with real patient outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300 group animate-fade-in-up hover-scale"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 rounded-xl transition-all duration-300"></div>
                  <div className="relative">
                    <Icon className="w-6 h-6 text-accent mb-3" />
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{item.metric}</p>
                    <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Credentials & Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Dr. Manpreet Singh's Credentials
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
              Expert qualifications and certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred, idx) => {
              const Icon = cred.icon
              return (
                <Card
                  key={idx}
                  className="p-6 border-2 border-accent/20 hover:border-accent hover:shadow-xl transition-all duration-300 group animate-fade-in-up hover-scale"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-bold text-lg text-foreground mb-2">{cred.label}</p>
                  <p className="text-sm text-muted-foreground">{cred.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Treatment Approach Section with Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Our Treatment Approach
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
              A systematic, proven methodology for optimal results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

            {treatmentSteps.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="relative animate-fade-in-up hover-scale"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="bg-card border-2 border-border hover:border-accent rounded-xl p-6 h-full transition-all duration-300 group relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg group-hover:shadow-lg group-hover:scale-110 transition-all">
                        {item.step}
                      </div>
                      <Icon className="w-5 h-5 text-accent group-hover:rotate-12 transition-transform" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Case Studies / Results Section with Advanced Tabs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Real Patient Results
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
              Proven outcomes with detailed case studies
            </p>
          </div>

          <div className="flex gap-3 mb-8 justify-center flex-wrap">
            {Object.entries(treatmentCases).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-scale ${
                  activeTab === key
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105"
                    : "bg-card border-2 border-border text-foreground hover:border-accent hover:shadow-md"
                }`}
              >
                {value.title}
              </button>
            ))}
          </div>

          {activeTab && (
            <div className="animate-fade-in-up bg-gradient-to-br from-card to-accent/5 border-2 border-accent/30 rounded-2xl p-8 md:p-12 shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="animate-slide-in-left">
                  <p className="text-sm text-accent font-semibold mb-2 flex items-center gap-2">
                    <Sparkles size={16} /> CASE STUDY
                  </p>
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    {treatmentCases[activeTab as keyof typeof treatmentCases].title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {treatmentCases[activeTab as keyof typeof treatmentCases].description}
                  </p>

                  <div className="space-y-5">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors">
                      <p className="text-sm font-semibold text-foreground">Results Achieved</p>
                      <p className="text-2xl text-accent font-bold mt-1">
                        {treatmentCases[activeTab as keyof typeof treatmentCases].results}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 hover:border-accent/40 transition-colors">
                      <p className="text-sm font-semibold text-foreground">Treatment Timeline</p>
                      <p className="text-2xl text-primary font-bold mt-1">
                        {treatmentCases[activeTab as keyof typeof treatmentCases].timeline}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                      <p className="text-sm font-semibold text-foreground">Patient Testimonial</p>
                      <p className="text-foreground mt-1 font-medium">
                        {treatmentCases[activeTab as keyof typeof treatmentCases].patient}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden h-80 animate-slide-in-right group">
                  <Image
                    src={`/skin-treatment-result-before-after-.jpg?height=400&width=400`}
                    alt="Treatment results"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent group-hover:from-primary/60 transition-all duration-300"></div>
                  <div className="absolute bottom-4 right-4 bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-bold">
                    {treatmentCases[activeTab as keyof typeof treatmentCases].improvement} Improvement
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Specializations Section with Hover Effects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/5 to-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Our Specializations
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
              Expert treatment for chronic skin conditions using proven Ayurvedic methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((treatment, idx) => {
              const Icon = treatment.icon
              return (
                <Link href={treatment.link} key={idx}>
                  <Card
                    className="p-8 hover:shadow-2xl hover:border-accent transition-all duration-300 cursor-pointer h-full bg-card border-2 border-border group animate-fade-in-up hover-scale relative overflow-hidden"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 group-hover:from-primary/10 to-accent/0 group-hover:to-accent/10 transition-all duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {treatment.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground transition-colors">
                        {treatment.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-accent">{treatment.benefits}</span>
                        <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Why Choose Dr. Manpreet?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Combining ancient wisdom with modern healthcare understanding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="text-center animate-fade-in-up group hover-scale"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-10 h-10 text-accent group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ / Patient Questions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
              Get answers to common patient questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <details
                key={idx}
                className="bg-card border-2 border-border rounded-xl p-6 hover:border-accent transition-all duration-300 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <summary className="font-semibold text-foreground cursor-pointer flex justify-between items-center group-hover:text-primary transition-colors">
                  {item.q}
                  <span className="text-primary text-2xl group-hover:rotate-90 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground mt-4 leading-relaxed group-hover:text-foreground transition-colors">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Animated Background */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-5 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float-bounce"></div>
          <div
            className="absolute bottom-5 right-10 w-52 h-52 bg-white rounded-full blur-3xl animate-float-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up text-balance">
            Ready to Transform Your Skin Health?
          </h2>
          <p className="text-lg mb-8 opacity-90 animate-fade-in-up stagger-1">
            Start with our AI-powered consultation for instant guidance, or book a direct appointment with Dr. Manpreet
            for personalized treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
            <Button size="lg" variant="secondary" asChild className="font-semibold hover-scale">
              <Link href="/ai-consultation">Try AI Consultation</Link>
            </Button>
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold hover-scale"
              asChild
            >
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
