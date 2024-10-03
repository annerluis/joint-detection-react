/* eslint-disable no-restricted-globals */

self.onmessage = function (event) {
    const { image, jointData } = event.data;
    cropImage(image,jointData)
        .then((croppedImage) => {
            self.postMessage({croppedImage});
        })
        .catch((error) => {
            console.error("Error cropping image in worker: ",error);
            self.postMessage({error});
        });
};

async function cropImage(imageDataURL, jointData){
    const img = await loadImage(imageDataURL);

    const canvas = new OffscreenCanvas(jointData.width, jointData.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        img, 
        jointData.x, jointData.y,
        0,0,
        jointData.width, jointData.height
    );

    return canvasToFile(canvas);
}
function loadImage(src){//base64 to data URL
    return new Promise((resolve,reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function canvasToFile(canvas){
    const blob = canvas.convertToBlob();
    return new File([blob], 'cropped-image.png', { type: blob.type });
}
/*
function canvasToDataUrl(canvas) {//canvas to data url 
    return canvas.convertToBlob().then((blob) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    });
}

//canvas to base64, depending on what the model requires
function canvasToBase64(canvas) {
    return canvas.convertToBlob().then((blob) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Extract Base64 part by removing the Data URL prefix
                const dataUrl = reader.result;
                const base64 = dataUrl.split(",")[1]; // Get the Base64 part
                resolve(base64);
            };
            reader.readAsDataURL(blob);
        });
    });
}
*/
