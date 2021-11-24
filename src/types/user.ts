export interface User {
    _id: any;
    email: string;
    password: string;
    role: string;
    favourites: string [];
    
    [key: string]: any;
}

export interface UsersList {
    items: [ item: User ];
    total: number;
}