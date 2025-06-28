'use client';

import { useState } from 'react';
import { Search, Book, MessageCircle, Mail, Phone, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      articles: [
        'How to create an account',
        'Navigating the dashboard',
        'Starting your first course',
        'Understanding progress tracking',
      ],
    },
    {
      title: 'Courses & Learning',
      icon: Book,
      articles: [
        'How to enroll in courses',
        'Tracking your progress',
        'Downloading certificates',
        'Accessing course materials',
      ],
    },
    {
      title: 'Account & Billing',
      icon: Book,
      articles: [
        'Managing your subscription',
        'Updating payment methods',
        'Canceling your account',
        'Refund policy',
      ],
    },
    {
      title: 'Technical Support',
      icon: Book,
      articles: [
        'Troubleshooting video playback',
        'Browser compatibility',
        'Mobile app issues',
        'Clearing cache and cookies',
      ],
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to create a new password.',
    },
    {
      id: '2',
      question: 'Can I download course videos for offline viewing?',
      answer: 'Yes! Premium subscribers can download course videos for offline viewing using our mobile app. Look for the download icon next to each video lesson.',
    },
    {
      id: '3',
      question: 'How do I get a certificate of completion?',
      answer: 'Certificates are automatically generated when you complete 100% of a course. You can download your certificate from the course completion page or from your profile.',
    },
    {
      id: '4',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions.',
    },
    {
      id: '5',
      question: 'Can I change my subscription plan?',
      answer: 'Yes, you can upgrade or downgrade your subscription at any time from your account settings. Changes take effect immediately for upgrades and at the next billing cycle for downgrades.',
    },
    {
      id: '6',
      question: 'Is there a mobile app available?',
      answer: 'Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.',
    },
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      available: 'Available 24/7',
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      action: 'Send Email',
      available: 'Response within 24 hours',
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our team',
      icon: Phone,
      action: 'Call Now',
      available: 'Mon-Fri, 9AM-6PM EST',
    },
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600">
          Find answers to your questions and get the support you need
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card key={option.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                <Button className="w-full mb-2">{option.action}</Button>
                <p className="text-xs text-gray-500">{option.available}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Help Categories */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.title} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      </div>
                      <div className="space-y-2">
                        {category.articles.map((article) => (
                          <button
                            key={article}
                            className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {article}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Articles */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Getting started with your first course',
                  'How to track your learning progress',
                  'Troubleshooting video playback issues',
                  'Understanding certificates',
                  'Mobile app features',
                ].map((article, index) => (
                  <div key={article} className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors text-left">
                      {article}
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openFAQ === faq.id}
                onOpenChange={(isOpen) => setOpenFAQ(isOpen ? faq.id : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFAQ === faq.id ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-600">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try different keywords or browse our help categories above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-between">
              <span>Video Tutorials</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between">
              <span>Community Forum</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between">
              <span>System Status</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between">
              <span>Feature Requests</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}