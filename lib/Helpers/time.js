import moment from 'moment';

const formatTime = (time) => {
  let allTimeSlots = []
  Object.values(time).forEach(date => date.forEach(timeSlot => allTimeSlots.push(timeSlot)))

  let formattedTimeSlots = [];

  allTimeSlots.forEach((timeSlot, index) => {
    // only show 5 time slots
    if (index < 5) {
      let str = `${moment(timeSlot.startTime).format('YYYY-MM-DD')} from ${moment(timeSlot.startTime).format('HH:mm')} to ${moment(timeSlot.endTime).format('HH:mm')}`
      formattedTimeSlots.push(str)
    } else if (index == 5) {
      formattedTimeSlots.push('...')
    }
  })

  return formattedTimeSlots.join('\n')
}

export {
  formatTime,
}