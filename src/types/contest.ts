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
}

export type TabType = "ongoing" | "archived";
