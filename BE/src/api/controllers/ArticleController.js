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
    async fetchItem (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            // const formData = {
            //     id: null,
            //     title: "Edit Happend11111",
            //     title_image: "",
            //     article_text: "AAAAAAAAAAAA",
            //     status: true,
            //     created_at: null,
            //     updated_at: null,
            // };

            const data = await articleModel.fetchOne(1);
            return res.status(200).json({ item: data.item});
        }
    }

    async addItem (req, res) {

        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await articleModel.update(formData);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async bulkDelete (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const ids = [];
        JSON.parse(req.body.data).filter(id => id.checked).forEach(data => ids.push(data.id));
        await articleModel.bulkDelete(ids, req.user.id);

        return res.status(200).json({ success: true });
    }


    async editItem (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const dataItem = req.body;

        if (!dataItem.id) {
            await articleModel.create(dataItem, req.user.id);
        } else {
            await articleModel.update(dataItem, req.user.id);
        }
        return res.status(200).json({ success: true });
    }


    async deleteRow (req, res) {
        const ids = [];
        ids.push(req.params.id);
        await articleModel.bulkDelete(ids, req.user.id);
        //
        return res.status(200).json({ success: true });
    }


}

export default new ArticleController();
