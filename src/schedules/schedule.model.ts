export interface Schedule {
  id: string;
  scheduledDate: string;
  title: string;
  status: ScheduleStatus;
}

export enum ScheduleStatus {
  INITIATED = 'INITIATED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
