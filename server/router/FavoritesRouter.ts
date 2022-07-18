import { Router } from "express";
import favorites from "../controller/FavoritesController";

const FavoritesRouter = Router();

FavoritesRouter.post("/addToFavorites", favorites.addToFavorites);
FavoritesRouter.post("/getAllFavorites", favorites.getAllFavoritesByEmail);

export default FavoritesRouter;
