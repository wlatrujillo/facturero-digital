import { Router } from "express";
import ProductController = require("../controller/product.ctrl");
import ProductCategoryController = require("../controller/product.category.ctrl");


export class ProductRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new ProductController();
        let categoryController = new ProductCategoryController();

        this.router.route("/category")
            .get(categoryController.retrieve)
            .post(categoryController.create);

        this.router.route("/category/:_id")
            .get(categoryController.findById)
            .put(categoryController.update)
            .delete(categoryController.delete);

        this.router.route("/")
            .get(controller.retrieve)
            .post(controller.create);

        this.router.route("/:_id")
            .get(controller.findById)
            .put(controller.update)
            .delete(controller.delete);

    }
}