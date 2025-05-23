import cron from "node-cron";
import User from "../models/userModels.js";

export const removeUnverifiedAccounts = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const result = await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo },
      });
      console.log(`Deleted ${result.deletedCount} unverified accounts.`);
    } catch (error) {
      console.error("Error deleting unverified accounts:", error);
    }
  });
};

export default removeUnverifiedAccounts;