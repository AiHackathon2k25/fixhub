import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.warn('⚠️  WARNING: Cloudinary not configured. Image upload will be disabled.');
  console.warn('   Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env');
} else {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
  console.log('✅ Cloudinary configured');
}

/**
 * Upload image buffer to Cloudinary
 * Returns the secure URL of the uploaded image
 */
export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error('Cloudinary not configured');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'fixhub',
        public_id: `${Date.now()}_${filename.replace(/\.[^/.]+$/, '')}`,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('❌ [Cloudinary] Upload failed:', error);
          reject(error);
        } else if (result) {
          console.log('✅ [Cloudinary] Image uploaded:', result.secure_url);
          resolve(result.secure_url);
        } else {
          reject(new Error('Unknown upload error'));
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Upload multiple images
 */
export async function uploadImages(files: { buffer: Buffer; filename: string }[]): Promise<string[]> {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.warn('⚠️  [Cloudinary] Not configured - skipping image upload');
    return [];
  }

  const uploadPromises = files.map(file => uploadImage(file.buffer, file.filename));
  return Promise.all(uploadPromises);
}

export function isCloudinaryConfigured(): boolean {
  return !!(CLOUD_NAME && API_KEY && API_SECRET);
}

