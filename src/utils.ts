// Returns true if the given string:
// 1. has 64 characters.
// 2. The characters are a valid hex string. (no 0x prefix)
export const isValidHex = (str: string): boolean => {
  return str.length === 64 && /^[0-9a-fA-F]+$/.test(str);
};
