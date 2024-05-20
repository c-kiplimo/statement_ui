type SingleAccountsSchedule ={
    id?: number,
    accountId?: string,
    template: string,
    frequency: string,
    accountName?: string,
    fileFormat?: string,
    lastRun?: string,
    startTime: string,
    status?: string,
    createdAt?: string,
    default?: boolean
  }