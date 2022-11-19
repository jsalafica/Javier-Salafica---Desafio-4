import { Router } from "express";
import upload from "../libs/multer.js";

const router = Router();

const products = [];

router
  .route("/")
  .get((req, res) => {
    const response = {
      status: "Ok",
      data: products,
    };

    res.json(response);
  })
  .post(upload.single("thumbnail"), (req, res) => {
    const { title, price } = req.body;
    const image = req.file;
    let newProductId;
    if (products.length == 0) {
      newProductId = 1;
    } else {
      newProductId = products[products.length - 1].id + 1;
    }

    const newProduct = {
      id: newProductId,
      title,
      price,
      thumbnail: `http://localhost:8080/images/${image.originalname}`,
    };
    const response = {
      status: "Created",
      data: newProduct,
    };

    products.push(newProduct);

    res.status(201).json(response);
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;

    const product = products.find((product) => product.id === Number(id));

    if (!product) {
      const response = {
        error: "Producto no encontrado",
      };
      res.status(404).json(response);
    } else {
      res.status(200).json(product);
    }
  })
  .put(upload.single("thumbnail"), (req, res) => {
    let { id } = req.params;
    const image = req.file;
    id = Number(id);

    const { title, price } = req.body;
    const thumbnail = `http://localhost:8080/images/${image.originalname}`;

    const indexProductToUpdate = products.findIndex(
      (product) => product.id === id
    );

    if (indexProductToUpdate === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    products.splice(indexProductToUpdate, 1, { id, title, price, thumbnail });

    res
      .status(200)
      .json({ status: "Updated", data: products[indexProductToUpdate] });
  })
  .delete((req, res) => {
    const { id } = req.params;
    const indexProductToDelete = products.findIndex(
      (product) => product.id === Number(id)
    );
    if (indexProductToDelete === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    products.splice(indexProductToDelete, 1);
    res.status(200).json({ status: "Deleted" });
  });

export default router;
