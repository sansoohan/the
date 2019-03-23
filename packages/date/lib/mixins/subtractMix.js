/**
 * Mixin for subtract
 * @private
 * @memberOf module:@the-/date
 * @function subtractMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends subtractMix */
function subtractMix (Class) {
  const units = [ 'years', 'year', 'quarters', 'quarter', 'months', 'month', 'weeks', 'week', 'days', 'day', 'hours', 'hour', 'minutes', 'minute', 'seconds', 'second', 'milliseconds', 'millisecond' ]

  /** @class SubtractMixed */
  class SubtractMixed extends Class {
    /**
     * Date after
     * @param {number} amount to subtract
     * @param {string} unit - Unit to subtract
     * @see https://momentjs.com/docs/#/manipulating/subtract/
     * @returns {TheDate}
     */
    subtract (amount, unit = 'milliseconds') {
      unit = this.normalizeMomentUnits(unit)
      const unknown = !units.includes(unit)
      if (unknown) {
        throw new Error(`[TheDate] Unsupported unit: ${unit}`)
      }
      const Constructor = this.constructor
      const moment = this.toMoment()
      return new Constructor(moment.subtract(amount, unit))
    }

    /**
     * Subtract years
     * @param {number} years to subtract
     * @returns {TheDate}
     */
    subtractYears (years) {
      return this.subtract(years, 'years')
    }

    /**
     * Subtract year
     * @param {number} year to subtract
     * @returns {TheDate}
     */
    subtractYear (year) {
      return this.subtract(year, 'year')
    }

    /**
     * Subtract quarters
     * @param {number} quarters to subtract
     * @returns {TheDate}
     */
    subtractQuarters (quarters) {
      return this.subtract(quarters, 'quarters')
    }

    /**
     * Subtract quarter
     * @param {number} quarter to subtract
     * @returns {TheDate}
     */
    subtractQuarter (quarter) {
      return this.subtract(quarter, 'quarter')
    }

    /**
     * Subtract months
     * @param {number} months to subtract
     * @returns {TheDate}
     */
    subtractMonths (months) {
      return this.subtract(months, 'months')
    }

    /**
     * Subtract month
     * @param {number} month to subtract
     * @returns {TheDate}
     */
    subtractMonth (month) {
      return this.subtract(month, 'month')
    }

    /**
     * Subtract weeks
     * @param {number} weeks to subtract
     * @returns {TheDate}
     */
    subtractWeeks (weeks) {
      return this.subtract(weeks, 'weeks')
    }

    /**
     * Subtract week
     * @param {number} week to subtract
     * @returns {TheDate}
     */
    subtractWeek (week) {
      return this.subtract(week, 'week')
    }

    /**
     * Subtract days
     * @param {number} days to subtract
     * @returns {TheDate}
     */
    subtractDays (days) {
      return this.subtract(days, 'days')
    }

    /**
     * Subtract day
     * @param {number} day to subtract
     * @returns {TheDate}
     */
    subtractDay (day) {
      return this.subtract(day, 'day')
    }

    /**
     * Subtract hours
     * @param {number} hours to subtract
     * @returns {TheDate}
     */
    subtractHours (hours) {
      return this.subtract(hours, 'hours')
    }

    /**
     * Subtract hour
     * @param {number} hour to subtract
     * @returns {TheDate}
     */
    subtractHour (hour) {
      return this.subtract(hour, 'hour')
    }

    /**
     * Subtract minutes
     * @param {number} minutes to subtract
     * @returns {TheDate}
     */
    subtractMinutes (minutes) {
      return this.subtract(minutes, 'minutes')
    }

    /**
     * Subtract minute
     * @param {number} minute to subtract
     * @returns {TheDate}
     */
    subtractMinute (minute) {
      return this.subtract(minute, 'minute')
    }

    /**
     * Subtract seconds
     * @param {number} seconds to subtract
     * @returns {TheDate}
     */
    subtractSeconds (seconds) {
      return this.subtract(seconds, 'seconds')
    }

    /**
     * Subtract second
     * @param {number} second to subtract
     * @returns {TheDate}
     */
    subtractSecond (second) {
      return this.subtract(second, 'second')
    }

    /**
     * Subtract milliseconds
     * @param {number} milliseconds to subtract
     * @returns {TheDate}
     */
    subtractMilliseconds (milliseconds) {
      return this.subtract(milliseconds, 'milliseconds')
    }

    /**
     * Subtract millisecond
     * @param {number} millisecond to subtract
     * @returns {TheDate}
     */
    subtractMillisecond (millisecond) {
      return this.subtract(millisecond, 'millisecond')
    }


  }
  return SubtractMixed
}

module.exports = subtractMix
