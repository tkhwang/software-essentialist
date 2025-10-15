export class MilitaryTimeValidator {
    private static readonly TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

    static validate(timeText: string): boolean {
        const parts = timeText.split(' - ');
        if (parts.length !== 2) return false;

        const [startTime, endTime] = parts;
        if (!this.isValidTime(startTime) || !this.isValidTime(endTime)) return false;

        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        if (startHour === endHour) return startMinute < endMinute;

        return startHour < endHour;
    }

    private static isValidTime(time: string): boolean {
        return this.TIME_REGEX.test(time);
    }
}
