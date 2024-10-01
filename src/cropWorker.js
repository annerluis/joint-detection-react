//message listener for worker thread
self.onmessage = function (event) {
    const { image, jointData } = event.data;
    const result = cropImage(image, jointData);
    self.postMessage({result})
}

//crop function
const cropImage = (image, jointData) => {//crops each joint from original xray image
    return new Promise ((resolve,reject) => {
        const jointImage = new Image();
        jointImage.src = image;

        jointImage.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = jointData.width;
            canvas.height = jointData.height;

            ctx.drawImage(
                jointImage,
                jointData.x, jointData.y,
                0,0,
                jointData.width, jointData.height
            );

            const croppedImage = canvas.toDataURL('joint/png');
            resolve(croppedImage);
        };

        jointImage.onerror = () => {
            reject(new Error("Failed to load image"));
        };
    });
}