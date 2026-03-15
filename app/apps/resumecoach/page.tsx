import React from "react";
import { ArrowRight, CheckCircle, ExternalLink, FileText, Search, Zap, Shield } from 'lucide-react';
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
                AI Resume Optimization
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                ResumeCoach
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                ATS-optimized resumes using government O*NET job classification data.
                Matches your skills with the exact keywords employers are looking for.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="https://resumecoach.me" target="_blank" rel="noopener noreferrer">
                  <Button size="xl" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2">
                    Visit ResumeCoach
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Government job data</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ATS-optimized</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <FileText className="text-white w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ATS Resume Optimization</h3>
                <p className="text-gray-600 dark:text-gray-300">Powered by O*NET data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How ResumeCoach Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
              <Shield className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">ATS Screening</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automated systems scan for specific keywords, formatting, and job match scores. Your resume needs to pass these before humans see it.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <Search className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Government Job Data</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We use official O*NET and Department of Labor data to match your skills with the exact keywords employers use in job postings.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <Zap className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">AI Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI rewrites your resume using the language and structure that ATS systems rank highest, while maintaining accuracy.
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Three Simple Steps</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-bold mb-2">Upload & Analyze</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Upload your resume and target job description</p>
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
                <h4 className="font-bold mb-2">Download</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Get your ATS-optimized resume and start applying</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Try ResumeCoach
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Visit resumecoach.me to optimize your resume with AI-powered ATS analysis.
          </p>
          <a href="https://resumecoach.me" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="xl" className="flex items-center gap-2 mx-auto">
              Visit ResumeCoach
              <ExternalLink className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </MarketingLayout>
  );
}
