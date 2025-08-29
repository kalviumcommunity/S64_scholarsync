# Generative AI Topics - Complete Explanation

## **1. Top-k Sampling**
**What it is**: When generating AI responses, only considers the top k most probable words

**Example**:
```
Next word options: ["the"(0.4), "a"(0.3), "an"(0.2), "some"(0.05), "my"(0.03), "your"(0.02)]
If k=3: will only choose from ["the", "a", "an"]
```

**Use in ScholarSync**: For consistent keyword generation in profile extraction
- Need predictable output when extracting student skills
- Use k=20-40 for proper technical terms

---

## **2. Top-p (Nucleus Sampling)**
**What it is**: Considers words up to cumulative probability p (dynamic selection)

**Example**:
```
Words: ["good"(0.5), "great"(0.3), "excellent"(0.15), "amazing"(0.04), "fantastic"(0.01)]
p=0.9: "good"+"great"+"excellent" = 0.95 > 0.9, so considers these 3 words
```

**Use in ScholarSync**: For variety when generating scholarship descriptions
- Use p=0.8-0.9 for natural language responses

---

## **3. Temperature**
**What it is**: Controls creativity vs consistency

**Values**:
- **0.1-0.3**: Factual, consistent (code generation)
- **0.5-0.7**: Balanced (normal conversation)  
- **0.8-1.2**: Creative, diverse (story writing)

**Use in ScholarSync**:
```javascript
// Profile extraction - Low temperature (0.2)
extractProfile(text, temperature: 0.2) // Consistent JSON output

// Recommendation text - Medium temperature (0.6) 
generateRecommendation(profile, temperature: 0.6) // Natural but focused
```

---

## **4. Zero-shot Prompting**
**What it is**: Performing tasks directly without examples

**Example**:
```
Prompt: "Extract skills from: 'I know Python, React and have 3 years ML experience'"
Output: {"skills": ["Python", "React", "Machine Learning"], "experience": "3 years"}
```

**Use in ScholarSync**: 
- Student profile parsing
- Scholarship eligibility checking
- Direct natural language to structured data conversion

---

## **5. One-shot Prompting**
**What it is**: Establishing patterns with one example

**Example**:
```
Example: "Computer Science student with 3.8 GPA" → {"field": "CS", "gpa": 3.8}
Task: "Mechanical Engineering student with 3.5 GPA" → ?
Output: {"field": "Mechanical", "gpa": 3.5}
```

**Use in ScholarSync**: For profile format consistency

---

## **6. Multi-shot Prompting**  
**What it is**: Better pattern recognition with multiple examples

**Example**:
```
Examples:
"Need financial aid for tuition" → financial_need: high
"Parents can partially support" → financial_need: medium  
"Fully funded by family" → financial_need: low

Task: "Struggling to pay fees" → ?
Output: financial_need: high
```

**Use in ScholarSync**: Complex profile categorization

---

## **7. Chain of Thought (CoT) Prompting**
**What it is**: Showing step-by-step reasoning

**Example**:
```
Problem: "Match student with scholarship"

CoT Process:
1. Student profile: CS major, 3.7 GPA, financial need
2. Scholarship requirements: Tech field, 3.5+ GPA, need-based  
3. Field match: ✓ (CS is tech)
4. GPA match: ✓ (3.7 > 3.5)
5. Need match: ✓ (both need-based)
6. Result: 95% match score
```

**Use in ScholarSync**: Explaining matching logic

---

## **8. Dynamic Prompting**
**What it is**: Adjusting prompts based on context

**Example**:
```javascript
// Base prompt
let prompt = "Extract student information from text"

// Dynamic adjustments
if (previousError) prompt += " Ensure JSON format is valid"
if (userType === "international") prompt += " Include visa status"
if (hasGPA) prompt += " Convert GPA to 4.0 scale"
```

**Use in ScholarSync**: Adjusting extraction logic based on user input

---

## **9. Stop Sequences**
**What it is**: Specific tokens to stop generation

**Example**:
```javascript
const stopSequences = ["END_PROFILE", "---", "\n\n"]

Generated: "Name: John, Skills: Python, Java END_PROFILE More random text..."
Stopped at: "Name: John, Skills: Python, Java "
```

**Use in ScholarSync**: Clean profile data extraction

---

## **10. Embeddings**
**What it is**: Converting text to numerical vectors for similarity

**Example**:
```javascript
student_profile = "Computer Science, Machine Learning, 3.8 GPA"
scholarship = "AI research scholarship for CS students"

student_embedding = [0.2, 0.8, 0.1, -0.3, ...] // 1536 dimensions
scholarship_embedding = [0.3, 0.7, 0.2, -0.2, ...]

similarity = cosine_similarity(student_embedding, scholarship_embedding) // 0.89
```

**Use in ScholarSync**: Profile-scholarship matching algorithm

---

## **11. Structured Output**
**What it is**: Forcing responses in specific formats

**Example**:
```javascript
// Force JSON output
const schema = {
  name: "string",
  skills: ["string"],
  gpa: "number",
  financial_need: "enum[low,medium,high]"
}

Input: "I'm Sarah, know Python and React, have 3.6 GPA, need scholarship badly"
Output: {
  "name": "Sarah",
  "skills": ["Python", "React"], 
  "gpa": 3.6,
  "financial_need": "high"
}
```

**Use in ScholarSync**: Database-ready profile extraction

---

## **12. Function Calling**
**What it is**: AI capability to execute specific functions

**Example**:
```javascript
const functions = [
  {
    name: "search_scholarships",
    description: "Search scholarships by criteria",
    parameters: {
      field: "string",
      gpa_min: "number",
      amount_min: "number"
    }
  }
]

AI Response: 
"I'll search for scholarships for you"
Function Call: search_scholarships(field="Computer Science", gpa_min=3.5, amount_min=5000)
```

**Use in ScholarSync**: Database queries, API calls, filtering operations

---

## **13. Evaluation Dataset and Testing Framework**
**What it is**: Systematic way to measure AI performance

**Example**:
```javascript
// Test cases for ScholarSync
const testCases = [
  {
    input: "CS student with 3.8 GPA needing financial aid",
    expected_output: {field: "Computer Science", gpa: 3.8, need: "high"},
    actual_output: {field: "CS", gpa: 3.8, need: "high"},
    accuracy: 0.95
  }
]

// Metrics
precision = correct_extractions / total_extractions
recall = found_scholarships / relevant_scholarships  
f1_score = 2 * (precision * recall) / (precision + recall)
```

**Use in ScholarSync**: Testing profile extraction accuracy

---

## **14. System and User Prompts**
**What it is**: Different role messages in conversation

**Example**:
```javascript
const conversation = [
  {
    role: "system",
    content: "You are a scholarship matching expert. Extract student profiles accurately."
  },
  {
    role: "user", 
    content: "I'm studying computer science, have 3.7 GPA, need financial help"
  },
  {
    role: "assistant",
    content: '{"field": "Computer Science", "gpa": 3.7, "financial_need": "high"}'
  }
]
```

**Use in ScholarSync**: Maintaining conversation context

---

## **15. Tokens and Tokenization**
**What it is**: Breaking text into processable pieces

**Example**:
```javascript
Text: "Hello ScholarSync!"
Tokens: ["Hello", " Scholar", "Sync", "!"]
Token Count: 4
Cost Calculation: 4 tokens × $0.002/1000 = $0.000008
```

**Important for ScholarSync**:
- Cost optimization (shorter prompts = less cost)
- Context limits (max 4096 tokens per request)
- Processing efficiency

---

# **ScholarSync Implementation Examples**

## **Real Code Examples:**

### **1. Zero-shot Profile Extraction:**
```javascript
// src/services/profileExtraction.js
const extractProfile = async (naturalLanguageText) => {
  const prompt = `Extract student profile from: "${naturalLanguageText}"
  Return JSON: {name, skills[], gpa, field, financial_need, location}`;
  
  return await openai.completions.create({
    model: "gpt-3.5-turbo",
    prompt: prompt,
    temperature: 0.2, // Low for consistency
    max_tokens: 300,
    stop: ["END_PROFILE"]
  });
}
```

### **2. Embedding-based Matching:**
```javascript
// src/services/matchingEngine.js  
const findMatches = async (studentProfile, scholarships) => {
  const studentEmbedding = await getEmbedding(studentProfile);
  
  const matches = scholarships.map(scholarship => {
    const scholarshipEmbedding = getEmbedding(scholarship);
    const similarity = cosineSimilarity(studentEmbedding, scholarshipEmbedding);
    return { scholarship, similarity };
  });
  
  return matches.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
}
```

### **3. Dynamic Prompting:**
```javascript
// src/utils/promptBuilder.js
const buildPrompt = (userInput, context) => {
  let basePrompt = "Extract student information";
  
  if (context.hasErrors) basePrompt += " Ensure valid JSON format";
  if (context.isInternational) basePrompt += " Include visa status";
  if (context.hasWorkExp) basePrompt += " Extract work experience";
  
  return `${basePrompt}: "${userInput}"`;
}
```

### **4. Structured Output Schema:**
```javascript
// src/schemas/studentProfile.js
const profileSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    skills: { type: "array", items: { type: "string" } },
    gpa: { type: "number", minimum: 0, maximum: 4 },
    field: { type: "string" },
    financial_need: { enum: ["low", "medium", "high"] }
  },
  required: ["name", "field"]
}
```

All these topics are practically implemented in ScholarSync! You can discuss both the theory and real implementation of these concepts in interviews.