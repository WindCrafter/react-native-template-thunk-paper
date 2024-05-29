import {MMKV} from 'react-native-mmkv'
import DeviceInfo from "react-native-device-info";
import {truncateStringLogBugsHelper} from "helpers/string.helper";

export const storage = new MMKV()

export function setBugOwnerIdHelper(data: string) {
  storage.set("bug.ownerid", data)
}

export function getBugOwnerIdHelper() {
  return storage.getString("bug.ownerid") || ""
}

export function setBugChannelIdHelper(data: string) {
  storage.set("bug.channelid", data)
}

export function getBugChannelIdHelper() {
  return storage.getString("bug.channelid") || ""
}

export async function setBugDeviceHelper() {
  if (__DEV__) return;

  let realtimeData = {
    getBuildNumber: DeviceInfo.getBuildNumber(),
    getCarrier: await DeviceInfo.getCarrier(),
    getFontScale: await DeviceInfo.getFontScale(),
    getFreeDiskStorage: Math.floor((await DeviceInfo.getFreeDiskStorage()) / 1000000) + " MB",
    getPowerState: await DeviceInfo.getPowerState(),
    getVersion: DeviceInfo.getVersion(),
    getSystemVersion: DeviceInfo.getSystemVersion(),
    getUserAgent: await DeviceInfo.getUserAgent(),
    isLandscape: await DeviceInfo.isLandscape(),
    isLocationEnabled: await DeviceInfo.isLocationEnabled(),
  }
  if (storage.contains("bug.device")) {
    storage.set("bug.device", JSON.stringify({...JSON.parse(storage.getString("bug.device") || "{}"), ...realtimeData}))
  } else {
    storage.set("bug.device", JSON.stringify({
      getApplicationName: DeviceInfo.getApplicationName(),
      getBuildId: await DeviceInfo.getBuildId(),
      getBrand: DeviceInfo.getBrand(),
      getDeviceType: DeviceInfo.getDeviceType(),
      getBundleId: DeviceInfo.getBundleId(),
      getDeviceName: await DeviceInfo.getDeviceName(),
      getFirstInstallTime: new Date(await DeviceInfo.getFirstInstallTime()).toLocaleString(),
      getInstallerPackageName: await DeviceInfo.getInstallerPackageName(),
      getDeviceId: DeviceInfo.getDeviceId(),
      getSystemName: DeviceInfo.getSystemName(),
      hasNotch: DeviceInfo.hasNotch(),
      hasDynamicIsland: DeviceInfo.hasDynamicIsland(),
      isTablet: DeviceInfo.isTablet(),
      getTotalDiskCapacity: Math.floor((await DeviceInfo.getTotalDiskCapacity()) / 1000000) + " MB",
      getTotalDiskCapacityOld: Math.floor((await DeviceInfo.getTotalDiskCapacityOld()) / 1000000) + " MB",
      getTotalMemory: Math.floor((await DeviceInfo.getTotalMemory()) / 1000000) + " MB",
      supportedAbis: await DeviceInfo.supportedAbis(),
      ...realtimeData
    }))
  }

}

export function getBugDeviceHelper() {
  return storage.getString("bug.device") || ""
}

export function setBugLogHelper(data: string) {
  if (__DEV__) return;
  storage.set("bug.logs", truncateStringLogBugsHelper((storage.getString("bug.logs") || "") + data, 20000))
}

export function clearBugLogHelper() {
  storage.set("bug.logs", "")
}

export function getBugLogHelper() {
  return storage.getString("bug.logs") || ""
}
