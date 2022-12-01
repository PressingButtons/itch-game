export function Lerp(start, end,  amount) {
    return (1 - amount) * start + amount * end;
}