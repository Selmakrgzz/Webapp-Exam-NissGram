export interface User {
  id: number;
  userName: string;
  profilePicture: string; // Align with backend
  firstName?: string; // Optional if not needed in UI
  lastName?: string;
  about?: string;
}
