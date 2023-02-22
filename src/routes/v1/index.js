import express from "express";
import { HttpStatusCode } from "*/utilities/constant";
import { boardRoutes } from "./board.route";
import { columnRoutes } from "./column.route";
import { cardRoutes } from "./card.route";

const router = express.Router();

router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "OK" })
);

// Board api
router.use("/boards", boardRoutes);

// Columns api
router.use("/columns", columnRoutes);

// Cards api
router.use("/cards", cardRoutes);

export const apiV1 = router;
