import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: "jaleecommerce",
    private_key_id: "aa3059263ee8cac1eb3a6c03391d5e01119de35b",
    private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCca2SUFewN4ZjN
X6XC8kDreWOL2pcRD4HYBC0yFaRVZlM9+ELInsr7ByjkvZ2jVMIiQujzhfVKXAo5
TSRI7O8327RnhicpTHtcBAIGCTJmn2kP1/6kr7UR88crUQgCkvn1Pgq4AqAMacuV
m+L/MeVVzL6OZA6jupQX3LFiGEJMAF/S8nJ8AeutaRMMCmsXJGe5SLoLvo1v6Kfh
YaOCZRU+zSXUjlZfnpz2x73SiydahJW5SFpKPr+QjkNqUV6zb4V3l51o30wGU15V
ArTcJzGuwYoaN++YvLRpWkSD16/U6vGICOyn571nB3IIPqtZ9QmiURN92sAmgiv6
+2BVHo1XAgMBAAECggEAAozbsHBlD1rgv2RyUunZNh2eCl8vfFc44jk7NWhV7BCF
heqgyB2SqKIWwBf5VHriyWU24BWMiMBUaFfCIjA+vDXoTJHK3KkDD95+2/NVb4fk
0h3O6Id218qWMjYZf9U+nwl6akKcsmcdKxzGCCwblZkHeFHYTUIS/Qqbl8JWfl+y
o4loHX5mKVcQ0C0ZYzZWGdqkHI4mGOnGr8k+hHrBF9sdo/9uQ6tMFojXPwlDdu4B
HKDXlVA65uQ8o8ABB+v8HcIqa0f14mRDz/iFubAhv+ldIexaqXoiCI/zKUFjwWKe
mwS/wKWG3OYxeqLXkVcrdU2BHwCMZyl9HzFreKYy/QKBgQDaO0yuluQ8F+OULQib
NZpJuLseo9YT462z4GqwNYu93UobE64fekd9ngmi8dE4asQNkWaEaSy0cG4nZI1U
dVgxl3S2YsPS1M1ttJ2xzmpeKnJDNLIvp6v0Vm847JNItVFMr04phgFwSLP2i2y/
MJvYhMlVweH52fwuw9KXtKjPwwKBgQC3fYWBEt+3EuQ3S80WXXkICMLNysuwCgte
9wnOHERretuwwsaEBPODDj9qVK9FgFnbvYQbFTnDdaAKxnrl9nNSBTR4OiB3EpSg
MC/lagNmX77LcJtK0s6AapyGz1GT3E5Lr8t37T46VBmmp4JzPtq8zUbzZoSY2LVc
DICsVr7m3QKBgQC+IyRwiS9Z3EaAd6wj7tP6n2UJER4YPiq9qi3KURzr074ZUVBI
RLW9ENC8k4wCZ6NhXum/PBOjMsIGuGkayRKKQreBoROUwawqhU9P99RdLwZW37bQ
Jnp/bD+DjTvWAYRQF/012HewaOfDSz74ZVWjlC4G9eH5Wp+J7zuwycq7GQKBgCSi
pi4wM4Sc+/3iX49QmGK3RRXLoMGEL+MFFesWD78Z55UyPmqLhocrKBQ11kzdJJPQ
EflKUp8o9AxStqUFgN7mdSRwDp1Xk18sX9PBR+5/vVtnH0pgLqTLJHdyG0qXWPaZ
odlO//arZfe1SEF0Uj4SClF8rYrK8eLwCBzgsPrtAoGBANYGD0ooBHkVO43MPaNB
j7lc0vWJxzLdsXZ3/WAhQQy5t5nODEq0YrUjRTUROSlh8nSJ8ci7X1vp8ZIoqXm3
e89cDDtLDor992FLtFRzBBramPFXxIfYvFSYSftaSzamuqt4Gyr8Q+tqvzWNVF+/
9rAy5lnczjJVrMA0/oTlmXt4
-----END PRIVATE KEY-----`,
    client_email:
      "firebase-adminsdk-fbsvc@jaleecommerce.iam.gserviceaccount.com",
    client_id: "108332029526414095139",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40jaleecommerce.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  } as admin.ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ✅ Initialize Web Push (required for Apple/iOS Safari)
if (
  !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  !process.env.VAPID_PRIVATE_KEY
) {
  console.warn("⚠️ VAPID keys missing! Web Push will fail on Safari.");
} else {
  webpush.setVapidDetails(
    "mailto:admin@jaleecommerce.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

// ✅ Type guard
function isPushSubscription(obj: any): obj is PushSubscription {
  return (
    obj && typeof obj.endpoint === "string" && typeof obj.keys === "object"
  );
}

// ✅ Main handler
export async function POST(request: NextRequest) {
  const { token, title, message, link } = await request.json();

  try {
    if (typeof token === "string" && token.trim() !== "") {
      // Android/Desktop via FCM
      await admin.messaging().send({
        token,
        notification: { title, body: message },
        webpush: link && { fcmOptions: { link } },
      });
    } else if (isPushSubscription(token)) {
      // iOS Safari (Web Push)
      await webpush.sendNotification(
        // @ts-ignore
        token,
        JSON.stringify({ title, body: message, data: { link } })
      );
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid token/subscription.",
      });
    }

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Notification send error:", error);
    return NextResponse.json({ success: false, error });
  }
}

// export async function POST(request: NextRequest) {
//   const { token, sub, title, message, link } = await request.json();

//   const payload: Message = {
//     token,
//     notification: {
//       title: title,
//       body: message,
//     },
//     webpush: link && {
//       fcmOptions: {
//         link,
//       },
//     },
//   };

//   try {
//     await admin.messaging().send(payload);

//     return NextResponse.json({ success: true, message: "Notification sent!" });
//   } catch (error) {
//     return NextResponse.json({ success: false, error });
//   }
// }
