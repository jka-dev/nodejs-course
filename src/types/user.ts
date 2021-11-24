export interface User {
    id: any;
    email: string;
    password: string;
    role: string;
    favourites: string [];
}

export interface UsersList {
    items: [ item: User ];
    total: number;
}