/**
 * Reverses the order of bytes in a buffer.
 *
 * @param bytes - Buffer containing bytes to reverse.
 * @returns Buffer with bytes in reverse order.
 */
export function reverseBytes(bytes: Buffer) {
    const uint8 = new Uint8Array(bytes)
    return Buffer.from(uint8.reverse())
}

export const reverse = (bytes: any) => {
    const reversed = Buffer.alloc(bytes.length);
    for (let i = bytes.length; i > 0; i--) {
      reversed[bytes.length - i] = bytes[i - 1];
    }
    return reversed;
};