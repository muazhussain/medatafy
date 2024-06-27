import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('refreshToken'),
            ignoreExpiration: false,
            secretOrKey: '1234',
            // secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const currentUserAgent = req.headers['user-agent'];

        if (currentUserAgent != payload.userAgent || payload.tokenType != 'refresh') {
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        }

        return { userId: payload.userId };
    }
}