import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/common/Button'
import { Card, CardContent } from '../../components/common/Card'
import { Search, Map, Shield, Sparkles } from 'lucide-react'

const Landing = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-emerald-50/50 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/40 to-transparent -z-10 blur-3xl" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-navy-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Rental Intelligence
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-navy-900 mb-6 leading-tight">
              Find Your Perfect Home <br className="hidden md:block" />
              with <span className="text-emerald-600">Neighborhood DNA</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover safe, affordable, and tailored rentals. Our AI analyzes crime rates, connectivity, and amenities to find your ideal match.
            </p>
          </motion.div>

          {/* AI Search Box - Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-4 shadow-xl border-white/50 glass">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Where do you want to live? (e.g. Downtown)" 
                    className="w-full h-12 pl-10 pr-4 rounded-md border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <Button size="lg" className="w-full md:w-auto h-12 px-8">
                  Analyze Area
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Why choose AI SafeRent?</h2>
            <p className="text-gray-600">The most advanced rental platform for smart decisions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-emerald-600" />}
              title="Neighborhood DNA Score"
              description="Get deep insights into safety, crime analysis, and livability scores before you visit."
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-emerald-600" />}
              title="AI Recommendations"
              description="Our AI matches you with the best properties based on your profile, budget, and preferences."
            />
            <FeatureCard 
              icon={<Map className="w-8 h-8 text-emerald-600" />}
              title="Smart Connectivity"
              description="Evaluate nearby transport, metro distance, hospitals, and lifestyle amenities instantly."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-navy-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </CardContent>
  </Card>
)

export default Landing
