const { ytdown } = require("nayan-media-downloader");

exports.config = {
    name: 'ytdl',
    author: 'Jmlabaco',
    category: 'tools',
    description: 'An API to download YouTube videos using the provided URL.',
    usage: ['/ytdl?link=https://youtu.be/QNV2DmBxChQ?si=WVJ-wOiw4Q6FqzFY']
};

exports.initialize = async function ({ req, res }) {
    // Get the video URL from the query parameters
    const videoUrl = req.query.link;

    if (!videoUrl) {
        return res.status(400).send({ error: 'No video URL provided.' });
    }

    try {
        // Download the video
        const downloadUrl = await ytdown(videoUrl);
        
        // Respond with the download URL
        return res.status(200).send({ downloadUrl });
    } catch (error) {
        // Handle any errors that occur during the download process
        console.error('Error downloading video:', error);
        return res.status(500).send({ error: 'Failed to download video.' });
    }
};
