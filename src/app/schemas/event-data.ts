import { LocationData } from './location-data';
import { Guest } from './guest';

export interface EventData {
    id?: number,
    title?: string,
    location?: LocationData,
    email?: string,
    description?: string,
    startDate?: Date,
    startTime?: Date,
    endDate?: Date,
    endTime?: Date,
    guests?: Array<Guest>

}
