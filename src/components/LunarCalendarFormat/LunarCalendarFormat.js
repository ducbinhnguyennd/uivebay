import {  solarToLunar } from 'lunar-calendar'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export function LunarCalendarFormat (isoDate) {
  if (!isoDate) return ''

  const date = new Date(isoDate)

  const formattedDate = format(date, 'EEEE dd/MM/yyyy', { locale: vi })

  const lunar = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate())

  return `${formattedDate}, tức ngày ${lunar.lunarDay} âm lịch`
}

export const formatDate = isoDate => {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}



