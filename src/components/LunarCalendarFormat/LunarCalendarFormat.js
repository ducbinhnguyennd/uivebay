import { solarToLunar } from 'lunar-calendar'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export function LunarCalendarFormat (isoDate) {
  if (!isoDate) return ''

  const date = new Date(isoDate)

  const formattedDate = format(date, 'EEEE dd/MM/yyyy', { locale: vi })

  const lunar = solarToLunar(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )

  return `${formattedDate}, tức ngày ${lunar.lunarDay} âm lịch`
}

export function CalendarFormat (isoDate) {
  if (!isoDate) return ''

  const date = new Date(isoDate)

  const formattedDate = format(date, 'EEEE dd/MM/yyyy', { locale: vi })

  return `${formattedDate}`
}

export const formatDate = isoDate => {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

export const getSurroundingDates = dateString => {
  const givenDate = new Date(dateString) // Tạo đối tượng Date từ chuỗi
  const previousTwoDays = []
  const nextTwoDays = []

  // Lấy 2 ngày trước
  for (let i = 1; i <= 2; i++) {
    const newDate = new Date(givenDate)
    newDate.setDate(newDate.getDate() - i)
    previousTwoDays.push(newDate.toISOString().split('T')[0])
  }

  // Lấy 2 ngày sau
  for (let i = 1; i <= 2; i++) {
    const newDate = new Date(givenDate)
    newDate.setDate(newDate.getDate() + i)
    nextTwoDays.push(newDate.toISOString().split('T')[0])
  }

  return { previousTwoDays, nextTwoDays }
}



export const getSurroundingDateskhuhoinoidia = dateString => {
  const givenDate = new Date(dateString) // Tạo đối tượng Date từ chuỗi
  const previousTwoDays = []
  const nextTwoDays = []

  // Lấy 2 ngày trước
  for (let i = 1; i <= 1; i++) {
    const newDate = new Date(givenDate)
    newDate.setDate(newDate.getDate() - i)
    previousTwoDays.push(newDate.toISOString().split('T')[0])
  }

  // Lấy 2 ngày sau
  for (let i = 1; i <= 1; i++) {
    const newDate = new Date(givenDate)
    newDate.setDate(newDate.getDate() + i)
    nextTwoDays.push(newDate.toISOString().split('T')[0])
  }

  return { previousTwoDays, nextTwoDays }
}

export const getSurroundingDateskhuhoinoidia1 = dateString => {
  const givenDate = new Date(dateString) // Tạo đối tượng Date từ chuỗi
  const previousTwoDays1 = []
  const nextTwoDays1 = []

  // Lấy 2 ngày trước
  for (let i = 1; i <= 1; i++) {
    const newDate = new Date(givenDate)
    newDate.setDate(newDate.getDate() - i)
    previousTwoDays1.push(newDate.toISOString().split('T')[0])
  }

  // Lấy 2 ngày sau
  for (let i = 1; i <= 1; i++) {
    const newDate = new Date(givenDate)
    newDate.setDate(newDate.getDate() + i)
    nextTwoDays1.push(newDate.toISOString().split('T')[0])
  }

  return { previousTwoDays1, nextTwoDays1 }
}


