import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { commonResponse } from 'src/Utils/output-message-format';
import { CreateUserDto } from '../dtos/create-user.dto';

@ApiTags('User')
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
            console.log(error);
            throw error;
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        try {
            const res = await this.userService.getUserById(id);
            return commonResponse(true, 'User fetched successfully', res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
        try {
            const res = await this.userService.updateUser(id, payload);
            return commonResponse(true, 'User updated successfully', res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            const res = await this.userService.deleteUser(id);
            return commonResponse(true, 'User deleted successfully', res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
