type DateTimeFormatPartTypes = "day" | "dayPeriod" | "hour" | "literal" | "minute" | "month" | "second" | "timeZoneName" | "year" | "fractionalSecond";
interface DateTimeFormatPart {
    type: DateTimeFormatPartTypes;
    value: string;
}
type TimeZone = "UTC";
interface Options {
    timeZone?: TimeZone;
}
export declare class DateTimeFormatter {
    #private;
    constructor(formatString: string);
    format(date: Date, options?: Options): string;
    formatToParts(string: string): DateTimeFormatPart[];
    partsToDate(parts: DateTimeFormatPart[]): Date;
    parse(string: string): Date;
}
export {};
//# sourceMappingURL=_date_time_formatter.d.ts.map