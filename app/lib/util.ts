import { ZodType, ZodTypeDef } from "zod";

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

export const matchRoutes = (
  routeToBeChecked: string,
  routesAllowed: string[],
) => {
  for (let i = 0; i < routesAllowed.length; i++) {
    const routeAllowed = routesAllowed[i];
    let isMatched = false;
    if (routeAllowed.endsWith("*")) {
      isMatched = routeToBeChecked.startsWith(routeAllowed);
    } else {
      isMatched = routeToBeChecked === routeAllowed;
    }
    if (isMatched) return true;
  }
  return false;
};

export function validateFormData<Output, Input>(
  formData: FormData,
  formDataSchema: ZodType<Output, ZodTypeDef, Input>,
) {
  const formDataObject: {
    [key: string]: FormDataEntryValue | Array<FormDataEntryValue>;
  } = {};
  for (const [key, value] of formData.entries()) {
    if (!formDataObject[key]) {
      formDataObject[key] = value;
    } else if (formDataObject[key] instanceof Array) {
      (formDataObject[key] as Array<FormDataEntryValue>).push(value);
    } else {
      formDataObject[key] = [formDataObject[key] as FormDataEntryValue, value];
    }
  }

  return formDataSchema.safeParse(formDataObject);
}

export function composePostgresArray(array: unknown[]) {
  return JSON.stringify(array).replace("[", "{").replace("]", "}");
}

export function filterUniqueObjectArray<T, PropertyName extends string>(
  array: ({ [P in PropertyName]: unknown } & T)[],
  uniqueProperty: PropertyName,
) {
  const result = [];
  const map = new Map();

  for (const item of array) {
    if (!map.has(item[uniqueProperty])) {
      map.set(item[uniqueProperty], true);
      result.push({
        ...item,
      });
    }
  }

  return result;
}
