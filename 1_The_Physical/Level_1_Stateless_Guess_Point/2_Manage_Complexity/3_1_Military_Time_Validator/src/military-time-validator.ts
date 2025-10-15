
export class MilitaryTimeValidator {
    private static readonly RANGE_SEPARATOR = /\s*-\s*/;
    private static readonly TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;


    static validate(timeText: string): boolean {
        const getStartTime = (text: string) => text.split(' - ')[0];
        const getEndTime = (text: string) => text.split(' - ')[1];
        const getHour = (text: string) => text.split(":")[0];
        const getMinute = (text: string) => text.split(":")[1];

        // check given timeText is in correct format
        if (timeText === "") return false;
        if (timeText.indexOf(" - ") === -1) return false;
        if (getStartTime(timeText).indexOf(':') === -1) return false;
        if (getEndTime(timeText).indexOf(':') === -1) return false;

        // check time is in correct format
        const startTime = getStartTime(timeText);
        const endTime = getEndTime(timeText);
        if (!this.isValidTime(startTime) || !this.isValidTime(endTime)) return false;

        const startTimeHour = getHour(startTime);
        const startTimeMinute = getMinute(startTime);
        const endTimeHour = getHour(endTime);
        const endTimeMinute = getMinute(endTime);

        if (startTimeHour === endTimeHour) {
            return startTimeMinute < endTimeMinute;
        } else {
            return startTimeHour < endTimeHour;
        }

        return true;
    }

    private static isValidTime(time: string): boolean {
        return this.TIME_REGEX.test(time);
    }
}
