import locationModel from "../models/Location.js";
import coordinates from "../models/Coordinates.js";
import videoModel from "../models/Video.js";
import imageModel from "../models/Image.js";


class CoordinatesController {
    async saveMarker(req, res) {
        let error;
        const testData = [
            {id: 1, title: 'Page 1'},
            {id: 2, title: 'Page 2'}
        ];
        if (testData) res.status(200).json({data: testData});
        if (error) res.status(error.code).json({error: 'Show error message'});
    }

    async activeMarkers (req, res) {
        const data = await locationModel.fetchMarkers();
        return res.status(200).json({ count: data.size, items: data.items});
    }


    async fetchMarkers (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await locationModel.fetchMarkers();
            return res.status(200).json({ items: data.items});
        }
    }

    async fetchItem (req, res) {

        const data = await coordinates.fetchOne(req.params.id);
        if (data.item?.videos) {
            // selecting random video
            const videoData = await videoModel.findById(data.item.videos[0]);
            data.item.videoCode = videoData.code;
        }
        if (data.item?.images) {
            // selecting random video
            const imageData = await imageModel.findById(data.item.images[0]);
            data.item.image = imageData.name;
            // getting images gallery
            const imagesGallery = await imageModel.getGallery(data.item.images);
            data.item.imageGallery = imagesGallery;
            const videosGallery = await videoModel.getGallery(data.item.videos);
            data.item.videosGallery = videosGallery;
        }
        // getting gallery info
        if (!data.item.images) {
            data.item.images = [];
        }
        if (!data.item.videos) {
            data.item.videos = [];
        }
        return res.status(200).json({ item: data.item});
    }

}

export default new CoordinatesController();