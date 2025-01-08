 const applyFilters = (flights, filters) => {
  let filteredFlights = [...flights]

  if (filters.airlines.length > 0) {
    filteredFlights = filteredFlights.filter(flight =>
      filters.airlines.includes(flight.airlineCode)
    )
  }

  if (filters.sortBy === 'price') {
    filteredFlights.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/,/g, ''), 10)
      const priceB = parseInt(b.price.replace(/,/g, ''), 10)
      return priceA - priceB
    })
  } else if (filters.sortBy === 'time') {
    filteredFlights.sort((a, b) => {
      const timeToDate = time => {
        const [hours, minutes] = time.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)
        return date
      }

      return timeToDate(a.departureTime) - timeToDate(b.departureTime)
    })
  } else if (filters.sortBy === 'airline') {
    filteredFlights.sort((a, b) => {
      const airlineA = a.airlineCode.toLowerCase()
      const airlineB = b.airlineCode.toLowerCase()
      if (airlineA < airlineB) return -1
      if (airlineA > airlineB) return 1
      return 0
    })
  }

  return filteredFlights
}

 const handleFiltersChange = (newFilters, setFilters) => {
  setFilters(newFilters)
}

const applyFiltersQT = (flights, filters) => {
  let filteredFlights = [...flights]

  if (filters.airlines.length > 0) {
    filteredFlights = filteredFlights.filter(flight =>
      filters.airlines.includes(flight.airlineCode)
    )
  }

  if (filters.sortBy === 'price') {
    filteredFlights.sort((a, b) => {
      const priceA = a.price
      const priceB = b.price
      return priceA - priceB
    })
  } else if (filters.sortBy === 'time') {
    filteredFlights.sort((a, b) => {
      const timeToDate = time => {
        const [hours, minutes] = time.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)
        return date
      }

      return timeToDate(a.outbound.departureTime) - timeToDate(b.outbound.departureTime)
    })
  } else if (filters.sortBy === 'airline') {
    filteredFlights.sort((a, b) => {
      const airlineA = a.airlineCode.toLowerCase()
      const airlineB = b.airlineCode.toLowerCase()
      if (airlineA < airlineB) return -1
      if (airlineA > airlineB) return 1
      return 0
    })
  }

  return filteredFlights
}

const handleFiltersChangeQT = (newFilters, setFilters) => {
  setFilters(newFilters)
}


export { applyFilters, handleFiltersChange,handleFiltersChangeQT,applyFiltersQT }
