import jwt from 'jsonwebtoken';
import fs from 'fs';
import logger from '../logger';

export class JwtService {

    jwtHeaders: any;
    privateKey: any;
    publicKey: any;

    constructor(){
        this.jwtHeaders = {
            issuer: 'Movies Database',
            algorithm: 'RS256',
            expiresIn: '1h',
          };
          
        this.privateKey = fs.readFileSync('key/private.key');
        this.publicKey = fs.readFileSync('key/public.key');
    }

    generateAccessToken = (id: string, role: string) => {
        const payload = {
          id,
          role,
        };

        return jwt.sign({ payload }, this.privateKey, this.jwtHeaders);
    };

    verifyAccessToken = (token: string) => {
        try {
          return jwt.verify(token, this.publicKey, this.jwtHeaders);
        } catch (error) {
          logger.error(error);
          return undefined;
        }
    };
}