"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, CheckCircle2, Clock, Users } from "lucide-react"

export default function TreatmentsPage() {
  const treatments = [
    {
      id: "psoriasis",
      title: "Psoriasis",
      subtitle: "Chronic Autoimmune Skin Condition",
      shortDescription: "Advanced Ayurvedic management of psoriasis addressing inflammation and immune dysfunction.",
      fullDescription:
        "Psoriasis is a chronic autoimmune condition causing red, itchy, and scaly patches on the skin. Our holistic Ayurvedic approach targets the root cause by balancing the Vata and Pitta doshas, reducing inflammation, and strengthening the immune system.",
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
      image: "/psoriasis-treatment.jpg",
    },
    {
      id: "eczema",
      title: "Eczema & Dermatitis",
      subtitle: "Inflammatory Skin Condition",
      shortDescription:
        "Natural relief from eczema and dermatitis using potent Ayurvedic herbs and traditional therapies.",
      fullDescription:
        "Eczema is an inflammatory condition causing intense itching, redness, and skin barrier dysfunction. Our Ayurvedic treatment focuses on cooling Pitta imbalance, healing the skin, and preventing recurrence through natural remedies.",
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
      image: "/eczema-treatment.jpg",
    },
    {
      id: "acne",
      title: "Acne & Pigmentation",
      subtitle: "Youth & Adolescent Skin Conditions",
      shortDescription: "Clear acne and restore natural skin tone with targeted Ayurvedic treatments.",
      fullDescription:
        "Acne and pigmentation issues affect confidence and self-esteem. Our treatment combines internal toxin elimination with external skin nourishment to clear acne and improve skin clarity and tone.",
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
      image: "/acne-treatment.jpg",
    },
    {
      id: "vitiligo",
      title: "Vitiligo",
      subtitle: "Pigmentation Loss Disorder",
      shortDescription: "Manage vitiligo through Ayurvedic immune balancing and pigment restoration therapies.",
      fullDescription:
        "Vitiligo is an autoimmune condition causing loss of skin pigmentation. Our comprehensive Ayurvedic approach aims to arrest pigment loss, strengthen immunity, and promote repigmentation naturally.",
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
      image: "/vitiligo-treatment.jpg",
    },
    {
      id: "urticaria",
      title: "Urticaria & Allergic Reactions",
      subtitle: "Allergic Skin Manifestations",
      shortDescription: "Resolve chronic urticaria and allergic skin reactions with Ayurvedic immunotherapy.",
      fullDescription:
        "Urticaria and allergic skin conditions result from Pitta aggravation and immune sensitivity. Our treatment focuses on identifying allergen triggers and desensitizing the immune system naturally.",
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
      image: "/urticaria-treatment.jpg",
    },
    {
      id: "alopecia",
      title: "Hair Loss & Alopecia",
      subtitle: "Hair Growth & Scalp Health",
      shortDescription: "Restore healthy hair growth with Ayurvedic scalp and follicle rejuvenation therapies.",
      fullDescription:
        "Hair loss affects confidence and self-image. Our Ayurvedic treatments address hair root weakness, scalp health, and internal nutritional imbalances to promote natural regrowth.",
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
      image: "/alopecia-treatment.jpg",
    },
  ]

  const treatmentBenefits = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Pure organic herbs with no synthetic chemicals or steroids",
    },
    { icon: CheckCircle2, title: "Proven Results", description: "90%+ success rate across all skin conditions" },
    { icon: Clock, title: "Lasting Relief", description: "Addresses root cause for long-term healing" },
    { icon: Users, title: "Personalized Plans", description: "Custom treatment for your unique constitution" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Ayurvedic Skin Treatments</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive, natural solutions for chronic skin diseases and conditions. Heal your skin from within using
            5000+ years of Ayurvedic wisdom.
          </p>
        </div>
      </section>

      {/* Treatment Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {treatmentBenefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <Card key={idx} className="p-6 border border-border bg-card text-center">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Treatment Specializations</h2>
            <p className="text-lg text-muted-foreground">Specialized Ayurvedic care for various skin conditions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <Link key={treatment.id} href={`/treatments/${treatment.id}`}>
                <Card className="h-full border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={treatment.image || "/placeholder.svg"}
                      alt={treatment.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="p-6">
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
                      {treatment.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{treatment.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {treatment.shortDescription}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm font-semibold text-accent">{treatment.successRate}</span>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Our Treatment Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "Thorough assessment of your condition, medical history, and Dosha constitution",
              },
              {
                step: "2",
                title: "Personalized Plan",
                description: "Customized treatment protocol combining herbs, therapies, and lifestyle changes",
              },
              {
                step: "3",
                title: "Treatment Phase",
                description: "Regular therapies including massages, detoxification, and herbal medications",
              },
              {
                step: "4",
                title: "Maintenance & Follow-up",
                description: "Ongoing support and preventive care to ensure lasting results",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <Card className="p-6 border border-border bg-card text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
                {idx < 3 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-primary/30" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Healing Journey Today</h2>
          <p className="text-lg mb-8 opacity-90">
            Choose the treatment that addresses your skin condition and begin your transformation with Dr. Manpreet.
          </p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link href="/contact">Book Your Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
