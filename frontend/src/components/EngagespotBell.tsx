"use client";
import { useEffect } from "react";

export default function EngagespotBell() {
  useEffect(() => {
    // wait for window.Engagespot to exist
    const timer = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).Engagespot) {
        clearInterval(timer);

        (window as any).Engagespot.init({
          apiKey: process.env.NEXT_PUBLIC_ENGAGESPOT_API_KEY!,
          userId: "jale.official.contact@gmail.com", // replace with your real user id/email
          enableWebPush: true,
          theme: "light",
        });

        // render bell into our container
        (window as any).Engagespot.render("#notification-bell");
      }
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return <div id="notification-bell" className="fixed top-4 right-4 z-50"></div>;
}
