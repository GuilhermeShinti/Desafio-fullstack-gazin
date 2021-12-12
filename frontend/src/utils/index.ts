const roundUp = function (num: number, precision: number): number {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
}

export { roundUp }