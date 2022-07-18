import { Schema, model } from "mongoose";

const FavoritesSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  baseCurrency: {
    type: String,
    required: true,
  },
  targetCurrency: {
    type: String,
    required: true,
  },
});

const Favorites = model("Favorites", FavoritesSchema);

export default Favorites;
