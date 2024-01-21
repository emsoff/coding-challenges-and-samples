/*
    Challenge: Imagine you have been given a list of events from multiple systems, and you need to return an array of reconciled events that follow these rules: 
        No two events can overlap in time. An event can start at the same time another event ends.
        If there is a time conflict between events, keep the event that starts earlier.
        If two events start at the same time, keep the one from systema

*/

const events = [
    { id: 3, start: 12, end: 14, system: "systema" },
    { id: 1, start: 10, end: 12, system: "systema" },
    { id: 4, start: 12, end: 13, system: "systemb" },
    { id: 2, start: 11, end: 13, system: "systema" },
    { id: 5, start: 8, end: 9, system: "systema" },
    { id: 6, start: 15, end: 16, system: "systemb" }
]


// Array to hold the scheduled events
let scheduledEvents = [];

// Track the end time of the last added event
let lastEndTime = 0;

// Sort events first by start time, then by system in case of a tie.
events
    .sort((a, b) => {
        if (a.start !== b.start) {
            return a.start - b.start;
        }
        return a.system - b.system;
    })
    .reduce((unique, event) => {
        if (!unique.some(e => e.start === event.start)) {
            unique.push(event);
        }
        return unique;
    }, [])
    .forEach(event => {
        if (event.start >= lastEndTime) {
            scheduledEvents.push(event);
            lastEndTime = event.end;
        }
    });


console.log(scheduledEvents); 
