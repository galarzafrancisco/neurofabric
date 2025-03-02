export interface QuestionHandler {
  (question: string, history?: string[]): Promise<string>;
}
