import locationModel from "../models/Location.js";
import coordinatesModel from "../models/Coordinates.js";
import videoModel from "../models/Video.js";
import imageModel from "../models/Image.js";
import sizeOf from 'image-size'


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
        const data = await coordinatesModel.fetchOne(req.params.id);
        console.log(data.item);
        if (data.item?.videos) {
            // selecting random video
            const videoData = await videoModel.findById(data.item.videos[0]);
            data.item.videoCode = videoData.code;
        }
        if (data.item?.images) {
            // selecting random video
            const imageData = await imageModel.findById(data.item.images[0]);
            data.item.image = imageData.name;
            const { height, width } = sizeOf(`${process.env.FS_UPLOAD_FOLDER}/photos/${imageData.name}`)
            // console.log("Image width", width);
            data.item.imgWidth = width;
            data.item.imgHeight = height;
            const imagesGallery = await imageModel.getGallery(data.item.images);
            imagesGallery.forEach((image, key) => {
                const { height, width } = sizeOf(`${process.env.FS_UPLOAD_FOLDER}/photos/${image.name}`);
                imagesGallery[key].imgWidth = width;
                imagesGallery[key].imgHeight = height;
                if (parseInt(data.item.main_image_id) === image.id) {
                    console.log("here we are");
                    data.item.mainImage = image.name;
                }
            })
            console.log(data.item.mainImage);
            if (!data.item.mainImage) {
                data.item.mainImage = imagesGallery[0].name
            }
            data.item.imageGallery = imagesGallery;
            // const videosGallery = await videoModel.getGallery(data.item.videos);
            data.item.videosGallery = await videoModel.getGallery(data.item.videos);;
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


    async setMainMarker(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const { id, countryId } = req.params;
            const data = await coordinatesModel.setMain(id, countryId);
            return res.status(200).json({ success: true, markers: data.markers });
        }
    }


    async updateMarker(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            await coordinatesModel.updateMarkerCoordinates(req.body.markerId, req.body.lat, req.body.lng);
            return res.status(200).json({ success: true });
        }
    }

}

export default new CoordinatesController();
