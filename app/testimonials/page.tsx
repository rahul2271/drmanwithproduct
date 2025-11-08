"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote, Heart } from "lucide-react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 32,
      condition: "Psoriasis",
      duration: "8 years",
      text: "I suffered from severe psoriasis for 8 years, trying everything from steroids to creams. Dr. Manpreet's holistic Ayurvedic approach completely changed my life. Within 3 months, my skin cleared up significantly, and more importantly, it hasn't returned. I'm living a confident life again!",
      image: "/smiling-woman.png",
      improvement: "95% improvement",
      rating: 5,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      age: 45,
      condition: "Chronic Eczema & Dermatitis",
      duration: "12 years",
      text: "The itching was unbearable, especially at night. I tried every dermatologist in Delhi. Dr. Manpreet's natural oils and herbal treatments gave me relief like nothing else. My skin is healthy, my sleep is better, and I haven't had a flare-up in 6 months!",
      image: "/man-professional.jpg",
      improvement: "98% symptom relief",
      rating: 5,
    },
    {
      id: 3,
      name: "Neha Patel",
      age: 28,
      condition: "Acne & Pigmentation",
      duration: "5 years",
      text: "As a makeup artist, clear skin is essential for my career. Dr. Manpreet's blood-purifying treatments cleared my acne and reduced pigmentation marks beautifully. The natural approach means no side effects, and my skin glows naturally now.",
      image: "/woman-confident.jpg",
      improvement: "92% acne clearance",
      rating: 5,
    },
    {
      id: 4,
      name: "Vikram Singh",
      age: 52,
      condition: "Vitiligo",
      duration: "15 years",
      text: "I had accepted living with vitiligo patches. Dr. Manpreet's immune-balancing treatment not only stopped the progression but also brought back skin pigmentation in many areas. After 8 months, I'm seeing significant repigmentation. This is truly a miracle!",
      image: "/man-smiling.jpg",
      improvement: "73% repigmentation",
      rating: 5,
    },
    {
      id: 5,
      name: "Anjali Verma",
      age: 35,
      condition: "Urticaria & Hives",
      duration: "3 years",
      text: "Chronic hives were affecting my quality of life and causing anxiety. Dr. Manpreet identified my triggers and provided a natural desensitization protocol. I've been hive-free for 4 months now! The personalized approach made all the difference.",
      image: "/woman-happy.jpg",
      improvement: "100% symptom resolution",
      rating: 5,
    },
    {
      id: 6,
      name: "Arjun Nair",
      age: 38,
      condition: "Hair Loss & Premature Greying",
      duration: "4 years",
      text: "My hair was thinning rapidly and turning grey. After Dr. Manpreet's scalp therapies and internal medications, my hair growth improved dramatically, and new hair color is returning. I feel younger and more confident!",
      image: "/man-happy.jpg",
      improvement: "85% hair regrowth",
      rating: 5,
    },
    {
      id: 7,
      name: "Divya Gupta",
      age: 42,
      condition: "Mixed Skin Issues",
      duration: "10 years",
      text: "I had multiple skin issues - eczema, acne, and sensitivity. Dr. Manpreet created a comprehensive treatment plan addressing all of them. The holistic approach improved not just my skin but my overall health, digestion, and energy levels.",
      image: "/professional-woman.png",
      improvement: "89% overall improvement",
      rating: 5,
    },
    {
      id: 8,
      name: "Rohan Desai",
      age: 29,
      condition: "Severe Acne",
      duration: "6 years",
      text: "I tried Accutane and other strong medications without lasting results. Dr. Manpreet's natural approach cleared my acne permanently without any side effects. My skin is clear, and I haven't looked back.",
      image: "/man-confident.jpg",
      improvement: "96% acne clearance",
      rating: 5,
    },
  ]

  const stats = [
    { number: "500+", label: "Happy Patients" },
    { number: "95%", label: "Average Success Rate" },
    { number: "7+", label: "Years Experience" },
    { number: "6", label: "Skin Conditions Treated" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Patient Testimonials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real patients who transformed their skin and their lives through authentic Ayurvedic
            treatment.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-8 border border-border bg-card hover:shadow-lg transition-shadow">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <div className="flex items-start gap-3 mb-6">
                  <Quote className="w-6 h-6 text-primary/30 flex-shrink-0 mt-1" />
                  <p className="text-foreground leading-relaxed italic">{`"${testimonial.text}"`}</p>
                </div>

                {/* Patient Info */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.age} years old</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="font-semibold text-foreground">{testimonial.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold text-foreground">{testimonial.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Improvement:</span>
                      <span className="font-semibold text-accent">{testimonial.improvement}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Success Story Could Be Next</h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of patients who have found healing and confidence through Dr. Manpreet's authentic Ayurvedic
            treatments.
          </p>
          <button className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start Your Journey Today
          </button>
        </div>
      </section>
    </div>
  )
}
