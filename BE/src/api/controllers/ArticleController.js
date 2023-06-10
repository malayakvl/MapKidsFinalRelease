import articleModel from '../models/Article.js';

class ArticleController {
    async fetchItems (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await articleModel.getAll(1, limit, offset);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async addItem (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await articleModel.upda(formData);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async bulkDelete (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const ids = [];
        JSON.parse(req.body.data).filter(id => id.checked).forEach(data => ids.push(data.id));
        await productModel.bulkDelete(ids, req.user.id);

        return res.status(200).json({ success: true });
    }
}

export default new ArticleController();
