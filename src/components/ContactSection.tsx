import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, ShieldAlert, BadgeCheck, AlertCircle } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactSectionProps {
  messages: ContactMessage[];
  onSubmitMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'unread'>) => void;
  calculatedQuoteSubject?: string;
  onClearMessages: () => void;
}

export default function ContactSection({
  messages,
  onSubmitMessage,
  calculatedQuoteSubject = '',
  onClearMessages
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: calculatedQuoteSubject || '',
    message: ''
  });

  const [formErr, setFormErr] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // pre-fill subject if calculated fields shift
  useEffect(() => {
    if (calculatedQuoteSubject) {
      setFormData((prev) => ({ ...prev, subject: calculatedQuoteSubject }));
    }
  }, [calculatedQuoteSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr('');
    setSuccessMsg('');

    // validations
    if (!formData.name.trim()) return setFormErr('Name field is required');
    if (!formData.email.trim()) return setFormErr('Email field is required');
    if (!formData.subject.trim()) return setFormErr('Subject field is required');
    if (!formData.message.trim()) return setFormErr('Message body is required');

    // basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return setFormErr('Please provide a valid email format.');
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.subject.trim(),
          message: formData.message.trim()
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send details via server SMTP.');
      }

      // Submit up to App state for local display cache
      onSubmitMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      // clear fields
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setSuccessMsg('Your inquiry has been successfully sent to alxokeyo15@gmail.com!');
    } catch (err: any) {
      console.error('SMTP Transmission Error:', err);
      setFormErr(err?.message || 'Failed to connect to SMTP mail server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in" id="contact-section-root">
      
      {/* Introduction text */}
      <section className="space-y-3">
        <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 font-bold">Connect with us</span>
        <h2 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">Initiate a Consultation</h2>
        <p className="text-sm text-slate-500 font-sans max-w-xl">
          Interested in a customized quote estimate, systems optimization audit, or dedicated full-stack contract support? Drop a message below.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        
        {/* Left: Metadata cards */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">Contact Coordinates</h3>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Email Us</span>
                  <a href="mailto:info@techninja.co.ke" className="font-bold text-slate-850 hover:text-indigo-600 border-b border-dashed border-slate-200">
                    info@techninja.co.ke
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Phone</span>
                  <span className="font-bold text-slate-850">(+254) 707 440516</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-mono text-[10px] uppercase block font-bold">Location</span>
                  <span className="font-bold text-slate-850">Westlands, Nairobi.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure signal */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3.5">
            <div className="flex items-center gap-2 text-indigo-300">
              <BadgeCheck className="w-5 h-5 text-indigo-300" />
              <span className="text-xs font-mono uppercase font-bold tracking-widest text-white">Security Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              We secure custom databases locally. No credentials or payload message details are sent over public networks without explicit HTTPS transport wraps.
            </p>
          </div>

        </div>

        {/* Right: Message Form */}
        <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-md font-bold text-slate-900 tracking-tight font-sans">Corporate Inquiry Form</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full text-xs font-sans bg-slate-50 border border-slate-205 rounded-xl px-3.5 py-2.5 text-slate-850 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. Rachel Peterson"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">Email Coordinates</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full text-xs font-sans bg-slate-50 border border-slate-205 rounded-xl px-3.5 py-2.5 text-slate-855 focus:outline-hidden"
                  placeholder="e.g. rachel@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">Subject Theme</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                className="w-full text-xs font-sans bg-slate-50 border border-slate-205 rounded-xl px-3.5 py-2.5 text-slate-850 focus:outline-hidden"
                placeholder="e.g. NextJS App Redesign Estimate"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">Detailed Requirements Specs</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full text-xs font-sans bg-slate-50 border border-slate-205 rounded-xl p-3.5 text-slate-850 focus:outline-hidden"
                placeholder="Describe scope, targeted timelines, styling wishes, and standard deliverables..."
              />
            </div>

            {/* Error messaging bar */}
            {formErr && (
              <div className="flex items-center gap-2 p-3 rounded-lg text-rose-700 bg-rose-50 border border-rose-100 text-xs font-medium animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formErr}</span>
              </div>
            )}

            {/* Success message bar */}
            {successMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg text-emerald-700 bg-emerald-50 border border-emerald-100 text-xs font-medium animate-fade-in">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-xl text-xs transition-all shadow-md cursor-pointer ${isSubmitting ? 'bg-indigo-450 opacity-80 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-97'}`}
              id="submit-contact"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending inquiry via SMTP...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Secure Message</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
