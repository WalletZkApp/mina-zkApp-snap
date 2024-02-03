/* eslint-disable no-restricted-globals */
/**
 * Reverses the order of bytes in a buffer.
 *
 * @param bytes - Buffer containing bytes to reverse.
 * @returns Buffer with bytes in reverse order.
 */
export function reverseBytes(bytes: Uint8Array) {
  const reversed = Buffer.alloc(bytes.length);
  for (let i = bytes.length; i > 0; i--) {
    reversed[bytes.length - i] = bytes[i - 1] as number;
  }
  return reversed;
}
