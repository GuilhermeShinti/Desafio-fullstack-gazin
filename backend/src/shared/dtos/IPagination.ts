interface IPagination<T> {
    data: T[],
    total: number
}

export { IPagination };