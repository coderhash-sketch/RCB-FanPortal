
import React, { useState, useEffect } from 'react';
import { generateTriviaQuestion } from '../services/geminiService';
import { QuizQuestion } from '../types';

export const TriviaZone: React.FC = () => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [boldPoints, setBoldPoints] = useState(1200);

  const loadQuestion = async () => {
    setLoading(true);
    const q = await generateTriviaQuestion();
    setQuestion(q);
    setLoading(false);
    setSelected(null);
    setShowResult(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === question?.answer) {
      setBoldPoints(prev => prev + 50);
    }
  };

  return (
    <div id="play" className="max-w-4xl mx-auto p-8 bg-[#1a1a1a] rounded-3xl border-2 border-red-600 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 bg-red-600 text-white font-black rounded-bl-2xl">
        BOLD POINTS: {boldPoints}
      </div>

      <h2 className="text-4xl font-black font-oswald mb-8 italic tracking-tighter">TRIVIA ZONE</h2>
      
      {loading ? (
        <div className="py-20 text-center animate-pulse">Consulting the archives...</div>
      ) : question && (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold leading-tight">{question.question}</h3>
          <div className="grid gap-4">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`p-5 text-left rounded-xl border-2 transition-all font-bold uppercase tracking-wide
                  ${showResult 
                    ? idx === question.answer 
                      ? 'bg-green-600 border-green-400' 
                      : idx === selected 
                        ? 'bg-red-600 border-red-400' 
                        : 'bg-white/5 border-transparent opacity-30'
                    : 'bg-white/5 border-white/10 hover:border-[#D1AB3E] hover:bg-white/10'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="mt-8 flex justify-between items-center">
              <p className="text-gold font-black italic">
                {selected === question.answer ? '✓ EXCELLENT! +50 Points' : '✗ Tough luck! Focus on the game.'}
              </p>
              <button onClick={loadQuestion} className="bg-white text-black font-black px-6 py-2 rounded-full uppercase text-sm">
                Next Question
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
