const handleDateClick = (day, setActiveDate) => {
  setActiveDate(day)
}
const toggleDetails = (
  currentIndex,
  selectedFlight,
  setVisibleDetailIndex,
  setSelectedFlight,
  currentVisibleIndex,
  setflightdata
) => {
  setVisibleDetailIndex(null)
  setSelectedFlight(null)

  setTimeout(() => {
    setVisibleDetailIndex(
      currentVisibleIndex === currentIndex ? null : currentIndex
    )
    setSelectedFlight(selectedFlight)
    setflightdata(selectedFlight)
  }, 0)
}
const getAirlineImage = (airlineCode, hangmaybay) => {
  const airline = hangmaybay.find(h => h.mahangmaybay === airlineCode)
  return airline ? airline.image : ''
}

const getAirlineName = (airlineCode, hangmaybay) => {
  const airline = hangmaybay.find(h => h.mahangmaybay === airlineCode)
  return airline ? airline.name : ''
}

const HandelTonggia = (price, item) => {
  const gia = price * item.songuoi + ((price * 30) / 100) * item.songuoi
  return gia
}

const calculateDuration = (departureTime, arrivalTime) => {
  const [depHours, depMinutes] = departureTime.split(':').map(Number)
  const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number)

  const depTotalMinutes = depHours * 60 + depMinutes
  const arrTotalMinutes = arrHours * 60 + arrMinutes

  let durationMinutes = arrTotalMinutes - depTotalMinutes
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60
  }

  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60

  return `${hours} giờ ${minutes} phút`
}

export {
  handleDateClick,
  toggleDetails,
  getAirlineImage,
  getAirlineName,
  HandelTonggia,
  calculateDuration
}
