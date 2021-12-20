export const dateBuilder = (date, isFull) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let dayName = days[date.getDay()];
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return (isFull ? `${hours}:${minutes} ${dayName}, ${year}-${month}-${day}` : `${year}-${month}-${day}`);
  }