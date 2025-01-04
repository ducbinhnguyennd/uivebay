const handleDateClick = (day, setActiveDate) => {
  setActiveDate(day)
}

const toggleDetails = (
  index,
  flight,
  setVisibleDetailIndex,
  setSelectedFlight,
  visibleDetailIndex
) => {
  setVisibleDetailIndex(visibleDetailIndex === index ? null : index)
  setSelectedFlight(flight)
}

const getAirlineImage = (airlineCode, hangmaybay) => {
  const airline = hangmaybay.find(h => h.mahangmaybay === airlineCode)
  return airline ? airline.image : ''
}

const getAirlineName = (airlineCode, hangmaybay) => {
  const airline = hangmaybay.find(h => h.mahangmaybay === airlineCode)
  return airline ? airline.name : ''
}

const HandelTonggia = (price, phantrams) => {
  const gia =
    (price * phantrams[0].phantram) / 100 +
    (((price * phantrams[0].phantram) / 100) * 30) / 100
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
