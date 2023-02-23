import express from "express";
import { boardController } from "*/controllers/board.controller";
import { boardValidation } from "*/validations/board.validation";

const router = express.Router();

router
  .route("/")
  // .get((req, res) => console.log("GET board"))
  .post(boardValidation.createNew, boardController.createNew);

router
  .route("/:id")
  .get(boardController.getFullBoard)
  .put(boardValidation.update, boardController.update);

export const boardRoutes = router;
