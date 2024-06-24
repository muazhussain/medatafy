import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
    ) { }
}