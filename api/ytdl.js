const express = require('express');
const { ytdown } = require("nayan-media-downloader");

exports.config = {
    name: 'ytdl',
    author: 'Jmlabaco',
    category: 'tools',
    description: 'An API to download YouTube videos using the provided URL.',
    usage: ['/ytdl?link=https://youtu.be/QNV2DmBxChQ?si=WVJ-wOiw4Q6FqzFY']
};

exports.initialize = async function ({ req, res }) {
    const videoUrl = req.query.link;

    if (!videoUrl) {
        return res.status(400).send({ error: 'No video URL provided.' });
    }

    try {
        const downloadResponse = await ytdown(videoUrl);

        delete downloadResponse.developer;
        delete downloadResponse.devfb;
        delete downloadResponse.devwp;

        return res.status(200).send(downloadResponse);
    } catch (error) {
        console.error('Error downloading video:', error);
        return res.status(500).send({ error: 'Failed to download video.' });
    }
};
