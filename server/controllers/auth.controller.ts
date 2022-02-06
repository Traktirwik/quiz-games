import express from 'express';
import ApiError from '../exceptions/api.errors';
import userService from '../services/user.service';
export default class AuthController {

    async userRegistration(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {

            const { firstName, lastName, email, password } = req.body;

            const userData = await userService.registration(email, password, firstName, lastName) as any;

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ success: true, data: userData });
        } catch (error) {
            next(error);
        }
    }

    async userLogIn(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { email, password } = req.body;

            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.status(201).json({ success: true, data: userData });
        } catch (error) {
            next(error);
        }
    }

    async userLogOut(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {            
            const {refreshToken} = req.cookies;
            if(!refreshToken) {
                throw ApiError.BadRequest("not signed in");
            }
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({success: true, token});
        } catch (error) {
            next(error);
        }
    }

    async tokenRefresh(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {refreshToken} = req.cookies;

            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.status(201).json({ success: true, data: userData });
        } catch(error) {
            next(error);
        }
    }
}