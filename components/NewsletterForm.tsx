'use client';

import React, { useState } from 'react';
import { Mail, Check, AlertCircle, ArrowRight } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (input: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email format (e.g. name@domain.com).');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section aria-labelledby="newsletter-heading" className="bg-canvas-strong border-t border-hairline py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <span className="text-badge font-semibold tracking-wider uppercase text-forest">The Dispatch</span>
        <h2 id="newsletter-heading" className="text-xl sm:text-2xl lg:text-display-lg font-bold text-ink">
          Receive notices of rare kiln runs & studio visits.
        </h2>
        <p className="text-body-sm text-ink-muted max-w-lg mx-auto leading-relaxed">
          Published fortnightly. No promotional spam or simulated flash sales — only thoughtful stories on materials, techniques, and newly onboarded workshops.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            className="p-4 bg-sage-light/60 border border-sage rounded-sm max-w-md mx-auto flex items-center justify-center gap-2 text-title-sm text-ink font-medium"
          >
            <Check size={18} className="text-forest shrink-0" />
            <span>Thank you for subscribing. (Demo feedback: email confirmed).</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto space-y-3">
            <div className="relative flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  placeholder="Enter your email address..."
                  disabled={status === 'loading'}
                  className={`w-full h-11 pl-10 pr-4 bg-canvas border rounded-sm text-body-sm text-ink placeholder:text-ink-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                    status === 'error' ? 'border-vermilion' : 'border-hairline hover:border-hairline-strong'
                  }`}
                />
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-11 px-6 bg-forest hover:bg-forest-hover disabled:bg-forest-disabled text-white text-title-sm font-semibold rounded-sm transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                {status !== 'loading' && <ArrowRight size={16} />}
              </button>
            </div>

            {status === 'error' && (
              <div
                id="newsletter-error"
                role="alert"
                className="flex items-center gap-1.5 text-caption text-vermilion justify-center font-medium"
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-caption text-ink-muted">
              We respect your attention. Unsubscribe with one click anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
