export interface MovieQuery {
    filter: string[];
    sortOrder: string;
    sortBy: string;
    limit: number;
    page: number;
}

export interface Movie {
    [index: string]: any;
}

export interface MoviesList {
    items: {
        [key: string]: Movie
    };
    total: number;
}