import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { commonResponse } from 'src/utils/output-message-format';
import { CreateUserDto } from '../dtos/create-user.dto';
import { JwtGuard } from '../guards/jwt.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('create')
    async createUser(@Body() payload: CreateUserDto) {
        try {
            const res = await this.userService.createUser(payload);
            return commonResponse(true, 'User created successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'User creation failed', error);
        }
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async getUserById(@Request() req: any, @Param('id') id: string) {
        try {
            const res = await this.userService.getUserById(id);
            return commonResponse(true, 'User fetched successfully', res);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
        try {
            const res = await this.userService.updateUser(id, payload);
            return commonResponse(true, 'User updated successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'User update failed', error);
        }
    }

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            const res = await this.userService.deleteUser(id);
            return commonResponse(true, 'User deleted successfully', res);
        } catch (error) {
            console.error(error);
            return commonResponse(false, 'User delete failed', error);
        }
    }
}
