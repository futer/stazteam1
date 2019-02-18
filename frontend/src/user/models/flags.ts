export interface DisconnectedFlags {
    keepLocal?: boolean;
    accountDeleted?: boolean;
    accountIsBeingDeleted?: boolean;
    accountDisconnected?: boolean;
    error?: string;
}
