export class Catalog {
    _id?: string;
    name: string;
    description?: string;
    active: boolean;
    items: [{ code: string, value: string }];
}
