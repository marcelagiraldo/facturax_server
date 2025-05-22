import { Expo } from "expo-server-sdk";

// Se puede guardar y reutilizar la instancia
const expo = new Expo();

export async function sendPushNotification(expoPushToken, message) {
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
    return;
  }

  const messages = [
    {
      to: expoPushToken,
      sound: "default",
      body: message,
      data: { withSome: "data" },
    },
  ];

  try {
    const ticketChunk = await expo.sendPushNotificationsAsync(messages);
    console.log("Notification sent:", ticketChunk);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
