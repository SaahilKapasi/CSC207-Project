export function getColorByScore(score: number) {
  if (score < 3.3) {
    return "green-500";
  } else if (score < 6.6) {
    return "yellow-300";
  } else {
    return "red-500";
  }
}
