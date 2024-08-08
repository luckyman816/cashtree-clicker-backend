import express, { Router, Request, Response } from "express";
import DailyCoins from "../../models/DailyCoins";
const router: Router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    const newUser = new DailyCoins({
        username: req.body.username,
    })
    try {
        let username_check = await DailyCoins.findOne({ username: req.body.username });
        if (username_check) {
            return res.json(username_check);
        } else {
            await newUser.save();
            res.json(newUser);
        }
    } catch (error) {
        res.status(400).json({ msg: error });
    }
})
router.post('/update/:username', async (req: Request, res: Response) => {
    const user = await DailyCoins.findOne({ username: req.params.username });

    if (!user) {
        return res.status(400).json({ msg: 'You have no permission' });
    }
    const { day, day_status } = req.body;

    if (day === 'Day 1') {
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            { 'daily_coins_received_status.day_1': day_status }
        );
    } else if(day === "Day 2"){
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            { 'daily_coins_received_status.day_2': day_status }
        );
    } else if(day === "Day 3"){
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            { 'daily_coins_received_status.day_3': day_status }
        );
    } else if(day === "Day 4"){
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            { 'daily_coins_received_status.day_4': day_status }
        );
    } else if(day === "Day 5"){
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            { 'daily_coins_received_status.day_5': day_status }
        );
    } else if(day === "Day 6"){
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            { 'daily_coins_received_status.day_6': day_status }
        );
    } else if(day === "Day 7"){
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            { 'daily_coins_received_status.day_7': day_status }
        );
    }

    // Return the updated status for the user
    const updatedUser = await DailyCoins.findOne({ username: req.params.username });
    return res.json({
        _id: updatedUser._id,
        daily_coins_received_status: updatedUser.daily_coins_received_status,
        retweet_status: updatedUser.retweet_status,
        comment_status: updatedUser.comment_status,
        like_status: updatedUser.like_status,
        instagram_status: updatedUser.instagram_status,
        youtube_status: updatedUser.youtube_status,
        telegram_status: updatedUser.telegram_status,
    });
});
router.post("/dailyTask/update/:username", async (req: Request, res: Response) => {
    const user = await DailyCoins.findOne({ username: req.params.username });

    if (!user) {
        return res.status(400).json({ msg: 'You have no permission' });
    }
    const { task, day, day_status } = req.body;

    if(task == "retweet") {
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            {"retweet_status.day" : day , "retweet_status.status" : day_status},
        )
    } else if (task == "comment") {
        await DailyCoins.findOneAndUpdate(
            { usename: req.params.username},
            {"comment_status.day" : day, "comment_status.status" : day_status},
        )
    } else if (task == "like") {
        await DailyCoins.findOneAndUpdate(
            { username: req.params.username },
            {"like_status.day" : day, "like_status.status" : day_status},
        )
    }
    const updatedUser = await DailyCoins.findOne({ username: req.params.username });
    return res.json({
        _id: updatedUser._id,
        daily_coins_received_status: updatedUser.daily_coins_received_status,
        retweet_status: updatedUser.retweet_status,
        comment_status: updatedUser.comment_status,
        like_status: updatedUser.like_status,
        instagram_status: updatedUser.instagram_status,
        youtube_status: updatedUser.youtube_status,
        telegram_status: updatedUser.telegram_status,
    });
});
router.post("/taskList/update/:username", async (req: Request, res: Response) => {
    const user = await DailyCoins.findOne({ username: req.params.username });
    if (!user) {
        return res.status(400).json({ msg: 'You have no permission' });
    }
    const { task, status } = req.body;
    if(task == "instagram") {
        await DailyCoins.findOneAndUpdate({ username: req.params.username }, { instagram_status: status });
    } else if (task == "youtube") {
        await DailyCoins.findOneAndUpdate({ username: req.params.username }, { youtube_status: status });
    } else if (task == "telegram") {
        await DailyCoins.findOneAndUpdate({ username: req.params.username }, { telegram_status: status });
    }
    const updatedUser = await DailyCoins.findOne({ username: req.params.username });
    return res.json({
        _id: updatedUser._id,
        daily_coins_received_status: updatedUser.daily_coins_received_status,
        retweet_status: updatedUser.retweet_status,
        comment_status: updatedUser.comment_status,
        like_status: updatedUser.like_status,
        instagram_status: updatedUser.instagram_status,
        youtube_status: updatedUser.youtube_status,
        telegram_status: updatedUser.telegram_status,
    });
})
router.post("/:username", async (req: Request, res: Response) => {
    let user = await DailyCoins.findOne({ username: req.params.username });
    if (user) {
      res.json(user);
    } else {
      return res.status(400).json({ msg: "You not found" });
    }
});

export default router;