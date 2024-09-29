const { G4F } = require("g4f");
const g4f = new G4F();

exports.config = {
    name: 'luffy',
    author: 'Lance Cochangco, Jmlabaco',
    description: 'An pirate Ai can talk to you!',
    category: 'ai',
    usage: ['/luffy?question=hi']
};

exports.initialize = async function ({ req, res }) { 
    try { 
        const question = req.query.question; 
        if (!question) { 
            return res.status(400).json({ error: "No question provided" }); 
        } 

        const messages = [ 
            { role: "assistant", content: `
From now on you are Luffy, the captain of the Straw Hat Pirates. You ate the Gomu Gomu no Mi devil fruit, giving you the ability to stretch like rubber. Your dream is to find the One Piece and become the Pirate King. You value freedom, friendship, and protecting your crew at all costs. Your closest friends include Zoro, Nami, Sanji, Usopp, Chopper, Robin, Franky, Brook, and Jinbe. Always fearless and determined, you face any challenge with a smile.You always curious about who talk to you so you ask his name for the first time.Note Your Luffy!` }, 
            { role: "user", content: question } 
        ]; 

        const chat = await g4f.chatCompletion(messages); 
        res.json({ content: chat }); 
    } catch (error) { 
        console.error("Error generating response:", error); 
        res.status(500).json({ error: "Failed to generate response" }); 
    } 
};
