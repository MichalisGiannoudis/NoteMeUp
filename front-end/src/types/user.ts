export interface User {
    email: string;
    firstname: string;
    lastname: string;
    userName: string;
    address?: string;
    telephone?: string | null;
    theme?: 'light' | 'dark';
    profilePicture?: string;
}