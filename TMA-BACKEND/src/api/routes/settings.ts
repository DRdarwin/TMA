import express from "express";

import {
  getUserSettings,
  updateUserSettings,
} from "../../services/settingsService.js";

const router = express.Router();

router.get("/settings", async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  const settings = await getUserSettings(userId);
  res.json(settings);
});

router.put("/settings", async (req, res) => {
  const { userId, theme, language, notificationsEnabled } = req.body;
  const updatedSettings = await updateUserSettings(userId, {
    theme,
    language,
    notificationsEnabled,
  });
  res.json(updatedSettings);
});

export default router;
