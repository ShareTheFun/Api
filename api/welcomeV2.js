const { WelcomeBuilder } = require('discord-card-canvas');
const fs = require('fs');

// API config details
exports.config = {
    name: 'welcomeV2',
    author: 'Your Name',
    description: 'Generates a welcome image using WelcomeBuilder',
    category: 'canvas',
    usage: ['/welcomeV2?nickname=lanceajiro&secondText=Have a nice day&avatar=https://imgur.com/xwCoQ5H.jpg']
};

// Initialize API to create welcome image
exports.initialize = async function ({ req, res }) {
    try {
        const { nickname, secondText, avatar } = req.query;

        // Check if the required query parameters are present
        if (!nickname || !secondText || !avatar) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        // Create the welcome image with the provided parameters
        const cv = await new WelcomeBuilder({
            fontDefault: 'Inter',
            nicknameText: { color: '#0CA7FF', content: nickname },
            secondText: { color: '#0CA7FF', content: secondText },
            avatarImgURL: avatar
        }).build();

        // Save the welcome image to a buffer
        const buffer = cv.toBuffer();

        // Set appropriate headers and send the image as a response
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        console.error("Error creating welcome image:", error);
        res.status(500).json({ error: "Failed to create welcome image" });
    }
};
