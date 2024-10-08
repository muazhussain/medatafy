import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { UserService } from "../services/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly userService: UserService,
    ) {
        super();
    }

    async validate(username: string, password: string) {
        try {
            return await this.userService.validateUser(username, password);
        } catch (error) {
            throw error;
        }
    }
}