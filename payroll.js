function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employee, dateTime) {
    if (!dateTime) throw new Error("Invalid dateTime argument");
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) });
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    if (!dateTime) throw new Error("Invalid dateTime argument");
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
}

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
