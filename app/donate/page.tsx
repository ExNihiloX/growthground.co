'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Heart, 
  Coffee, 
  Zap, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Github,
  Globe,
  Code,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { MarketingHeader } from '@/components/layout/marketing-header';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');

  const predefinedAmounts = [10, 25, 50, 100];

  const impactLevels = [
    {
      amount: 10,
      title: 'Coffee Supporter',
      icon: Coffee,
      description: 'Help keep our developers caffeinated',
      impact: 'Covers server costs for 1 day',
      color: 'from-amber-500 to-orange-500'
    },
    {
      amount: 25,
      title: 'Course Creator',
      icon: BookOpen,
      description: 'Support new lesson development',
      impact: 'Funds 1 hour of content creation',
      color: 'from-blue-500 to-blue-600'
    },
    {
      amount: 50,
      title: 'Feature Enabler',
      icon: Zap,
      description: 'Help us build new platform features',
      impact: 'Supports 1 week of development',
      color: 'from-purple-500 to-purple-600'
    },
    {
      amount: 100,
      title: 'Growth Champion',
      icon: Star,
      description: 'Accelerate our mission significantly',
      impact: 'Powers platform growth for 1 month',
      color: 'from-green-500 to-green-600'
    }
  ];

  const openSourceBenefits = [
    {
      icon: Globe,
      title: 'Accessible to Everyone',
      description: 'No paywalls, no subscriptions. Knowledge should be free for all founders worldwide.'
    },
    {
      icon: Code,
      title: 'Transparent Development',
      description: 'Our entire codebase is open source. See exactly how we build and improve the platform.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by the community, for the community. Your contributions shape our roadmap.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focused',
      description: 'We prioritize cutting-edge learning experiences over profit margins.'
    }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const getCurrentAmount = () => {
    return customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  };

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge className="mb-6 bg-red-100 text-red-800 hover:bg-red-100">
            <Heart className="h-4 w-4 mr-2" />
            Support Open Source Education
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Keep Learning
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              {' '}Free Forever
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            GrowthGround is completely free and open source. Your donations help us maintain the platform, 
            create new content, and keep education accessible to founders worldwide.
          </p>
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Community Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>
                
                {/* Donation Type Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                      donationType === 'one-time'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                      donationType === 'monthly'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    Monthly
                  </button>
                </div>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Amount (USD)
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={cn(
                          "p-3 rounded-lg border-2 text-center font-medium transition-all",
                          selectedAmount === amount
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Impact Preview */}
                {getCurrentAmount() > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Your Impact</h3>
                    <p className="text-sm text-gray-600">
                      ${getCurrentAmount()} {donationType === 'monthly' ? 'per month' : ''} helps us:
                    </p>
                    <ul className="mt-2 space-y-1">
                      {getCurrentAmount() >= 10 && (
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Cover server and hosting costs
                        </li>
                      )}
                      {getCurrentAmount() >= 25 && (
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Fund new lesson development
                        </li>
                      )}
                      {getCurrentAmount() >= 50 && (
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Support platform improvements
                        </li>
                      )}
                      {getCurrentAmount() >= 100 && (
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Accelerate our growth mission
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Donate Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-lg py-6"
                  disabled={getCurrentAmount() === 0}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Donate ${getCurrentAmount()} {donationType === 'monthly' ? '/month' : ''}
                </Button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Secure payment processing powered by Stripe. Your donation helps keep GrowthGround free for everyone.
                </p>
              </CardContent>
            </Card>

            {/* Impact Levels */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Support Levels</h2>
              {impactLevels.map((level) => {
                const Icon = level.icon;
                return (
                  <Card 
                    key={level.amount} 
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-lg",
                      selectedAmount === level.amount ? "ring-2 ring-blue-500" : ""
                    )}
                    onClick={() => handleAmountSelect(level.amount)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center",
                          level.color
                        )}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-900">{level.title}</h3>
                            <Badge variant="outline">${level.amount}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{level.description}</p>
                          <p className="text-xs text-gray-500">{level.impact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Open Source Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why We're Open Source
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe education should be accessible to everyone. That's why GrowthGround is completely 
              free and open source, forever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openSourceBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Ways to Support */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Other Ways to Support Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Github className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Contribute Code</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Help us improve the platform by contributing to our open source codebase.
                </p>
                <Button variant="outline" className="w-full">
                  View on GitHub
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Spread the Word</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Share GrowthGround with other founders and entrepreneurs in your network.
                </p>
                <Button variant="outline" className="w-full">
                  Share Now
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Create Content</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Help us create new lessons and improve existing content for the community.
                </p>
                <Button variant="outline" className="w-full">
                  Get Involved
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">GrowthGround</span>
              </div>
              <p className="text-gray-400 mb-4">
                Free, open source education for founders and entrepreneurs worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/auth/signup" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/donate" className="hover:text-white transition-colors">Donate</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GrowthGround. All rights reserved. Made with ❤️ for the founder community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}