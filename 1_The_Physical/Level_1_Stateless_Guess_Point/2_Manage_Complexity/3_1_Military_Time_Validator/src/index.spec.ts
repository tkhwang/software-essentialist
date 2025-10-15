import { MilitaryTimeValidator } from "./military-time-validator";

describe("military time validator", () => {
    const invalidCases = [
        { input: "", reason: "입력이 비어 있음" },
        { input: "25:00 - 12:23", reason: "시작 시간이 24시 이상" },
        { input: "22:10 - 22:10", reason: "시작과 종료가 동일" },
        { input: "22:30 - 22:05", reason: "종료가 시작보다 빠름" },
        { input: "08:70 - 09:00", reason: "분이 59를 초과" },
        { input: "08:00 / 09:00", reason: "구분자가 잘못됨" },
        { input: "08:00-", reason: "종료 시간이 없음" },
        { input: "09:30-10:00", reason: "포맷이 잘못 되어 있음." },
    ] as const;

    const validCases = [
        { input: "01:12 - 14:32" },
        { input: "00:00 - 00:01" },
        { input: "22:00 - 23:12" },
    ] as const;

    describe("For invalid cases", () => {
        it.each(invalidCases)('입력 "$input" ($reason) 는 false를 반환한다', ({ input }) => {
            const result = MilitaryTimeValidator.validate(input);
            expect(result).toBe(false);
        });
    });

    describe("For valid cases", () => {
        it.each(validCases)('입력 "$input" 는 true를 반환한다', ({ input }) => {
            const result = MilitaryTimeValidator.validate(input);
            expect(result).toBe(true);
        });
    });
});
