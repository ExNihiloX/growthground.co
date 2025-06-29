'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Shield, 
  Eye, 
  Lock,
  Users,
  Globe,
  Mail,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Download,
  Trash2,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2024";

  const quickLinks = [
    { title: "Information We Collect", href: "#information-collection" },
    { title: "How We Use Your Data", href: "#data-usage" },
    { title: "Data Sharing", href: "#data-sharing" },
    { title: "Your Rights", href: "#user-rights" },
    { title: "Data Security", href: "#data-security" },
    { title: "Cookies & Tracking", href: "#cookies" },
    { title: "Contact Us", href: "#contact" }
  ];

  const dataTypes = [
    {
      icon: Users,
      title: "Account Information",
      description: "Name, email address, profile picture, and account preferences",
      examples: ["Full name", "Email address", "Profile photo", "Learning preferences"]
    },
    {
      icon: Eye,
      title: "Usage Data",
      description: "How you interact with our platform and learning content",
      examples: ["Lessons completed", "Time spent learning", "Progress tracking", "Feature usage"]
    },
    {
      icon: Globe,
      title: "Technical Information",
      description: "Device and browser information for platform optimization",
      examples: ["IP address", "Browser type", "Device information", "Operating system"]
    },
    {
      icon: FileText,
      title: "Communication Data",
      description: "Messages and feedback you send to our support team",
      examples: ["Support tickets", "Feedback forms", "Community posts", "Survey responses"]
    }
  ];

  const userRights = [
    {
      icon: Eye,
      title: "Right to Access",
      description: "Request a copy of all personal data we have about you",
      action: "Download Your Data"
    },
    {
      icon: Settings,
      title: "Right to Rectification",
      description: "Correct any inaccurate or incomplete personal information",
      action: "Update Profile"
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      description: "Request deletion of your personal data (\"right to be forgotten\")",
      action: "Delete Account"
    },
    {
      icon: Lock,
      title: "Right to Portability",
      description: "Export your data in a machine-readable format",
      action: "Export Data"
    }
  ];

  const securityMeasures = [
    {
      icon: Shield,
      title: "Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard protocols"
    },
    {
      icon: Lock,
      title: "Access Controls",
      description: "Strict access controls ensure only authorized personnel can access your data"
    },
    {
      icon: AlertTriangle,
      title: "Regular Audits",
      description: "We conduct regular security audits and vulnerability assessments"
    },
    {
      icon: CheckCircle,
      title: "Compliance",
      description: "We comply with GDPR, CCPA, and other applicable privacy regulations"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GrowthGround</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            <Shield className="h-4 w-4 mr-2" />
            Your Privacy Matters
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Privacy
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Policy
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            We're committed to protecting your privacy and being transparent about how we collect, 
            use, and protect your personal information.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Version 2.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <span className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  {link.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At GrowthGround, we believe that privacy is a fundamental right. This Privacy Policy explains 
                    how we collect, use, disclose, and safeguard your information when you use our educational platform.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using GrowthGround, you agree to the collection and use of information in accordance with this policy. 
                    We will not use or share your information with anyone except as described in this Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Information We Collect */}
            <div id="information-collection" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Information We Collect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {dataTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-bold text-gray-900">{type.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                        <div className="space-y-2">
                          {type.examples.map((example, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-gray-500">{example}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Card className="border-0 shadow-lg bg-yellow-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Automatic Data Collection</h4>
                      <p className="text-yellow-700 text-sm">
                        Some information is collected automatically when you use our platform, such as your IP address, 
                        browser type, and usage patterns. This helps us improve our service and ensure security.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How We Use Your Data */}
            <div id="data-usage" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Data</h2>
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Uses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Service Provision</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Provide access to learning content
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Track your learning progress
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Personalize your experience
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Send important updates
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Platform Improvement</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Analyze usage patterns
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Improve content quality
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Enhance user experience
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Develop new features
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Data Sharing */}
            <div id="data-sharing" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Sharing and Disclosure</h2>
              <Card className="border-0 shadow-lg bg-green-50 mb-6">
                <CardContent className="p-8">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-3">Our Commitment</h3>
                      <p className="text-green-700 leading-relaxed">
                        We do not sell, trade, or rent your personal information to third parties. Your data is yours, 
                        and we're committed to keeping it safe and private.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Limited Sharing Scenarios</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium text-gray-900">Service Providers</h5>
                        <p className="text-gray-600 text-sm">
                          We may share data with trusted service providers who help us operate our platform 
                          (hosting, analytics, email services). They are bound by strict confidentiality agreements.
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h5 className="font-medium text-gray-900">Legal Requirements</h5>
                        <p className="text-gray-600 text-sm">
                          We may disclose information if required by law, court order, or to protect our rights 
                          and the safety of our users.
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-gray-900">Business Transfers</h5>
                        <p className="text-gray-600 text-sm">
                          In the event of a merger or acquisition, user data may be transferred as part of the business assets, 
                          but privacy protections will remain in place.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* User Rights */}
            <div id="user-rights" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Rights and Choices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {userRights.map((right, index) => {
                  const Icon = right.icon;
                  return (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-purple-600" />
                          </div>
                          <h3 className="font-bold text-gray-900">{right.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{right.description}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          {right.action}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">How to Exercise Your Rights</h4>
                  <p className="text-blue-700 text-sm mb-4">
                    To exercise any of these rights, please contact us at privacy@growthground.co or use the 
                    contact form on our website. We will respond to your request within 30 days.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Privacy Team
                    </Button>
                    <Link href="/contact">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Contact Form
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Security */}
            <div id="data-security" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Data Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {securityMeasures.map((measure, index) => {
                  const Icon = measure.icon;
                  return (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="font-bold text-gray-900">{measure.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{measure.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Card className="border-0 shadow-lg bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Data Breach Notification</h4>
                      <p className="text-red-700 text-sm">
                        In the unlikely event of a data breach that affects your personal information, 
                        we will notify you within 72 hours and provide details about what happened and what we're doing about it.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cookies & Tracking */}
            <div id="cookies" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookies and Tracking Technologies</h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Cookies?</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Cookies are small text files stored on your device that help us provide a better user experience. 
                    We use both session cookies (which expire when you close your browser) and persistent cookies 
                    (which remain until deleted or expired).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                      <p className="text-gray-600 text-sm">
                        Required for the platform to function properly. These cannot be disabled.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                      <p className="text-gray-600 text-sm">
                        Help us understand how you use our platform to improve the user experience.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Preference Cookies</h4>
                      <p className="text-gray-600 text-sm">
                        Remember your settings and preferences for a personalized experience.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Managing Cookies</h4>
                    <p className="text-gray-600 text-sm">
                      You can control cookies through your browser settings. However, disabling certain cookies 
                      may affect the functionality of our platform.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* International Users */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">International Users</h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">GDPR Compliance (EU Users)</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        If you're located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):
                      </p>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to data portability
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to object to processing
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to restrict processing
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to lodge a complaint
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">CCPA Compliance (California Users)</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        California residents have specific rights under the California Consumer Privacy Act (CCPA):
                      </p>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to know what data is collected
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to delete personal information
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to opt-out of sale
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Right to non-discrimination
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Children's Privacy */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
              <Card className="border-0 shadow-lg bg-orange-50">
                <CardContent className="p-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-orange-800 mb-3">Age Restrictions</h3>
                      <p className="text-orange-700 leading-relaxed mb-4">
                        GrowthGround is not intended for children under the age of 13. We do not knowingly collect 
                        personal information from children under 13. If you are a parent or guardian and believe 
                        your child has provided us with personal information, please contact us immediately.
                      </p>
                      <p className="text-orange-700 leading-relaxed">
                        If we discover that we have collected personal information from a child under 13, 
                        we will delete that information as quickly as possible.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Changes to Policy */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy</h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, 
                    technology, legal requirements, or other factors. When we make changes, we will:
                  </p>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Update the "Last Updated" date at the top of this policy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Notify you via email if the changes are significant</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Post a notice on our platform highlighting the changes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Provide a 30-day notice period for material changes</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed">
                    Your continued use of GrowthGround after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div id="contact" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                    please don't hesitate to contact us:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4">Privacy Team</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">privacy@growthground.co</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">www.growthground.co/contact</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4">Mailing Address</h3>
                      <div className="text-gray-600">
                        <p>GrowthGround Privacy Team</p>
                        <p>123 Innovation Drive</p>
                        <p>San Francisco, CA 94105</p>
                        <p>United States</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Privacy Team
                      </Button>
                      <Link href="/contact">
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          General Contact Form
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

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
                Empowering founders with the technical knowledge they need to build successful companies.
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
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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