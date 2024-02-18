export function getInitials(name: string, maxLength = 3) {
  const splitName = name.split(" ");
  let initials = "";
  for (let i = 0; i < splitName.length && i < maxLength; i++) {
    const segment = splitName[i];
    initials += segment.charAt(0);
  }
  return initials;
}
