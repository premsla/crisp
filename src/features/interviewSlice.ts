import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  question: string;
  difficulty: Difficulty;
  timeLimit: number;
  answer?: string;
  score?: number;
  isAnswered: boolean;
  timeRemaining: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  questions: Question[];
  currentQuestionIndex: number;
  totalScore: number;
  summary: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface InterviewState {
  candidates: Candidate[];
}

const initialState: InterviewState = {
  candidates: [],
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    updateQuestion: (
      state,
      action: PayloadAction<{ candidateId: string; questionId: string; updates: Partial<Question> }>
    ) => {
      const { candidateId, questionId, updates } = action.payload;
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (!candidate) return;
      const q = candidate.questions.find(q => q.id === questionId);
      if (!q) return;
      Object.assign(q, updates);
    },
  },
});

export const { updateQuestion } = interviewSlice.actions;
export default interviewSlice.reducer;
