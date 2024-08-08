import { Schema, model } from "mongoose";
import moment from "moment";
const DailyBoostSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  daily_refill_energy: {
    refill_energy: {
        type: Number,
        default: 0
    },
    refill_energy_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    }
  },
  daily_double_points: {
    double_points: {
        type: Number,
        default: 0
    },
    double_points_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    }
  }
});

const DailyBoost = model("DailyBoost", DailyBoostSchema);

export default DailyBoost;
