export interface NOTES {
  id: number;
  text: string;
}

export interface ChatMessage {
  type: 'user' | 'model';
  text: string;
}

export enum View {
  NOTES,
  CHAT,
}

export enum ViewAccess {
  LOGIN,
  SIGNUP,
}

export const LIMITE_CARACTERES: number = 300;
