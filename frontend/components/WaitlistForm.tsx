'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Loader2, CheckCircle, X, Sparkles } from 'lucide-react';
import { track } from '@vercel/analytics';

type State = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

interface Props {
  location?: string;
}

export default function WaitlistForm({ location = 'unknown' }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track impression once when button enters the viewport
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track('veru_write_cta_impression', { location });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [location]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      if (state !== 'success' && state !== 'duplicate') {
        setEmail('');
        setState('idle');
        setMessage('');
      }
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || state === 'loading') return;

    setState('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setState('success');
        setMessage(data.message);
      } else if (res.status === 200) {
        setState('duplicate');
        setMessage(data.message);
      } else {
        setState('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setState('error');
      setMessage('Unable to connect. Please try again.');
    }
  };

  const done = state === 'success' || state === 'duplicate';

  return (
    <>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={() => {
          track('veru_write_cta_click', { location });
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap"
      >
        Request early access
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Backdrop + modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" aria-hidden />

          {/* Panel */}
          <div
            className="relative bg-slate-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-8 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-white/5"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glow decoration */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" aria-hidden />

            {done ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{message}</h3>
                <p className="text-slate-400 text-sm">
                  We&apos;ll reach out as soon as Veru Write is ready for early access.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 text-sm text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Coming soon — Veru Write
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Get early access</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-7">
                  Leave your email and we&apos;ll notify you the moment Veru Write opens up.
                  No spam, just one email when it&apos;s ready.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    ref={inputRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
                    placeholder="you@university.edu"
                    className="w-full bg-white/5 border border-white/15 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />

                  {state === 'error' && (
                    <p className="text-rose-400 text-xs">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-60 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                  >
                    {state === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Notify me
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
