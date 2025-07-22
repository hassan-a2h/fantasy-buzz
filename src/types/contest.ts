export interface Answer {
  text: string;
  id: string;
}

export interface Question {
  id: number | string;
  question: string;
  answers: string[];
  questionEndDate: string;
  questionEndTime: string;
  source?: string;
  isActive?: boolean;
}

export interface Contest {
  id: number | string;
  name: string;
  image: File | string | null;
  endDate: string;
  endTime: string;
  questions: Question[];
  description?: string;
  status?: "ongoing" | "archived";
  createdAt?: string;
  updatedAt?: string;
}

export interface ContestFormData {
  name: string;
  image: File | null;
  endDate: string;
  endTime: string;
}

export interface ContestValidationErrors {
  contestName?: string;
  endDate?: string;
  endTime?: string;
  questions?: string;
  [key: string]: string | undefined;
}

export interface ContestContextType {
  contests: Contest[];
  addContest: (contest: ContestFormData & { questions: Question[] }) => void;
  updateContest: (id: number | string, contest: Partial<Contest>) => void;
  deleteContest: (id: number | string) => void;
  getOngoingContest: () => Contest | undefined;
  getArchivedContests: () => Contest[];
  updateQuestion: (
    contestId: number | string,
    questionId: number | string,
    updatedQuestion: Partial<Question>
  ) => void;
  deleteQuestion: (
    contestId: number | string,
    questionId: number | string
  ) => void;
  isContestOngoing: (contest: Contest) => boolean;
}

export type TabType = "ongoing" | "archived";

export interface ContestFormProps {
  contest: ContestFormData;
  setContest: React.Dispatch<React.SetStateAction<ContestFormData>>;
  errors: ContestValidationErrors;
}

export interface QuestionsSectionProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  errors: ContestValidationErrors;
  addNewQuestion: () => void;
  handleSubmit: () => void;
}

export interface QuestionFormProps {
  question: Question;
  questionIndex: number;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  errors: ContestValidationErrors;
  isEditable: boolean;
}

export interface SavedQuestionCardProps {
  question: Question;
  questionIndex: number;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export interface ArchivedContestCardProps {
  contest: Contest;
}

export interface OngoingContestProps {
  contest: Contest;
}

export interface OngoingQuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onUpdate: (updatedData: Partial<Question>) => void;
  onDelete: () => void;
}
