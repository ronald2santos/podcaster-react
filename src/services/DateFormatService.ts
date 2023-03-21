const getExpirationDate = () => {
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 1);
    return expirationDate.toString();
};

const formatDate = (releaseDate: string): string => Intl.DateTimeFormat("en-US").format(new Date(releaseDate));
  
const formatDuration = (durationMs: number): string => {
  const hours = (Math.floor(durationMs / 3600000) % 24).toString().padStart(2, "0");
  const minutes = (Math.floor(durationMs / 60000) % 60).toString().padStart(2, "0");
  const seconds = (Math.floor(durationMs / 1000) % 60).toString().padStart(2, "0");
  if (hours === "00") return `${minutes}:${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
};

export { getExpirationDate, formatDate, formatDuration }