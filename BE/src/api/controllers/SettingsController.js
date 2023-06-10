import settingsModel from '../models/Settings.js';

class SettingsController {
    async getSettingsData (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await settingsModel.getSettingsData();
            return res.status(200).json({ data });
        }
    }

    async submitSettingsData(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            let result;
            result = await settingsModel.updateSettingsData(req.body);
            if (!result.error) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(500).json({ success: false, error: result.error.message });
            }
        }
    }
}

export default new SettingsController();
