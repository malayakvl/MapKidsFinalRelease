import locationModel from '../models/Location.js';
import coordinatesModel from '../models/Coordinates.js';

class LocationController {
    async fetchItems (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.getAll(1, limit, offset);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }

    async fetchItem (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.fetchOne(req.params.id);
            if (!data.item.images) {
                data.item.images = [];
            }
            if (!data.item.videos) {
                data.item.videos = [];
            }
            return res.status(200).json({ item: data.item});
        }
    }

    async addMarker (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const { lat, lng, countryId } = req.query;
            await coordinatesModel.saveMarker(lat, lng, countryId);
            return res.status(200).json({success: true});
        }
    }

    async fetchItems1 (req, res) {
        const { countryId } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.getAll(1, limit, offset);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }


    async activeItems (req, res) {
        const data = await locationModel.activeItems();
        return res.status(200).json({ count: data.size, items: data.items});

        // if (!req.user) {
        //     return res.status(401).json('Access deny');
        // } else {
        //     const data = await locationModel.activeItems();
        //     console.log(data);
        //     return res.status(200).json({ count: data.size, items: data.items});
        // }
    }

    async unactiveItem (req, res) {
        const { id } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.activeAction(id, 2);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }


    async editItem (req, res) {
        const { id } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.fetchOne(id);
            if (!data.images) {
                data.images = [];
            }
            if (!data.videos) {
                data.videos = [];
            }
            data.fillColor = data.fill_color;
            data.fillOpacity = data.fill_opacity;
            return res.status(200).json({ item: data});
        }
    }


    async updateItem (req, res) {
        const dataCountry = req.body;
        const parsedDataImages = JSON.parse(req.body.data.images);
        const parsedDataVideos = JSON.parse(req.body.data.videos);
        const imageIds = [];
        if (parsedDataImages.length) {
            parsedDataImages.forEach(data => {
                if (data.checked) {
                    imageIds.push(data.id);
                }
            })
        }
        const videoIds = [];
        if (parsedDataVideos.length) {
            parsedDataVideos.forEach(data => {
                if (data.checked) {
                    videoIds.push(data.id);
                }
            })
        }
        const updatedData = {
            images: imageIds,
            videos: videoIds,
            fillColor: dataCountry.data.fillColor,
            fillOpacity: dataCountry.data.fillOpacity,
            description: dataCountry.data.description
        }
        console.log("Updated Data", updatedData);
        await locationModel.updateRecord(updatedData, dataCountry.countryData.id);
        // await coun
        // console.log("query:", query);
        // console.log("query select:", querySelect);
        // console.log("images IDS:", countryIds);
        // console.log("countryId:", dataCountry.countryData.id);
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            // const data = await locationModel.activeAction(id, 2);
            return res.status(200).json({ item: {name: 'Test', id: 235}});
        }
    }
}

export default new LocationController();
