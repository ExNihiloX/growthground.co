'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface LessonQuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export function LessonQuiz({ questions, onComplete }: LessonQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setSubmitted(true);
    
    // If all answers are correct, mark the lesson as complete
    if (correctAnswers === questions.length) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const isAnswered = (questionId: string) => {
    return !!answers[questionId];
  };

  const isAllAnswered = questions.every(q => isAnswered(q.id));

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Quiz</h2>
      
      {questions.map((question) => (
        <Card key={question.id} className="border border-gray-200">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option;
                const isCorrect = option === question.correctAnswer;
                const showCorrectFeedback = submitted && isCorrect;
                const showIncorrectFeedback = submitted && isSelected && !isCorrect;
                
                return (
                  <div 
                    key={option} 
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50 border border-gray-200'
                    } ${showCorrectFeedback ? 'bg-green-50 border-green-200' : ''}
                      ${showIncorrectFeedback ? 'bg-red-50 border-red-200' : ''}
                    `}
                    onClick={() => !submitted && handleSelectAnswer(question.id, option)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span>{option}</span>
                    </div>
                    
                    {showCorrectFeedback && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {showIncorrectFeedback && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {submitted ? (
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="font-medium">
            You scored {score} out of {questions.length}!
          </p>
          {score === questions.length ? (
            <p className="text-green-600 mt-2">Perfect score! Completing lesson...</p>
          ) : (
            <Button 
              onClick={() => setSubmitted(false)}
              className="mt-3"
              variant="outline"
            >
              Try Again
            </Button>
          )}
        </div>
      ) : (
        <Button 
          className="w-full"
          onClick={handleSubmit}
          disabled={!isAllAnswered}
        >
          Submit
        </Button>
      )}
    </div>
  );
}
