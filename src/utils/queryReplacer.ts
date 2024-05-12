export const queryReplacer = (q: string, target: string, filter: string) => {
  const regex = new RegExp(`${target}:[\\w-]+`, "g");

  return `${q.replace(regex, "")} ${target}:${filter}`.trim();
};
