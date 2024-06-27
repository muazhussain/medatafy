import { InjectRedis } from "@nestjs-modules/ioredis";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Redis } from "ioredis";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRedis() private readonly redis: Redis,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '1234',
            // secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const currentUserAgent = req.headers['user-agent'];

        if (currentUserAgent != payload.userAgent || payload.tokenType != 'access') {
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        }
        return { userId: payload.userId };
    }
}