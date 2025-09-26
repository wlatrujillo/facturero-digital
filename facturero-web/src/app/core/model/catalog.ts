export class Catalog {
    _id?: string;
    name: string;
    active: boolean;
    items: [{ code: string, value: string }];
}
