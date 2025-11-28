import { db } from './firebase';
import { collection, doc, setDoc, getDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

export interface AccessToken {
    token: string;
    email: string;
    createdAt: Date;
    expiresAt: Date;
    used: boolean;
    investorName?: string;
}

const TOKENS_COLLECTION = 'accessTokens';
const TOKEN_EXPIRY_DAYS = 30;

/**
 * Generate a unique access token
 */
export function generateToken(): string {
    return `DAG-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Create a new magic link token for an investor
 */
export async function createAccessToken(
    email: string,
    investorName?: string
): Promise<string> {
    const token = generateToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

    const tokenData: AccessToken = {
        token,
        email,
        createdAt: now,
        expiresAt,
        used: false,
        investorName,
    };

    await setDoc(doc(db, TOKENS_COLLECTION, token), tokenData);
    return token;
}

/**
 * Validate an access token
 */
export async function validateToken(token: string): Promise<{
    valid: boolean;
    email?: string;
    investorName?: string;
}> {
    try {
        const tokenDoc = await getDoc(doc(db, TOKENS_COLLECTION, token));

        if (!tokenDoc.exists()) {
            return { valid: false };
        }

        const data = tokenDoc.data() as AccessToken;

        // Check if token is expired
        if (new Date() > data.expiresAt.toDate()) {
            return { valid: false };
        }

        // Check if token was already used (optional: allow reuse within expiry period)
        // if (data.used) {
        //   return { valid: false };
        // }

        return {
            valid: true,
            email: data.email,
            investorName: data.investorName,
        };
    } catch (error) {
        console.error('Error validating token:', error);
        return { valid: false };
    }
}

/**
 * Mark a token as used
 */
export async function markTokenAsUsed(token: string): Promise<void> {
    await setDoc(
        doc(db, TOKENS_COLLECTION, token),
        { used: true },
        { merge: true }
    );
}

/**
 * Revoke an access token (admin function)
 */
export async function revokeToken(token: string): Promise<void> {
    await deleteDoc(doc(db, TOKENS_COLLECTION, token));
}

/**
 * Get all active tokens (admin function)
 */
export async function getAllActiveTokens(): Promise<AccessToken[]> {
    const q = query(
        collection(db, TOKENS_COLLECTION),
        where('expiresAt', '>', new Date())
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as AccessToken);
}

/**
 * Session management
 */
const SESSION_KEY = 'darbonne_session';

export function saveSession(token: string, email: string, investorName?: string): void {
    const session = {
        token,
        email,
        investorName,
        timestamp: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): { token: string; email: string; investorName?: string } | null {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;

    try {
        return JSON.parse(sessionStr);
    } catch {
        return null;
    }
}

export function clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = getSession();
    if (!session) return false;

    const { valid } = await validateToken(session.token);
    if (!valid) {
        clearSession();
        return false;
    }

    return true;
}
