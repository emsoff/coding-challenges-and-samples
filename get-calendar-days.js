
((start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const currentDate = startDate;

    const calendar = {}
    let calendarWeek = [];

    const firstDay = currentDate.getDay();
    
    let month = Intl.DateTimeFormat('en-US', {month: "long", timeZone: 'GMT'}).format(currentDate)

    if(firstDay <= 6) {
        let i = 0;
        do {
            i = i+1;
            calendarWeek.push(0)
        } while (i <= firstDay)
    }

    while (currentDate < endDate) {
        const nmonth = Intl.DateTimeFormat('en-US', {month: "long", timeZone: 'GMT'}).format(currentDate)
        if(!calendar[nmonth]) calendar[nmonth] = [];
        calendarWeek.push(currentDate.getUTCDate())
        if(calendarWeek.length % 7 === 0) {
            calendar[nmonth].push(calendarWeek)
            calendarWeek = []
        }
        currentDate.setDate(currentDate.getDate()+1);
        if(nmonth != month ) {
            month = nmonth;

        }
    }

    console.log(calendar)

})('2022-01-01', '2022-06-01')
