import moment from 'moment';

const formatTime = (time) => {
  let allTimeSlots = []
  Object.values(time).forEach(date => date.forEach(timeSlot => allTimeSlots.push(timeSlot)))

  let formattedTimeSlots =  allTimeSlots.map((timeSlot, index) => {
    let date = moment(timeSlot.startTime).format('YYYY-MM-DD')
    let startTime = moment(timeSlot.startTime).format('HH:mm')
    let endTime = moment(timeSlot.endTime).format('HH:mm')
    return `${date} from ${startTime} to ${endTime}`
  })

  let result = []; 
  formattedTimeSlots.sort().forEach((timeSlot, index) => {
    // only show 5 time slots
    if (index < 5) {
      result.push(timeSlot)
    } else if (index == 5) {
      result.push('...')
    }
  })

  return result.join('\n')
}

export {
  formatTime,
}