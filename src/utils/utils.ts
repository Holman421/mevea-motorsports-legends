export function stylePrize(prize: number): string {
    return prize
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .concat(' Kč');
}
