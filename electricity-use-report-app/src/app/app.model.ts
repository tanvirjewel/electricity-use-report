export class Building {
    constructor(
        public Id?: number,
        public Name?: string,
        public Location?: string
    ) {
    }
}

export class DataObject {
    constructor(
        public Id?: number,
        public Name?: string
    ) {
    }
}

export class DataField {
    constructor(
        public Id?: number,
        public Name?: string
    ) {
    }
}

export class RequestModel {
    constructor(
        public buildingId?: number,
        public objectId?: number,
        public datafieldId?: number,
        public startDate?: any,
        public endDate?: any
    ) {
    }
}