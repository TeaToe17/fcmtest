import webpush from "web-push";

const PUBLIC = process.env.VAPID_PUBLIC_KEY;
const PRIVATE = process.env.VAPID_PRIVATE_KEY;
const SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@yourdomain.com";
webpush.setVapidDetails(SUBJECT, PUBLIC, PRIVATE);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const payload = JSON.stringify(req.body || { title: "Hello", body: "Test" });

  const results = await Promise.allSettled(
    subscriptions.map((sub) => webpush.sendNotification(sub, payload))
  );

  res.json({ results: results.map((r) => r.status) });
}
