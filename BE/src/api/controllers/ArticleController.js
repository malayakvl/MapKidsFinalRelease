import articleModel from '../models/Article.js';

class ArticleController {
    async fetchItems (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        console.log('here we are');
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await articleModel.getAll(1, limit, offset);
            return res.status(200).json({ count: data.size, items: data.items});
        }

    }
}

export default new ArticleController();
