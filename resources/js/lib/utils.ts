import { type ClassValue, clsx } from 'clsx';
import { differenceInCalendarDays } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export function calculateRentalDays(from: Date, to: Date) {
    return from && to ? differenceInCalendarDays(to, from) + 1 : 1;
}
