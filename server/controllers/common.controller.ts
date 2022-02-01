import express from 'express';
export default class CommonController {
    model: any;
    constructor(model:any) {
        this.model = model;
    }

    async getAll(req: express.Request, res: express.Response) {
        try {
            const data = this.model.findAll();
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, error });
        }
    }

    async getOneById(req: express.Request, res: express.Response) {
        try {
            const data = this.model.findByPk(req.params.id);
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, error });
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            const data = this.model.create(req.body);
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, error });
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            const data = this.model.update(req.body, { where: { id: req.params.id } });
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, error });
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            const data = this.model.destroy({ where: { id: req.body.id } });
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error(error);
            return res.status(200).json({ success: false, error });
        }
    }
}