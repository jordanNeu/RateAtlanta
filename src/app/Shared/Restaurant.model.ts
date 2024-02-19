export class Restaurant {
    editing: boolean = false;
    constructor (public name: string, public location: string, public description: string, public rating: number) {}
}