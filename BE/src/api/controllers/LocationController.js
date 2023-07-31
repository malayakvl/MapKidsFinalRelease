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

    async fetchMarkers (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            // const data = await locationModel.fetchMarkers();
            // console.log(data);
            return res.status(200).json({ items: []});
        }
    }

    async addMarker (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const { lat, lng, countryId } = req.query;
            await coordinatesModel.saveMarker(lat, lng, countryId);
            const markersRes = await coordinatesModel.getCountryMarkers(countryId);
            return res.status(200).json({success: true, markersList: markersRes.markers});
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

    async activeMarkers (req, res) {
        const data = await locationModel.fetchMarkers();
        return res.status(200).json({ count: data.size, items: data.items});
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

    async updateOpacity (req, res) {
        const { opacity, countryId } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            await locationModel.updateOpacity(opacity, countryId);
            return res.status(200).json({ success: true});
        }
    }

    async updateColor (req, res) {
        const { color, countryId } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            await locationModel.updateColor(color, countryId);
            return res.status(200).json({ success: true});
        }
    }

    async removeMarker (req, res) {
        const { markerId, countryId } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            await locationModel.removeMarker(markerId);
            const markersRes = await coordinatesModel.getCountryMarkers(countryId);
            return res.status(200).json({success: true, markersList: markersRes.markers});
        }
    }

    async updateItem (req, res) {
        const dataCountry = req.body;
        const parsedDataImages = JSON.parse(req.body.data.images);
        const parsedDataVideos = JSON.parse(req.body.data.videos);
        const newImageIds = JSON.parse(req.body.data.newImages);
        const newVideoIds = JSON.parse(req.body.data.newVideos);
        const locationId = req.body.data.locationId;
        const iconData = req.body.data.icon;
        const titleImageId = req.body.data.titleImageId;
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
        // console.log("TITLE IMAGE ID", titleImageId);
        // console.log("SELECTED VIDEOS", newVideoIds);
        // console.log("TITLE VALUE", req.body.data.title);
        // console.log("DESCRIPTION VALUE", req.body.data.description);

        const updatedData = {
            images: imageIds,
            videos: videoIds,
            newVideoIds: newVideoIds,
            newImageIds: newImageIds,
            fillColor: dataCountry.data.fillColor,
            fillOpacity: dataCountry.data.fillOpacity,
            description: req.body.data.description,
            title: req.body.data.title,
            icon: req.body.data.icon
        }
        await locationModel.updateRecord(updatedData, dataCountry.countryData.id, locationId);
        const markersRes = await coordinatesModel.getCountryMarkers(dataCountry.countryData.id);
        if (titleImageId) {
            await locationModel.updateMain(dataCountry.countryData.id, locationId, titleImageId);
        }

        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            // const data = await locationModel.activeAction(id, 2);
            return res.status(200).json({ markersList: markersRes.markers, success: true});
        }
    }


}

export default new LocationController();
