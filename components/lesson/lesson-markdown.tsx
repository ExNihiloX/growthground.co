'use client';

import React from 'react';

interface LessonMarkdownProps {
  content: string;
}

export function LessonMarkdown({ content }: LessonMarkdownProps) {
  return (
    <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
