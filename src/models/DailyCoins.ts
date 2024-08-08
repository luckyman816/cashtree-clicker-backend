import { Schema, model } from "mongoose";
import moment from "moment";
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
  retweet_status :{
    day: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    },
    status: {
        type: Boolean,
        default: false
    }
  },
  comment_status : {
    day: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    },
    status: {
        type: Boolean,
        default: false
    }
  },
  like_status : {
    day: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    },
    status: {
        type: Boolean,
        default: false
    }
  },
  instagram_status : {
    type: Boolean,
    default: false
  },
  youtube_status : {
    type: Boolean,
    default: false
  },
  telegram_status : {
    type: Boolean,
    default: false
  }
});
const DailyCoins = model("DailyCoins", DailyCoinsSchema);

export default DailyCoins;
