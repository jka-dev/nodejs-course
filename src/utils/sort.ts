const compare = (order: string, creteria: any) => (first:any, second:any) => {
    if (first[creteria] > second[creteria]) return order === 'asc' ? 1 : -1;
    if (first[creteria] < second[creteria]) return order === 'asc' ? -1 : 1;
    return 0;
}

export const sort = (data: any[], sortOrder: string, sortCreteria: string) => {
    if (sortOrder === undefined && sortCreteria === undefined) {
        return data;
    }
    return data.sort(compare(sortOrder, sortCreteria))
}