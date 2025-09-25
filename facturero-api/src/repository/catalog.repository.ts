import { ICatalog, Catalog } from "../model/catalog";
import RepositoryBase from "./base.repository";

class CatalogRepository extends RepositoryBase<ICatalog> {
    constructor() {
        super(Catalog);
    }

    insertMany(items: ICatalog[]): Promise<ICatalog[]> {
        return Catalog.insertMany(items);
    }
    
    retrieveWithCriteria(criteria: any) {

        return Catalog.find(criteria);

    }
}

Object.seal(CatalogRepository);
export default CatalogRepository;
