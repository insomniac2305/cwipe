export function getInitials(name: string, maxLength = 3) {
  const splitName = name.split(" ");
  let initials = "";
  for (let i = 0; i < splitName.length && i < maxLength; i++) {
    const segment = splitName[i];
    initials += segment.charAt(0);
  }
  return initials;
}

export function getImageSet(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}
