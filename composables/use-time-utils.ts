export const useTimeUtils = () => {
  const KILOMETERS_PER_MILE = 1.609344;
  const MILES_PER_MARATHON = 26.2;

  const parseIntOrZero = (value: string) => {
    const val = parseInt(value);
    return isNaN(val) ? 0 : val;
  };

  const minutesStringToSeconds = (minutesString: string) => {
    if (!minutesString) return 0;
    if (!minutesString.includes(":")) return parseInt(minutesString) * 60;

    const parts = minutesString.split(":");
    if (parts.length === 1) {
      // Is minutes a good assumption?
      return parseIntOrZero(parts[0]) * 60;
    }
    if (parts.length === 2) {
      const minutes = parseIntOrZero(parts[0]);
      const seconds = parseIntOrZero(parts[1]);
      return minutes * 60 + seconds;
    }
    if (parts.length === 3) {
      const hours = parseIntOrZero(parts[0]);
      const minutes = parseIntOrZero(parts[1]);
      const seconds = parseIntOrZero(parts[2]);
      return hours * 3600 + minutes * 60 + seconds;
    } else {
      console.error("Invalid time format:", minutesString);
      // return undefined
      return 0;
    }
  };

  const displayTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.round(timeInSeconds % 60);
    const hoursString = hours > 0 ? `${hours}:` : "";
    const minutesString = minutes < 10 && hours > 0 ? `0${minutes}` : minutes;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    return `${hoursString}${minutesString}:${secondsString}`;
  };

  const kilometerSeconds = (timeInSeconds: number, eventType: string) => {
    switch (eventType) {
      case "marathon":
        return timeInSeconds / (MILES_PER_MARATHON * KILOMETERS_PER_MILE);
      case "half marathon":
        return timeInSeconds / (0.5 * MILES_PER_MARATHON * KILOMETERS_PER_MILE);
      case "10k":
        return timeInSeconds / 10;
      case "5k":
        return timeInSeconds / 5;
      default:
        console.error("invalid event type", eventType);
        return timeInSeconds;
    }
  };

  const mileSeconds = (timeInSeconds: number, eventType: string) => {
    const kmSeconds = kilometerSeconds(timeInSeconds, eventType);
    return kmSeconds * KILOMETERS_PER_MILE;
  };

  return {
    KILOMETERS_PER_MILE,
    MILES_PER_MARATHON,
    minutesStringToSeconds,
    kilometerSeconds,
    mileSeconds,
    displayTime,
  };
};
