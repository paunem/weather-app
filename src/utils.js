export const dateBuilder = (date, isFull) => {
    //let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let dayName = days[date.getDay()];
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return (isFull ? `${hours}:${minutes} ${dayName}, ${year}-${month}-${day}` : `${year}-${month}-${day}`);
  }