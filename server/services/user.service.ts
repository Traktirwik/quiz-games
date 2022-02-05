import bcrypt from 'bcrypt';
import UserDto from '../dtos/user.dto';
import User from '../models/user.model';
import tokenService from './token.service';
import ApiError from '../exceptions/api.errors';

class UserService {
    async registration(email: string, password: string, firstName: string, lastName: string) {
        try {


            const hashedPassword = await bcrypt.hash(password, 7);

            const user: any = await User.create({ firstName, lastName, email, password: hashedPassword });

            const userDto = new UserDto(user);

            const tokens = tokenService.generateToken({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            return { user: userDto, ...tokens };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login(email: string, password: string) {
        const user: any = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.BadRequest("user with this email is not exist");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw ApiError.BadRequest("incorrect password");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { user: userDto, ...tokens };
    }
}

export default new UserService();