export const paginate = (data: any[], limit?: number, pageNo?: number) => {
    if(!limit || !pageNo) {
        return data;
    }
    const to = pageNo * limit;
    const from = to - limit;

    return data.slice(from, to);
}