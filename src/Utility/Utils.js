import DeviceInfo from "react-native-device-info";

export async function getSystemVersion() {
    let deviceId = DeviceInfo.getSystemVersion()
    return deviceId;
}

export async function getAppVersion() {
    let version = DeviceInfo.getVersion();
    console.log("APPVERSION", version);
    return version;
}
export async function getBuildNumber() {
    let number = DeviceInfo.getBuildNumber();
    return number;
}

export const getFormattedDateTime = async () => {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1); // Months are zero-indexed
    const year = now.getFullYear();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${day}${month}${year}${hours}${minutes}${seconds}`;
};


export function forceLogoutUser() {

}


export function isNullOrEmpty(value) {
    if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
    ) {
        return true; // It IS null or empty
    }
    return false; // It has some value
}

export function isNullOrEmptyNOTTrim(value) {
    if (value === null || value === undefined || value === '') {
        return true; // It IS null or empty
    }
    return false; // It has some value
}


export const isEmptyValueObject = (value) => {
    return (
        value === null ||
        value === undefined ||
        (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
    );
};