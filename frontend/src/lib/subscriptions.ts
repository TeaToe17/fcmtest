export const subscriptions: Map<string, object> = new Map()

export function storeSubscription(deviceId: string, subscription: object) {
  subscriptions.set(deviceId, subscription)
  console.log("[v0] Stored subscription for device:", deviceId)
}

export function getStoredSubscriptions() {
  return Array.from(subscriptions.values())
}
