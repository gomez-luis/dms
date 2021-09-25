

// Process the date to return the list of days starting from the supplied day
function ListDays (date) {
    const GetDates = (startDate, daysToAdd) => {
        let aryDates = [];

        for (let i = 0; i <= daysToAdd; i++) {
            let currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            aryDates.push(DayAsString(currentDate.getDay()));
        }
        return aryDates;
    }

    const DayAsString = (dayIndex) => {
        let weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

        return weekdays[dayIndex];
    }

    let startDate = new Date(date);

    return GetDates(startDate, 6);
}

export default ListDays;