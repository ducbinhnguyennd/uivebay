"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFiltersQT = exports.handleFiltersChangeQT = exports.handleFiltersChange = exports.applyFilters = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var applyFilters = function applyFilters(flights, filters) {
  if (flights) {
    var filteredFlights = _toConsumableArray(flights);

    if (filters.airlines.length > 0) {
      filteredFlights = filteredFlights.filter(function (flight) {
        return filters.airlines.includes(flight.airlineCode);
      });
    }

    if (filters.sortBy === 'price') {
      filteredFlights.sort(function (a, b) {
        var priceA = parseInt(a.price.replace(/,/g, ''), 10);
        var priceB = parseInt(b.price.replace(/,/g, ''), 10);
        return priceA - priceB;
      });
    } else if (filters.sortBy === 'time') {
      filteredFlights.sort(function (a, b) {
        var timeToDate = function timeToDate(time) {
          var _time$split$map = time.split(':').map(Number),
              _time$split$map2 = _slicedToArray(_time$split$map, 2),
              hours = _time$split$map2[0],
              minutes = _time$split$map2[1];

          var date = new Date();
          date.setHours(hours, minutes, 0, 0);
          return date;
        };

        return timeToDate(a.departureTime) - timeToDate(b.departureTime);
      });
    } else if (filters.sortBy === 'airline') {
      filteredFlights.sort(function (a, b) {
        var airlineA = a.airlineCode.toLowerCase();
        var airlineB = b.airlineCode.toLowerCase();
        if (airlineA < airlineB) return -1;
        if (airlineA > airlineB) return 1;
        return 0;
      });
    }

    return filteredFlights;
  }
};

exports.applyFilters = applyFilters;

var handleFiltersChange = function handleFiltersChange(newFilters, setFilters) {
  setFilters(newFilters);
};

exports.handleFiltersChange = handleFiltersChange;

var applyFiltersQT = function applyFiltersQT(flights, filters) {
  var filteredFlights = _toConsumableArray(flights);

  if (filters.airlines.length > 0) {
    filteredFlights = filteredFlights.filter(function (flight) {
      return filters.airlines.includes(flight.airlineCode);
    });
  }

  if (filters.sortBy === 'price') {
    filteredFlights.sort(function (a, b) {
      var priceA = a.price;
      var priceB = b.price;
      return priceA - priceB;
    });
  } else if (filters.sortBy === 'time') {
    filteredFlights.sort(function (a, b) {
      var timeToDate = function timeToDate(time) {
        var _time$split$map3 = time.split(':').map(Number),
            _time$split$map4 = _slicedToArray(_time$split$map3, 2),
            hours = _time$split$map4[0],
            minutes = _time$split$map4[1];

        var date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      };

      return timeToDate(a.outbound.departureTime) - timeToDate(b.outbound.departureTime);
    });
  } else if (filters.sortBy === 'airline') {
    filteredFlights.sort(function (a, b) {
      var airlineA = a.airlineCode.toLowerCase();
      var airlineB = b.airlineCode.toLowerCase();
      if (airlineA < airlineB) return -1;
      if (airlineA > airlineB) return 1;
      return 0;
    });
  }

  return filteredFlights;
};

exports.applyFiltersQT = applyFiltersQT;

var handleFiltersChangeQT = function handleFiltersChangeQT(newFilters, setFilters) {
  setFilters(newFilters);
};

exports.handleFiltersChangeQT = handleFiltersChangeQT;