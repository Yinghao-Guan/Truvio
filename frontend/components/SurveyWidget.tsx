'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ClipboardList, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { track } from '@vercel/analytics';
import { translations, Language } from '../translations';

const DISMISSED_KEY = 'veru_survey_nudge_dismissed';
const COMPLETED_KEY = 'veru_survey_completed';

type Step = 'nudge' | 'survey' | 'thanks';

interface Props {
  lang: Language;
}

export default function SurveyWidget({ lang }: Props) {
  const t = translations[lang];

  const [step, setStep] = useState<Step | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | string[])[]>(['', [], '', '']);
  const [otherText, setOtherText] = useState<string[]>(['', '', '', '']);

  const questions = [
    { text: t.surveyQ1, options: t.surveyQ1Options, type: 'single' as const, maxSelect: 1 },
    { text: t.surveyQ2, options: t.surveyQ2Options, type: 'multi' as const, maxSelect: 2 },
    { text: t.surveyQ3, options: t.surveyQ3Options, type: 'single' as const, maxSelect: 1 },
    { text: t.surveyQ4, options: t.surveyQ4Options, type: 'single' as const, maxSelect: 1 },
  ];

  useEffect(() => {
    const completed = localStorage.getItem(COMPLETED_KEY);
    if (completed) return;
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) return;
    const timer = setTimeout(() => setShowNudge(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismissNudge = useCallback(() => {
    setShowNudge(false);
    localStorage.setItem(DISMISSED_KEY, '1');
    track('veru_survey_nudge_dismissed');
  }, []);

  const openSurvey = useCallback(() => {
    setShowNudge(false);
    setStep('survey');
    setQuestionIndex(0);
    track('veru_survey_opened');
  }, []);

  const handleFloatClick = () => {
    const completed = localStorage.getItem(COMPLETED_KEY);
    if (completed) {
      setStep('thanks');
      return;
    }
    if (step === 'survey') return;
    openSurvey();
  };

  const currentQ = questions[questionIndex];
  const currentAnswer = answers[questionIndex];
  const lastOptionIndex = currentQ?.options.length - 1;
  const isOtherOption = (idx: number) => idx === lastOptionIndex && currentQ?.options[idx].toLowerCase().startsWith('oth');

  const hasAnswer = () => {
    if (currentQ.type === 'single') return (currentAnswer as string) !== '';
    return (currentAnswer as string[]).length > 0;
  };

  const toggleSingle = (option: string) => {
    setAnswers(prev => {
      const copy = [...prev];
      copy[questionIndex] = option;
      return copy;
    });
  };

  const toggleMulti = (option: string) => {
    setAnswers(prev => {
      const copy = [...prev];
      const current = copy[questionIndex] as string[];
      if (current.includes(option)) {
        copy[questionIndex] = current.filter(o => o !== option);
      } else if (current.length < currentQ.maxSelect) {
        copy[questionIndex] = [...current, option];
      }
      return copy;
    });
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(q => q + 1);
    } else {
      submitSurvey();
    }
  };

  const submitSurvey = () => {
    const payload: Record<string, string> = {};
    answers.forEach((ans, i) => { payload[`q${i + 1}`] = Array.isArray(ans) ? ans.join(', ') : ans; });
    otherText.forEach((txt, i) => { if (txt) payload[`q${i + 1}_other`] = txt; });
    track('veru_survey_submitted', payload);
    localStorage.setItem(COMPLETED_KEY, '1');
    setStep('thanks');
  };

  const progressLabel = t.surveyProgress
    .replace('{current}', String(questionIndex + 1))
    .replace('{total}', String(questions.length));

  const maxLabel = t.surveySelectMax.replace('{max}', String(currentQ?.maxSelect ?? 1));

  return (
    <>
      {/* Nudge bubble */}
      {showNudge && step == null && (
        <div className="fixed bottom-24 right-5 z-40 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 transition-all duration-300">
          <button
            onClick={dismissNudge}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="font-semibold text-slate-800 text-sm mb-1 pr-5">{t.surveyNudgeTitle}</p>
          <p className="text-slate-500 text-xs leading-relaxed mb-3">{t.surveyNudgeDesc}</p>
          <div className="flex gap-2">
            <button
              onClick={openSurvey}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
            >
              {t.surveyNudgeCta}
            </button>
            <button
              onClick={dismissNudge}
              className="text-slate-400 hover:text-slate-600 text-xs py-2 px-3 rounded-lg transition-colors border border-slate-200 hover:border-slate-300"
            >
              {t.surveyNudgeDismiss}
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleFloatClick}
        title={t.surveyTitle}
        className="fixed bottom-5 right-5 z-40 w-13 h-13 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all active:scale-95 group"
        style={{ width: '52px', height: '52px' }}
      >
        <ClipboardList className="w-5 h-5" />
      </button>

      {/* Survey modal */}
      {(step === 'survey' || step === 'thanks') && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => step === 'thanks' && setStep(null)}
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" aria-hidden />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg">{t.surveyTitle}</h2>
                  <p className="text-blue-100 text-xs mt-0.5">{t.surveySubtitle}</p>
                </div>
                <button
                  onClick={() => setStep(null)}
                  className="text-blue-200 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {step === 'survey' && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-blue-200 mb-1.5">
                    <span>{progressLabel}</span>
                    <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-blue-400/30 rounded-full h-1.5">
                    <div
                      className="bg-white rounded-full h-1.5 transition-all duration-300"
                      style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {step === 'thanks' ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{t.surveyThanksTitle}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.surveyThanksDesc}</p>
                  <button
                    onClick={() => setStep(null)}
                    className="mt-6 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {t.surveyClose}
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{currentQ.text}</p>
                  {currentQ.type === 'multi' && (
                    <p className="text-xs text-slate-400 mb-3">{maxLabel}</p>
                  )}

                  <div className="space-y-2 mt-3">
                    {currentQ.options.map((option, idx) => {
                      const isOther = isOtherOption(idx);
                      const selected = currentQ.type === 'single'
                        ? (currentAnswer as string) === option
                        : (currentAnswer as string[]).includes(option);
                      const atMax = currentQ.type === 'multi' &&
                        (currentAnswer as string[]).length >= currentQ.maxSelect &&
                        !selected;

                      return (
                        <div key={idx}>
                          <button
                            onClick={() => currentQ.type === 'single' ? toggleSingle(option) : toggleMulti(option)}
                            disabled={atMax}
                            className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all
                              ${selected
                                ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                                : atMax
                                  ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                                  : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-slate-600'}
                            `}
                          >
                            <span className={`inline-block w-4 h-4 rounded-full border mr-2.5 align-middle flex-shrink-0 transition-all
                              ${selected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}
                              ${currentQ.type === 'multi' ? 'rounded-md' : 'rounded-full'}
                            `} style={{ display: 'inline-block' }} />
                            {option}
                          </button>
                          {isOther && selected && (
                            <input
                              type="text"
                              value={otherText[questionIndex]}
                              onChange={e => {
                                const copy = [...otherText];
                                copy[questionIndex] = e.target.value;
                                setOtherText(copy);
                              }}
                              placeholder={t.surveyOtherPlaceholder}
                              className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-slate-700"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setQuestionIndex(q => q - 1)}
                      disabled={questionIndex === 0}
                      className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 disabled:opacity-0 disabled:pointer-events-none transition-colors font-medium"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t.surveyBack}
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!hasAnswer()}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95"
                    >
                      {questionIndex < questions.length - 1 ? t.surveyNext : t.surveySubmit}
                      {questionIndex < questions.length - 1 && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
