const axios = require('axios');
const Order = require('../models/Order');

const getSuggestion = async (req, res) => {
    try {
        // Get orders with populated product details
        const orders = await Order.find({ purchasedBy: req.user.userId })
            .populate({
                path: 'items.productId',
                select: 'name price'
            })
            .sort('-createdAt');

        // Format purchase history for Gemini
        const purchaseHistory = orders.map(order => ({
            orderTotal: order.totalAmount,
            status: order.status,
            items: order.items.map(item => ({
                productName: item.productId.name,
                quantity: item.quantity,
                price: item.productId.price
            }))
        }));

        // Call Gemini API
        const API_KEY = process.env.GEMINI_API_KEY;
        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

        const prompt = `
            Analyze this user's purchase history and provide:
            1. Spending patterns and trends
            2. Most frequently purchased items
            3. Cost-saving suggestions
            4. Recommendations for future purchases
            
            Purchase History:
            ${JSON.stringify(purchaseHistory)}
        `;

        const response = await axios.post(
            `${API_URL}?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        const suggestions = response.data.candidates[0]?.content?.parts[0]?.text;

        res.status(200).json({
            success: true,
            suggestions,
            purchaseHistory
        });

    } catch (error) {
        console.error('Suggestion Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate suggestions',
            error: error.message
        });
    }
};

module.exports = { getSuggestion };