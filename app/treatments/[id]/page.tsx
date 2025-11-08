"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Clock, TrendingUp, Leaf, Shield } from "lucide-react"

export default function TreatmentDetailPage() {
  const params = useParams()
  const treatmentId = params.id as string

  // Treatment data (would typically come from a database)
  const treatmentData: Record<string, any> = {
    psoriasis: {
      title: "Psoriasis",
      subtitle: "Chronic Autoimmune Skin Condition",
      fullDescription:
        "Psoriasis is a chronic autoimmune condition causing red, itchy, and scaly patches on the skin. Our holistic Ayurvedic approach targets the root cause by balancing the Vata and Pitta doshas, reducing inflammation, and strengthening the immune system.",
      image: "/psoriasis-treatment.jpg",
      symptoms: [
        "Red, inflamed patches covered with silvery scales",
        "Itching and burning sensations",
        "Dry, cracked skin that may bleed",
        "Nail psoriasis (thickened, discolored nails)",
        "Joint pain and swelling",
      ],
      duration: "3-6 months for noticeable improvement",
      successRate: "92% improvement rate",
      treatments: [
        "Herbal oil massages (Abhyanga) with medicated oils",
        "Panchakarma detoxification therapies",
        "Internal herbal medications and decoctions",
        "Dietary modifications and lifestyle changes",
        "Stress management and meditation practices",
      ],
      causes: [
        "Genetic predisposition",
        "Immune system dysfunction",
        "Stress and emotional imbalance",
        "Poor diet and lifestyle habits",
        "Environmental triggers",
      ],
    },
    eczema: {
      title: "Eczema & Dermatitis",
      subtitle: "Inflammatory Skin Condition",
      fullDescription:
        "Eczema is an inflammatory condition causing intense itching, redness, and skin barrier dysfunction. Our Ayurvedic treatment focuses on cooling Pitta imbalance, healing the skin, and preventing recurrence through natural remedies.",
      image: "/eczema-treatment.jpg",
      symptoms: [
        "Intense itching (especially at night)",
        "Red, inflamed skin",
        "Small, raised bumps that leak fluid when scratched",
        "Cracked, swollen, sensitive skin",
        "Dark-colored patches on skin",
      ],
      duration: "4-8 weeks for significant relief",
      successRate: "96% symptom reduction",
      treatments: [
        "Medicated bath preparations (Takra dhara)",
        "Cooling herbal pastes and masks",
        "Internal anti-inflammatory medications",
        "Immune system strengthening therapies",
        "Moisture-retaining natural oils",
      ],
      causes: [
        "Allergic reactions",
        "Pitta aggravation",
        "Skin barrier dysfunction",
        "Environmental irritants",
        "Stress and anxiety",
      ],
    },
    acne: {
      title: "Acne & Pigmentation",
      subtitle: "Youth & Adolescent Skin Conditions",
      fullDescription:
        "Acne and pigmentation issues affect confidence and self-esteem. Our treatment combines internal toxin elimination with external skin nourishment to clear acne and improve skin clarity and tone.",
      image: "/acne-treatment.jpg",
      symptoms: [
        "Blackheads and whiteheads",
        "Inflammatory papules and pustules",
        "Cystic acne formations",
        "Uneven skin tone and hyperpigmentation",
        "Post-acne scarring",
      ],
      duration: "2-4 months for clear skin",
      successRate: "89% acne clearance",
      treatments: [
        "Internal blood purifying treatments",
        "Targeted facial therapies",
        "Herbal face packs and applications",
        "Hormone-balancing medications",
        "Nutritional supplementation",
      ],
      causes: [
        "Hormonal imbalance",
        "Bacterial growth",
        "Excess sebum production",
        "Poor digestion",
        "Skin pore blockage",
      ],
    },
    vitiligo: {
      title: "Vitiligo",
      subtitle: "Pigmentation Loss Disorder",
      fullDescription:
        "Vitiligo is an autoimmune condition causing loss of skin pigmentation. Our comprehensive Ayurvedic approach aims to arrest pigment loss, strengthen immunity, and promote repigmentation naturally.",
      image: "/vitiligo-treatment.jpg",
      symptoms: [
        "Loss of skin pigment in patches",
        "Premature whitening of hair in affected areas",
        "Loss of color inside the mouth",
        "Progressive spread of white patches",
        "Sensitivity to sun exposure",
      ],
      duration: "6-12 months for visible repigmentation",
      successRate: "78% halting progression",
      treatments: [
        "Specialized immune modulating therapies",
        "Copper-rich herbal formulations",
        "Medicated oil treatments",
        "Internal detoxification protocols",
        "Sun-protective Ayurvedic preparations",
      ],
      causes: [
        "Autoimmune dysfunction",
        "Genetic factors",
        "Oxidative stress",
        "Nutritional deficiencies",
        "Emotional trauma",
      ],
    },
    urticaria: {
      title: "Urticaria & Allergic Reactions",
      subtitle: "Allergic Skin Manifestations",
      fullDescription:
        "Urticaria and allergic skin conditions result from Pitta aggravation and immune sensitivity. Our treatment focuses on identifying allergen triggers and desensitizing the immune system naturally.",
      image: "/urticaria-treatment.jpg",
      symptoms: [
        "Raised, itchy welts on skin",
        "Burning and stinging sensations",
        "Swelling of lips, tongue, and throat",
        "Recurring hives",
        "Associated fever or joint pain",
      ],
      duration: "4-6 weeks for acute relief",
      successRate: "94% symptom resolution",
      treatments: [
        "Allergen identification and avoidance",
        "Immune system desensitization therapies",
        "Herbal anti-allergic medications",
        "Detoxification to clear toxins",
        "Preventive maintenance protocols",
      ],
      causes: [
        "Allergic reactions",
        "Immune sensitivity",
        "Food triggers",
        "Environmental allergens",
        "Stress-induced reactions",
      ],
    },
    alopecia: {
      title: "Hair Loss & Alopecia",
      subtitle: "Hair Growth & Scalp Health",
      fullDescription:
        "Hair loss affects confidence and self-image. Our Ayurvedic treatments address hair root weakness, scalp health, and internal nutritional imbalances to promote natural regrowth.",
      image: "/alopecia-treatment.jpg",
      symptoms: [
        "Excessive hair shedding",
        "Thinning hair and bald patches",
        "Weak, brittle hair",
        "Dry, itchy scalp",
        "Premature greying",
      ],
      duration: "3-6 months for visible regrowth",
      successRate: "87% hair regrowth",
      treatments: [
        "Scalp massage with medicated oils",
        "Herbal hair masks and treatments",
        "Internal hair-strengthening medicines",
        "Nutritional supplementation",
        "Stress reduction therapies",
      ],
      causes: [
        "Nutritional deficiencies",
        "Hormonal imbalance",
        "Scalp inflammation",
        "Stress and anxiety",
        "Vata aggravation",
      ],
    },
  }

  const treatment = treatmentData[treatmentId]

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Treatment not found</h1>
          <Button asChild>
            <Link href="/treatments">Back to Treatments</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <Link href="/treatments" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={20} />
            Back to Treatments
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{treatment.title}</h1>
          <p className="text-xl text-primary font-semibold">{treatment.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={treatment.image || "/placeholder.svg"}
                  alt={treatment.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4">Understanding {treatment.title}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{treatment.fullDescription}</p>

              {/* Symptoms */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">Common Symptoms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {treatment.symptoms.map((symptom: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Causes */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">Root Causes (Ayurvedic Perspective)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {treatment.causes.map((cause: string, idx: number) => (
                    <Card key={idx} className="p-4 border border-border bg-card">
                      <p className="text-foreground font-medium flex items-start gap-2">
                        <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {cause}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Our Treatment Approach */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Ayurvedic Treatment Approach</h3>
                <div className="space-y-4">
                  {treatment.treatments.map((treat: string, idx: number) => (
                    <Card key={idx} className="p-4 border border-border bg-primary/5">
                      <p className="text-foreground font-medium flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {treat}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-8 border border-border bg-card sticky top-24 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-6">Treatment Overview</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-muted-foreground">SUCCESS RATE</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{treatment.successRate}</p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-muted-foreground">TREATMENT DURATION</span>
                    </div>
                    <p className="text-foreground font-semibold">{treatment.duration}</p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-muted-foreground">APPROACH</span>
                    </div>
                    <p className="text-foreground font-semibold">100% Natural & Holistic</p>
                  </div>

                  <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/contact">Book Consultation</Link>
                  </Button>

                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/ai-consultation">Try AI Consultation</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ayurveda */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Ayurvedic Treatment?</h2>
            <p className="text-lg text-muted-foreground">Benefits of our holistic approach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Root Cause Treatment",
                description: "We address the underlying imbalance, not just surface symptoms",
              },
              {
                title: "No Side Effects",
                description: "100% natural herbs with no synthetic chemicals or steroids",
              },
              {
                title: "Long-Term Results",
                description: "Prevents recurrence through constitutional healing",
              },
              {
                title: "Personalized Care",
                description: "Treatment customized to your unique Dosha constitution",
              },
              {
                title: "Holistic Wellness",
                description: "Improves overall health, not just skin condition",
              },
              {
                title: "Proven Track Record",
                description: "Thousands of successful cases with lasting results",
              },
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 border border-border bg-card text-center">
                <h3 className="text-lg font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Treatment?</h2>
          <p className="text-lg mb-8 opacity-90">
            Schedule a consultation with Dr. Manpreet to begin your journey to clear, healthy skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link href="/contact">Book Now</Link>
            </Button>
            <Button
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/ai-consultation">Try AI Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
