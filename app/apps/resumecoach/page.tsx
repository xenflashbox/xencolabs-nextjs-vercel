import React from "react";
import { ArrowRight, CheckCircle, Star, Users, Briefcase, Target, TrendingUp, Award, FileText, Search, Zap, Shield, Play } from 'lucide-react';
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from '@/components/ui/button';

export default function ResumeCoachPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-8">
                🎯 ATS-Optimized Resumes That Get Interviews
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Beat The
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                  AI Screening
                </span>
                <span className="text-4xl block">Get More Interviews</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Stop getting rejected by robots. ResumeCoach uses government job data to create ATS-optimized resumes 
                that pass automated screening and land you in front of real humans.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="xl" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Optimize My Resume
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="xl">
                  <Play className="w-5 h-5 mr-2" />
                  See How It Works
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free ATS check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>73% more interviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Government job data</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <FileText className="text-white w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ATS Resume Optimization</h3>
                <p className="text-gray-600 dark:text-gray-300">From rejected to hired in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-8">
              Trusted by job seekers and recruiters nationwide
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2,400+</div>
                <p className="text-gray-600 dark:text-gray-300">Job Seekers Helped</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">73%</div>
                <p className="text-gray-600 dark:text-gray-300">More Interviews</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">48hr</div>
                <p className="text-gray-600 dark:text-gray-300">Average Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                <p className="text-gray-600 dark:text-gray-300">Success Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Your Resume Gets Rejected
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              98% of Fortune 500 companies use ATS systems. If your resume isn't optimized, it never reaches human eyes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* ATS Optimization */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
              <Shield className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">ATS Screening System</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Automated systems scan for specific keywords, formatting, and job match scores before humans ever see your resume.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Keyword matching algorithms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Format and structure analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Experience relevance scoring</span>
                </li>
              </ul>
            </div>

            {/* Government Data */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <Search className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Government Job Data</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We use official O*NET and Department of Labor data to match your skills with the exact keywords employers are looking for.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Official job classification data</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Industry-specific keywords</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Skills and competency mapping</span>
                </li>
              </ul>
            </div>

            {/* AI Optimization */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <Zap className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">AI Resume Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our AI rewrites your resume using the exact language and structure that ATS systems rank highest.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">ATS-friendly formatting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Keyword density optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Impact-driven achievements</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">How ResumeCoach Works</h3>
              <p className="text-gray-600 dark:text-gray-300">From unoptimized to interview-ready in 3 steps</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-bold mb-2">Upload & Analyze</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Upload your current resume and target job description</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-bold mb-2">AI Optimization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI matches your experience with government job data</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-bold mb-2">Get Interviews</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Download your ATS-optimized resume and start applying</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From zero responses to dream job offers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                "Applied to 47 jobs with my old resume - zero responses. Used ResumeCoach and got 3 interviews in the first week. Landed my dream job!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                  SM
                </div>
                <div>
                  <p className="font-semibold">Sarah Martinez</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
                  <p className="text-sm text-purple-600">+$25K salary increase</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                "As a career changer, I was struggling to translate my skills. ResumeCoach showed me exactly what keywords to use. Game changer!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center font-bold text-white">
                  MJ
                </div>
                <div>
                  <p className="font-semibold">Michael Johnson</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Data Analyst</p>
                  <p className="text-sm text-purple-600">Career change success</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                "I use ResumeCoach for all my candidates. Their interview rate went from 15% to 68%. My clients love the results!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold text-white">
                  LR
                </div>
                <div>
                  <p className="font-semibold">Lisa Rodriguez</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Executive Recruiter</p>
                  <p className="text-sm text-purple-600">68% interview rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Affordable Career Investment
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Less than one day's salary for a tool that could transform your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Job Seeker */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Job Seeker</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">$29<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-500">Perfect for individual job seekers</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>3 resume optimizations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>ATS compatibility check</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Government job data access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cover letter templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Interview prep guide</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                Start Free Trial
              </Button>
            </div>

            {/* Professional */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-purple-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">Most Popular</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Professional</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">$59<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-500">For active job seekers</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited optimizations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Multiple resume versions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>LinkedIn profile optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Salary negotiation guide</span>
                </li>
              </ul>
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">Custom</div>
                <p className="text-gray-500">For recruiters & agencies</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Bulk resume processing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>White-label solution</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>API integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Training included</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Getting Rejected by Robots
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 2,400+ job seekers who've transformed their resumes and landed their dream jobs with ResumeCoach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button variant="secondary" size="xl">
              Start Free Trial
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-purple-600">
              See Success Stories
            </Button>
          </div>
          
          <p className="text-purple-200">
            Free ATS check included • 30-day money back guarantee • Cancel anytime
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
