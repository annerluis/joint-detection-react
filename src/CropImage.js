import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './App.css';
/**
 * Crop an image based on given coordinates and dimensions.
 *
 * @param {HTMLImageElement} image - The image element to be cropped.
 * @param {number} x - The x coordinate of the top-left corner of the crop area.
 * @param {number} y - The y coordinate of the top-left corner of the crop area.
 * @param {number} width - The width of the crop area.
 * @param {number} height - The height of the crop area.
 * @returns {Promise<string>} A promise that resolves to the cropped image to base64.
 */

function CropImage(joint,base64Image){
/*
    return new Promise((resolve, reject) => {
        console.log(joint)
        const image = new Image();
        image.src = base64Image;

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = joint.width;
            canvas.height = joint.height;

            ctx.drawImage(
                image,
                joint.x,
                joint.y,
                joint.width,
                joint.height,
                0,
                0,
                joint.width,
                joint.height
            )
            
            resolve(canvas.toDataURL('image/png'))
        }
        image.onerror = (error) => {
            reject(new Error('Failed to load image during crop'));
        }
        
    });*/
}
export default CropImage;