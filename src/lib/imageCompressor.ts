/**
 * Compresses an image data URL (Base64) to a smaller JPEG base64 string.
 * @param base64Str The original base64 string or image URL
 * @param maxWidth Maximum width of the compressed image (default: 800)
 * @param maxHeight Maximum height of the compressed image (default: 800)
 * @param quality JPEG quality from 0.1 to 1.0 (default: 0.7)
 */
export function compressImageDataURL(
  base64Str: string,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7
): Promise<string> {
  // If it's not a data URL (e.g., standard HTTP URL), return it as is
  if (!base64Str || !base64Str.startsWith('data:image/')) {
    return Promise.resolve(base64Str);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Handle scaling down
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64Str); // Fallback to original if canvas context fail
        return;
      }

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Export as compressed JPEG
      try {
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (e) {
        console.error('Failed to compress image:', e);
        resolve(base64Str); // Fallback to original
      }
    };

    img.onerror = () => {
      resolve(base64Str); // Fallback on error
    };

    img.src = base64Str;
  });
}
