// type SingleAccountSchedule = {
//     accountId: string,
//     template: string,
//     frequency: string,
//     isDefault: string,
//     accountName: string,
//     lastRun: null,
//     startTime: Date,
//     status: string,
//     createdAt: Date
// }
type SingleAccountSchedule = {
    id?: number;
    accountId: string;
    template: string;
    frequency: string;
    accountName?: string;
    fileFormat: string;
    lastRun?: null | Date;
    startTime: string;
    status?: string;
    createdAt?: Date;
    default?: boolean;
};
