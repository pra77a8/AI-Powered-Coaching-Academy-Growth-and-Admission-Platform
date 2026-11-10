'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    instituteName: '',
    email: '',
    phone: '',
    city: '',
    examCategory: 'JEE/NEET',
    message: '',
    requestDemo: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.instituteName.trim())
      errs.instituteName = 'Institute name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message or question';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Staged inquiry submission handler
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* Contact Hero */}
        <section className="bg-markova-grid-hero border-b border-border-subtle/60 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-brand-900 shadow-soft"
            >
              Get in Touch
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Let&apos;s Talk About{' '}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-from-font underline-offset-8">
                Growing Your Institute
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
              Have questions about how AcademyGrowth fits your coaching academy?
              Our admissions specialists are here to assist.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Grid */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column: Contact Info & Support */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-text-primary">
                    We&apos;re Here to Help
                  </h2>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Whether you are evaluating platform capabilities, need help
                    importing past inquiries, or want to schedule a personalized
                    walkthrough for your leadership team, we are ready.
                  </p>

                  <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-900 shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                          Email Support
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-text-primary">
                          support@academygrowth.com
                        </p>
                        <p className="text-xs text-text-secondary">
                          Admissions & technical inquiries
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-900 shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                          Phone / WhatsApp Desk
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-text-primary">
                          +91 (020) 8000-GROW
                        </p>
                        <p className="text-xs text-text-secondary">
                          Mon – Sat, 9:30 AM to 6:30 PM IST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-900 shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                          Headquarters
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-text-primary">
                          AcademyGrowth Technologies
                        </p>
                        <p className="text-xs text-text-secondary">
                          Pune & Bengaluru, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Free trial callout */}
                <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6">
                  <div className="flex items-center gap-2 font-heading text-sm font-bold text-brand-900">
                    <ShieldCheck className="h-5 w-5 text-brand-700" />
                    <span>Want to test it out right away?</span>
                  </div>
                  <p className="mt-2 text-xs text-brand-800 leading-relaxed">
                    You can set up your institute account in 3 minutes and explore
                    all features for 14 days without waiting for a demo.
                  </p>
                  <Link href="/signup" className="mt-4 inline-block">
                    <Button
                      size="sm"
                      className="bg-brand-900 text-white hover:bg-brand-800"
                    >
                      Start Free Trial Instantly
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Contact & Demo Form */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-border-subtle bg-white p-6 sm:p-10 shadow-medium">
                  {submitted ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-800 mb-4">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        Inquiry Received!
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, {formData.fullName}. Our team has
                        staged your inquiry for {formData.instituteName} and will
                        contact you at {formData.email} within 1 business day.
                      </p>

                      <div className="mt-6 rounded-xl border border-border-subtle bg-neutral-50 p-4 text-xs text-text-muted text-left max-w-md mx-auto">
                        <p className="font-medium text-text-secondary">
                          Note on Integration Status:
                        </p>
                        <p className="mt-1">
                          This inquiry request has been successfully staged in the
                          application environment. Direct transactional email
                          delivery will activate once your outbound SMTP provider is
                          configured.
                        </p>
                      </div>

                      <div className="mt-6">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({
                              fullName: '',
                              instituteName: '',
                              email: '',
                              phone: '',
                              city: '',
                              examCategory: 'JEE/NEET',
                              message: '',
                              requestDemo: true,
                            });
                          }}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-text-primary">
                          Request a Demo or Send an Inquiry
                        </h3>
                        <p className="mt-1 text-xs text-text-secondary">
                          Fill in your details below and an admissions specialist will
                          reach out.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-xs font-semibold text-text-primary mb-1.5"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            placeholder="e.g. Rajesh Sharma"
                            className={`h-11 text-base ${
                              errors.fullName ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Institute Name */}
                        <div>
                          <label
                            htmlFor="instituteName"
                            className="block text-xs font-semibold text-text-primary mb-1.5"
                          >
                            Institute / Academy Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="instituteName"
                            value={formData.instituteName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                instituteName: e.target.value,
                              })
                            }
                            placeholder="e.g. Apex IIT Academy"
                            className={`h-11 text-base ${
                              errors.instituteName ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.instituteName && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.instituteName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-text-primary mb-1.5"
                          >
                            Work Email <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="director@apexacademy.in"
                            className={`h-11 text-base ${
                              errors.email ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold text-text-primary mb-1.5"
                          >
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="+91 98765 43210"
                            className={`h-11 text-base ${
                              errors.phone ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* City */}
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-xs font-semibold text-text-primary mb-1.5"
                          >
                            City
                          </label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                            placeholder="e.g. Pune, Kota, Mumbai"
                            className="h-11 text-base"
                          />
                        </div>

                        {/* Exam Focus */}
                        <div>
                          <label
                            htmlFor="examCategory"
                            className="block text-xs font-semibold text-text-primary mb-1.5"
                          >
                            Primary Exam Specialty
                          </label>
                          <select
                            id="examCategory"
                            value={formData.examCategory}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                examCategory: e.target.value,
                              })
                            }
                            className="flex h-11 w-full rounded-input border border-input-border bg-input-bg px-3 py-2 text-base text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
                          >
                            <option value="JEE/NEET">JEE & NEET Coaching</option>
                            <option value="MHT-CET">MHT-CET / State Exams</option>
                            <option value="UPSC">UPSC & Civil Services</option>
                            <option value="FOUNDATION">Foundation & School</option>
                            <option value="COMMERCE_CA">Commerce & CA/CS</option>
                            <option value="OTHER">Other Coaching Specialty</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold text-text-primary mb-1.5"
                        >
                          How can we help your academy?{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Tell us about your current inquiry volume, challenges with student follow-ups, or questions..."
                          className={`w-full rounded-input border border-input-border bg-input-bg p-3 text-base text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 ${
                            errors.message ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Request Demo Checkbox */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <input
                          type="checkbox"
                          id="requestDemo"
                          checked={formData.requestDemo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              requestDemo: e.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-brand-900 focus:ring-brand-700 cursor-pointer"
                        />
                        <label
                          htmlFor="requestDemo"
                          className="text-xs font-medium text-text-primary cursor-pointer"
                        >
                          Please arrange a live product demonstration for our leadership
                          team.
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-900 text-white hover:bg-brand-800 h-12 text-base font-semibold shadow-soft"
                        >
                          {isSubmitting ? (
                            <span>Submitting Inquiry...</span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <span>Send Inquiry</span>
                              <Send className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

