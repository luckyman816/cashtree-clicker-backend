import express, { Router, Request, Response } from "express";
import DailyBoost from "../../models/DailyBoost";
const router: Router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    const newUser = new DailyBoost({
        username: req.body.username,
    })
    try {
        let username_check = await DailyBoost.findOne({ username: req.body.username });
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
router.post('/udpateRefillEnergy/:username', async (req: Request, res: Response) => {
    const user = await DailyBoost.findOne({ username: req.params.username });
    if (!user) { return res.status(400).json({ msg: 'You have no permission' }); }
    const { refill_energy, refill_energy_date } = req.body;
    await DailyBoost.findOneAndUpdate(
        { username: req.params.username }, 
        { 'daily_refill_energy.refill_energy': refill_energy, 
         'daily_refill_energy.refill_energy_date': refill_energy_date }
    );
    const updatedUser = await DailyBoost.findOne({ username: req.params.username });
    return res.json({
        _id: updatedUser._id,
        daily_refill_energy: updatedUser.daily_refill_energy,
        daily_double_points: updatedUser.daily_double_points
    });
});
router.post('/updateDoublePoints/:username', async (req: Request, res: Response) => {
    const user = await DailyBoost.findOne({ username: req.params.username });
    if (!user) { return res.status(400).json({ msg: 'You have no permission' }); }
    const { double_points, double_points_date } = req.body;
    await DailyBoost.findOneAndUpdate(
        { username: req.params.username },
        { 'daily_double_points.double_points': double_points, 
         'daily_double_points.double_points_date': double_points_date }
    );
    const updatedUser = await DailyBoost.findOne({ username: req.params.username });
    return res.json({
        _id: updatedUser._id,
        daily_refill_energy: updatedUser.daily_refill_energy,
        daily_double_points: updatedUser.daily_double_points
    });
});
router.post("/:username", async (req: Request, res: Response) => {
    let user = await DailyBoost.findOne({ username: req.params.username });
    if (user) {
      res.json(user);
    } else {
      return res.status(400).json({ msg: "You not found" });
    }
});
export default router;