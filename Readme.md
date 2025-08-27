# ScholarSync AI - Complete Implementation

A comprehensive MERN stack application demonstrating all 15 AI topics from the learning.md file using the Google Gemini API.

## 🚀 Features

This project implements **ALL 15 AI topics** from the learning.md file:

### **1. Top-k Sampling**
- Controls word selection by considering only the top k most probable words
- Configurable k values (20, 40, 50) for different use cases
- Implemented in model configurations

### **2. Top-p (Nucleus Sampling)**
- Dynamic word selection based on cumulative probability
- Configurable p values (0.8, 0.9, 0.95) for different creativity levels
- Implemented in model configurations

### **3. Temperature**
- Controls creativity vs consistency in AI responses
- **0.2**: Factual, consistent (profile extraction)
- **0.6**: Balanced (conversation, recommendations)
- **1.0**: Creative, diverse (brainstorming)

### **4. Zero-shot Prompting**
- Extract student profiles directly without examples
- Natural language to structured data conversion
- `/api/ai/extract-profile/zero-shot` endpoint

### **5. One-shot Prompting**
- Establish patterns with one example
- Consistent profile format extraction
- `/api/ai/extract-profile/one-shot` endpoint

### **6. Multi-shot Prompting**
- Better pattern recognition with multiple examples
- Complex profile categorization
- `/api/ai/extract-profile/multi-shot` endpoint

### **7. Chain of Thought (CoT) Prompting**
- Step-by-step reasoning for scholarship matching
- Explains matching logic and calculates scores
- `/api/ai/matching/chain-of-thought` endpoint

### **8. Dynamic Prompting**
- Adjusts prompts based on context
- Handles international students, work experience, errors
- `/api/ai/extract-profile/dynamic` endpoint

### **9. Stop Sequences**
- Specific tokens to stop generation
- Clean profile data extraction
- Configurable stop sequences for different content types

### **10. Embeddings**
- Text to numerical vectors for similarity
- Profile-scholarship matching algorithm
- `/api/ai/embeddings/generate` and `/api/ai/embeddings/similarity` endpoints

### **11. Structured Output**
- Forces responses in specific JSON formats
- Schema validation and enforcement
- `/api/ai/extract-profile/structured` endpoint

### **12. Function Calling**
- AI capability to execute specific functions
- Database queries, API calls, filtering operations
- `/api/ai/function-calling` endpoint

### **13. Evaluation Dataset and Testing Framework**
- Systematic AI performance measurement
- Test cases with accuracy metrics
- `/api/ai/evaluate` endpoint

### **14. System and User Prompts**
- Different role messages in conversation
- Maintains conversation context
- `/api/ai/extract-profile/conversational` endpoint

### **15. Tokens and Tokenization**
- Cost optimization and estimation
- Context limit management
- `/api/ai/tokens/estimate` endpoint

## 🏗️ Architecture

### Backend (`scholarsync-backend/`)
- **Express.js** server with comprehensive middleware
- **MongoDB** with Mongoose for data persistence
- **Gemini API** integration with multiple model configurations
- **Rate limiting** and security middleware
- **Structured API** with proper error handling

### Frontend (`frontend/`)
- **React** with modern hooks and state management
- **Vite** for fast development and building
- **Responsive design** with CSS Grid and Flexbox
- **Interactive tabs** for each AI topic demonstration
- **Real-time API** communication with backend

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Gemini API key

### 1. Clone the repository
```bash
git clone <repository-url>
cd ScholarSync
```

### 2. Backend Setup
```bash
cd scholarsync-backend
npm install
```

Create `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/scholar-sync
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Start the application
```bash
# Terminal 1 - Backend
cd scholarsync-backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📱 Usage

### Interactive Demo
1. Open the frontend application
2. Enter text in the input area or use sample inputs
3. Navigate between different AI topic tabs
4. Click action buttons to see AI processing in action
5. View results with detailed model parameters

### API Endpoints
All AI functionality is available via REST API:

- **Profile Extraction**: `/api/ai/extract-profile/*`
- **Matching**: `/api/ai/matching/*`
- **Embeddings**: `/api/ai/embeddings/*`
- **Evaluation**: `/api/ai/evaluate`
- **Health Check**: `/api/ai/health`

### Sample API Calls

#### Zero-shot Profile Extraction
```bash
curl -X POST http://localhost:5000/api/ai/extract-profile/zero-shot \
  -H "Content-Type: application/json" \
  -d '{"text": "I am Sarah, a Computer Science student with 3.8 GPA"}'
```

#### Chain of Thought Matching
```bash
curl -X POST http://localhost:5000/api/ai/matching/chain-of-thought \
  -H "Content-Type: application/json" \
  -d '{"studentProfile": {"field": "CS", "gpa": 3.8}, "scholarship": {"field": "CS", "gpa_min": 3.5}}'
```

## 🔧 Configuration

### Model Configurations
The application provides three pre-configured models:

1. **Factual Model** (temperature: 0.2, topK: 20, topP: 0.8)
   - For profile extraction and code generation
   - High consistency and accuracy

2. **Balanced Model** (temperature: 0.6, topK: 40, topP: 0.9)
   - For conversation and recommendations
   - Natural but focused responses

3. **Creative Model** (temperature: 1.0, topK: 50, topP: 0.95)
   - For brainstorming and creative tasks
   - High diversity and creativity

### Customization
You can modify model parameters in `scholarsync-backend/config/gemini.js`:

```javascript
const models = {
  custom: genAI.getGenerativeModel({ 
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.5,    // Your custom temperature
      topK: 30,           // Your custom topK
      topP: 0.85,         // Your custom topP
      maxOutputTokens: 1200
    }
  })
};
```

## 📊 Performance & Monitoring

### Token Estimation
- Real-time token count estimation
- Cost calculation for API calls
- Context limit validation

### Evaluation Framework
- Automated test case execution
- Accuracy metrics calculation
- Performance benchmarking

### Health Monitoring
- API health checks
- Model configuration status
- Available endpoints listing

## 🚀 Deployment

### Backend Deployment
```bash
cd scholarsync-backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the dist/ folder to your hosting service
```

### Environment Variables
Ensure all required environment variables are set in production:
- `GEMINI_API_KEY`
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV`

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Request sanitization
- **Error Handling**: Secure error responses

## 📈 Future Enhancements

- **Real-time Chat**: WebSocket integration
- **Batch Processing**: Multiple profile extraction
- **Advanced Analytics**: Usage metrics and insights
- **Model Fine-tuning**: Custom model training
- **Multi-language Support**: Internationalization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the API documentation
2. Review the learning.md file for topic explanations
3. Open an issue on GitHub
4. Contact the development team

---

**Built with ❤️ using the latest AI technologies and best practices**