export interface MessageModel {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    pic?: string;
    isBanned?: boolean;
  };
  message: {
    id?: string;
    message: string;
    isMessage: boolean;
    isBanned?: boolean;
  };
}
