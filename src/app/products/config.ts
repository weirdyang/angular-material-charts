export const defaultColor: string = 'horizon';

export const hours: string[] = ['Maintenance', 'Production', 'Downtime', 'Scheduled']

export enum Status {
    Up = "Up",
    Down = "Down",
    Stop = "Off",
}
export interface LightStatus {
    name?: string
    value?: number
}