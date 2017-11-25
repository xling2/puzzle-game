import {
    ImageEditor,
    Image,
    Dimensions
} from "react-native";
const WIDTH = Dimensions.get("window").width;
export default class Croper {


    constructor(imageUri) {
        this.imageUri = imageUri;

    }


    // transfer promise method
    _cropImage(img, cropData) {
        return new Promise(function (resolve, reject) {
            ImageEditor.cropImage(img, cropData, resolve, reject);

        });
    };

    // get size of the image
    _getSize(img) {
        return new Promise(function (resolve, reject) {
            Image.getSize(img, (width, height) => {
                resolve({width, height})
            }, reject);

        });
    };


    async crop(column, row) {
        //return value
        let result = {};
        //get height and width
        let {width: imgWidth, height: imgHeight} = await this._getSize(this.imageUri);
        //crop the image
        let _column = column;
        let _row = row;
        let _columnWidth = imgWidth / _column;
        let _rowHeight = imgHeight / _row;


        result.width = _columnWidth;
        result.height = _rowHeight;
        result.imageList = [];
        let index = 0;
        for (let r = 0; r < _row; r++) {
            for (let c = 0; c < _column; c++) {
                let _cropData = {
                    offset: {
                        x: c * _columnWidth,
                        y: r * _rowHeight,
                    },
                    size: {
                        width: _columnWidth,
                        height: _rowHeight,
                    },
                }

                let uri = await this._cropImage(this.imageUri, _cropData);
                result.imageList.push({
                    uri: uri,
                    width: _columnWidth,
                    height: _rowHeight,
                    fullWidth: WIDTH / _column,
                    fullHeight: (WIDTH / imgWidth) * imgHeight / _row,
                    index: index++,
                    r: r,
                    c: c,
                });
            }


        }
        return result;
    }
}