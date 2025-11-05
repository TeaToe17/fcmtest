import OneSignal from "react-onesignal";

export async function initOneSignal() {
  try {
    await OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,

      // Explicitly point to your local service worker files
      serviceWorkerPath: "/OneSignalSDKWorker.js",
      serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js", // Optional but recommended
      serviceWorkerParam: { scope: "/" },

      notifyButton: {
        enable: true,
      },
    });

    // Ask user for permission (optional)
    OneSignal.Slidedown.promptPush();
  } catch (error) {
    console.error("OneSignal init error:", error);
  }
}