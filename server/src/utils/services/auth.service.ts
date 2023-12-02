import { Injectable } from '@nestjs/common';
import { scrypt, timingSafeEqual, randomBytes } from 'crypto'
import { promisify } from 'util'
import { verify } from 'jsonwebtoken';

const scryptAsync = promisify(scrypt);

interface JwtPayload {
    userId: string;
    iat: number;
    exp: number;
}

@Injectable()
export class AuthService {
    private get generatedSalt() {
        return randomBytes(16).toString('hex');
    }

    async hashPassword(password: string): Promise<string> {
        const salt = this.generatedSalt;
        const buff = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buff.toString('hex')}.${salt}`;
    }

    async verifyPassword(storedHashedPassword: string, passwordAttempt: string): Promise<boolean> {
        const [hashedPassword, salt] = storedHashedPassword.split('.');
        const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
        const passwordAttemptBuf = await scryptAsync(passwordAttempt, salt, 64) as Buffer;

        return timingSafeEqual(hashedPasswordBuf, passwordAttemptBuf);
    }

    
    async validateToken(token: string): Promise<JwtPayload | null> {
        return new Promise<JwtPayload | null>((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    // Token verification failed
                    resolve(null);
                } else {
                    // Token is valid
                    resolve(decoded as JwtPayload);
                }
            });
        });
    }
}