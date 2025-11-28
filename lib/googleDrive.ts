import { google } from 'googleapis';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DRIVE_FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

export interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    size?: string;
    modifiedTime: string;
    webViewLink?: string;
    webContentLink?: string;
    thumbnailLink?: string;
}

/**
 * Fetch files from a specific Google Drive folder
 */
export async function fetchDriveFiles(folderId: string = DRIVE_FOLDER_ID): Promise<DriveFile[]> {
    try {
        const drive = google.drive({ version: 'v3', auth: GOOGLE_API_KEY });

        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink, webContentLink, thumbnailLink)',
            orderBy: 'modifiedTime desc',
        });

        return response.data.files || [];
    } catch (error) {
        console.error('Error fetching Drive files:', error);
        throw new Error('Failed to fetch documents from Google Drive');
    }
}

/**
 * Get a specific file's metadata
 */
export async function getFileMetadata(fileId: string): Promise<DriveFile | null> {
    try {
        const drive = google.drive({ version: 'v3', auth: GOOGLE_API_KEY });

        const response = await drive.files.get({
            fileId,
            fields: 'id, name, mimeType, size, modifiedTime, webViewLink, webContentLink, thumbnailLink',
        });

        return response.data as DriveFile;
    } catch (error) {
        console.error('Error fetching file metadata:', error);
        return null;
    }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes?: string): string {
    if (!bytes) return 'N/A';

    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Get file type from MIME type
 */
export function getFileType(mimeType: string): string {
    const typeMap: Record<string, string> = {
        'application/pdf': 'PDF',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
        'application/vnd.ms-excel': 'XLS',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
        'application/msword': 'DOC',
        'image/jpeg': 'JPG',
        'image/png': 'PNG',
        'image/gif': 'GIF',
    };

    return typeMap[mimeType] || 'FILE';
}

/**
 * Fetch images from a specific folder (for gallery/photos)
 */
export async function fetchImages(folderId: string): Promise<DriveFile[]> {
    try {
        const drive = google.drive({ version: 'v3', auth: GOOGLE_API_KEY });

        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false and (mimeType contains 'image/')`,
            fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, modifiedTime)',
            orderBy: 'modifiedTime desc',
        });

        return response.data.files || [];
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}
