
export const addTimes = (start, duration) => {
    let startSplit = start.split(":")
    let durationSplit = duration.split(":")
    let startHour = Number(startSplit[0]) || 0
    let startMinutes = Number(startSplit[1]) || 0
    let durationHour = Number(durationSplit[0]) || 0
    let durationMinutes = Number(durationSplit[1]) || 0
    let endHour = startHour + durationHour
    let endMinutes = startMinutes + durationMinutes
    if (endMinutes >= 60) {
        endHour += 1
        endMinutes -= 60
    }
    return `${endHour}:${endMinutes}`
}
    
export default addTimes