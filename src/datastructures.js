export class Access {
    constructor() {
        this.elevators = -1;
        this.entrances = "";
    }    
}

export class Room {
    constructor(building, num) {
        this.number = num;
        this.building = building;
        this.floor = "";
        this.type = "";
        this.size = "";
    }
}

export class Building {
    constructor(name) {
        this.name = name;
        this.rooms = [];
        this.accessibility = Access();
        this.otherinfo = [];
    }
}