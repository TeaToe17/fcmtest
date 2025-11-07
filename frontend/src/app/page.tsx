"use client";

import { useState } from "react";
import { sendTestNotification } from "../lib/engagespot";
import { usePushSubscription } from "../hooks/usePush";
import { Engagespot } from "@engagespot/react-component";
import EngagespotBell from "@/components/EngagespotBell";

export default function Home() {
  const [userId, setUserId] = useState<string>("jale.official.contact@gmail.com");

  usePushSubscription();

  const handleSend = async () => {
    try {
      await sendTestNotification(userId);
      alert("Sent test notification to: " + userId);
    } catch (err) {
      console.error(err);
      alert("Failed to send test");
    }
  };

  const apikey = process.env.NEXT_PUBLIC_ENGAGESPOT_API_KEY;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Engagespot Push Test</h1>
      <div>
        <label>
          User ID:&nbsp;
          <input value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
      </div>
      <EngagespotBell />
      <button onClick={handleSend} style={{ marginLeft: "1rem" }}>
        Send Test Notification
      </button>
      {apikey && (
        <Engagespot
          apiKey={apikey}
          userId="jale.official.contact@gmail.com"
          dataRegion="us" //eu or us
          // userToken="Required if secure auth is enabled on your Engagespot app"
        />
      )}
      ;
    </div>
  );
}
