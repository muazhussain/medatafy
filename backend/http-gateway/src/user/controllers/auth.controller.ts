import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { LoginDto } from "../dtos/login.dto";
import { LocalGuard } from "../guards/local.gurad";
import { commonResponse } from "src/Utils/output-message-format";
import { RefreshGuard } from "../guards/refresh.guard";
import { GetAccessTokenDto } from "../dtos/get-access-token.dto";
import { ForgotPasswordDto } from "../dtos/forgot-password.dto";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { VerifyTokenDto } from "../dtos/verify-token.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Request() req: any, @Body() payload: LoginDto) {
        try {
            const res = await this.userService.login(req);
            return commonResponse(true, 'User logged in successfully', res);
        } catch (error) {
            console.log(error);
            return commonResponse(false, 'User login failed', error);
        }
    }

    @Get('access-token')
    @UseGuards(RefreshGuard)
    async refresh(@Query() payload: GetAccessTokenDto) {
        try {
            const res = await this.userService.createAccessToken(payload.refreshToken);
            return commonResponse(true, 'Access token generated successfully', res);
        } catch (error) {
            console.log(error);
            return commonResponse(false, 'Access token generation failed', error);
        }
    }

    @Post('forgot-password')
    async forgotPassword(@Body() payload: ForgotPasswordDto) {
        try {
            const res = await this.userService.forgotPassword(payload);
            return commonResponse(true, 'Password reset token sent successfully', res);
        } catch (error) {
            console.log(error);
            return commonResponse(false, 'Password reset token sending failed', error);
        }
    }

    @Post('reset-password')
    async resetPassword(@Body() payload: ResetPasswordDto) {
        try {
            const res = await this.userService.resetPassword(payload);
            return commonResponse(true, 'Password reset successfully', res);
        } catch (error) {
            console.log(error);
            return commonResponse(false, 'Password reset failed', error);
        }
    }

    @Post('verify-token')
    async verifyToken(@Body() payload: VerifyTokenDto) {
        try {
            const res = await this.userService.verifyToken(payload);
            return commonResponse(true, 'Token verified successfully', res);
        } catch (error) {
            console.log(error);
            return commonResponse(false, 'Token verification failed', error);
        }
    }
}