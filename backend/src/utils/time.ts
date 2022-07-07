import { format } from "date-fns"

export function daysToMin(days: number) {
  return days * hrsToMin(24)
}

export function hrsToMin(hrs: number) {
  return hrs * 60
}

export function makeDateKey(date: Date) {
  return format(date, "yyyy-MM-dd")
}
