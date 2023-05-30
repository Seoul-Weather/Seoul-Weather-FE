import webPush from "web-push";
import { getSubscriptions } from "../../utils/db";

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY;

webPush.setVapidDetails("mailto:rachaenlee@gmail.com", publicVapidKey, privateVapidKey);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const subscriptions = getSubscriptions();
        const notificationPayload = {
            title: "Hello from PWA",
            body: "This is a test push notification",
            icon: "/maskable_icon_x192.png",
            badge: "/maskable_icon_x192.png",
        };

        try {
            console.log(notificationPayload);
            for (const subscription of subscriptions) {
                await webPush.sendNotification(subscription, JSON.stringify(notificationPayload));
            }
            res.status(200).json({ message: "Push notifications sent" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to send push notifications" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
