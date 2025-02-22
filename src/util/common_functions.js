import { Offline, Online } from "react-detect-offline";

export const isNetworkConnected = () => {
    return Online ? Online : Offline
}