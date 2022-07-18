import express from "express";
import Favorites from "../models/Favorites";

const addToFavorites = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, baseCurrency, targetCurrency } = req.body;
  try {
    const favorite = await Favorites.create({
      email,
      baseCurrency,
      targetCurrency,
    });
    await favorite.save();
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFavoritesByEmail = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const favorites = await Favorites.find({
      email: req.body.email,
    });
    return res.status(200).json({
      success: true,
      data : favorites,
    });
  } catch (error) {
    next(error);
  }
};

export default { addToFavorites, getAllFavoritesByEmail };
