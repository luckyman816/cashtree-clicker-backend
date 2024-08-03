import { Schema, model } from "mongoose";

const DailyCoinsSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  daily_coins_received_status: {
    day_1 : {
        type: Boolean,
        default: false
    },
    day_2 : {
        type: Boolean,
        default: false
    },
    day_3 : {
        type: Boolean,
        default: false
    },
    day_4 : {
        type: Boolean,
        default: false
    },
    day_5 : {
        type: Boolean,
        default: false
    },
    day_6 : {
        type: Boolean,
        default: false
    },
    day_7 : {
        type: Boolean,
        default: false
    }
  },
});
const DailyCoins = model("DailyCoins", DailyCoinsSchema);

export default DailyCoins;
