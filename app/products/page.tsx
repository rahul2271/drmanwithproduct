"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Droplet, Check, ShoppingCart, Star, Zap, Package, Truck } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: "psoriasis-kit-1",
    name: "Complete Psoriasis Healing Kit",
    description: "Advanced Ayurvedic formulation specifically designed for psoriasis management and skin healing.",
    price: 4999,
    image: "/ayurvedic-psoriasis-treatment-kit.jpg",
    category: "Psoriasis",
    benefits: [
      "Reduces inflammation and itching",
      "Heals and regenerates skin",
      "Balances Vata and Pitta doshas",
      "Strengthens skin immunity",
    ],
    ingredients: [
      "Neem Extract",
      "Turmeric (Curcumin)",
      "Manjistha",
      "Taila (Medicated Oil)",
      "Ghee",
      "Ayurvedic Herbs",
    ],
    dosage: "Twice daily with warm water or milk",
    duration: "3 months course",
    suitableFor: ["Chronic Psoriasis", "Acute Flare-ups", "Maintenance Therapy"],
    testimonials: 87,
    rating: 4.8,
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
              Premium Ayurvedic Treatment Kits
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Professionally formulated treatment packages for specific skin conditions. Start your healing journey
              today.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div key={product.id} className="lg:col-span-3">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* Product Image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl animate-zoom-in">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-96 object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold">
                      {product.category}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 backdrop-blur px-3 py-2 rounded-full">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.testimonials} reviews)</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="animate-slide-in-right">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                      <span className="text-lg text-muted-foreground line-through">₹6999</span>
                      <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                        28% OFF
                      </span>
                    </div>

                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Zap size={20} className="text-accent" /> Key Benefits
                      </h3>
                      <ul className="space-y-3">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Product Info Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <Card className="p-4 border-2 border-border hover:border-accent transition-colors">
                        <p className="text-xs text-muted-foreground font-semibold mb-1">TREATMENT DURATION</p>
                        <p className="text-lg font-bold text-foreground">{product.duration}</p>
                      </Card>
                      <Card className="p-4 border-2 border-border hover:border-accent transition-colors">
                        <p className="text-xs text-muted-foreground font-semibold mb-1">DOSAGE</p>
                        <p className="text-lg font-bold text-foreground">{product.dosage}</p>
                      </Card>
                    </div>

                    {/* CTA Button */}
                    <Button
                      size="lg"
                      asChild
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 hover-scale"
                    >
                      <Link
                        href={`/products/${product.id}/checkout`}
                        className="flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={20} /> Buy Now - ₹{product.price.toLocaleString()}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Ingredients Section */}
                <div className="mt-16 p-8 bg-card border-2 border-border rounded-xl">
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Leaf size={24} className="text-accent" /> Premium Ingredients
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.ingredients.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:border-accent transition-colors"
                      >
                        <Droplet size={16} className="text-accent flex-shrink-0" />
                        <span className="text-foreground font-medium">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suitable For */}
                <div className="mt-8 p-8 bg-accent/5 border-2 border-accent/20 rounded-xl">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Suitable For:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.suitableFor.map((use, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <span className="text-foreground font-medium">{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Buy Our Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "100% Pure & Authentic",
                description: "All products are made from premium, organic ingredients verified by Dr. Manpreet.",
              },
              {
                icon: Truck,
                title: "Fast & Secure Delivery",
                description: "Track your order in real-time with our secure shipping partners across India.",
              },
              {
                icon: Star,
                title: "Doctor Recommended",
                description: "All kits are personally formulated by Dr. Manpreet Singh with 7+ years expertise.",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <Card
                  key={idx}
                  className="p-6 border-2 border-border hover:border-accent transition-all duration-300 text-center group hover-scale"
                >
                  <Icon className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
