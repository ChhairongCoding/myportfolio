import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// Ensure the application has a fallback or descriptive warning if the key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chatbot will run in mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || 'MOCK_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const AI_TWIN_PROMPT = `
You are the AI Twin and virtual assistant of Rong Chhin, a highly talented Creative Full-Stack Developer & UI/UX Designer.
You reside on his personal portfolio website. Your purpose is to engage visitors, answer questions about Rong's skills, experience, projects, and work philosophy, and represent him professionally and enthusiastically.

Your traits:
- Warm, professional, intelligent, and creative.
- Enthusiastic about design-technology synergy (bridging beauty with code).
- Helpful and conversational, responding with concise, formatted answers (using markdown where appropriate).

Rong's core details:
- Name: Rong Chhin
- Role: Creative Full-Stack Developer & UI/UX Designer
- Email: chhinchhairong18@gmail.com
- Phone: +1 (404) 555-9876
- Location: Atlanta, GA, USA
- Education: Savannah College of Art and Design (SCAD), B.F.A in Interactive Design (2020-2024)
- Current Work: Lead UI/UX Designer & Frontend Developer at PixelPerfect Creative (2025-Present)
- Key Projects:
  1. Flowstate (distraction-free writer with ambient syntheziser)
  2. Prism Studio (comprehensive Figma & code design system)
  3. Synapse AI (3D graph document relationships mapper powered by Gemini AI)
  4. Vertex Wallet (beautiful mobile cryptocurrency mockup)
- Key Tech Skills: Java, Spring Boot, Database (SQL & NoSQL, Supabase, Firebase), Mobile App Dev (Flutter), React, HTML5/CSS3, Git.
- Soft Skills: Collaboration & Teamwork, Communication, Problem Solving, Adaptability & Learning.

Guidelines:
1. Always speak in the first person plural or as "Rong's AI Twin" (e.g. "Rong is currently...", "I am Rong's AI Twin, I can tell you that...").
2. Be friendly and confident. Keep answers under 120 words unless asked for a deep breakdown.
3. If asked about hiring or contacting Rong, give his email (chhinchhairong18@gmail.com) and direct them to the Contact Form on the page.
4. Do not make up facts that aren't provided. If a visitor asks about personal topics outside of his design/dev career, politely steer the conversation back to his work.
5. If the user submits a message to him, thank them on his behalf!
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for the AI Twin Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        // Return a professional mock response if API key is not configured
        const fallbackAnswers = [
          "Hello! I am Rong's AI Twin. Since my Gemini API key is currently being set up, I can answer your questions with my pre-loaded knowledge base. What would you like to know about my projects, such as Flowstate, or my education at SCAD?",
          "I'd love to tell you more about Rong's design work! Rong graduated from SCAD with a B.F.A. in Interactive Design and is currently working as a Lead UI/UX Designer & Frontend Developer.",
          "You can contact Rong directly at chhinchhairong18@gmail.com or leave a message in the Contact Form below. He'll get back to you right away!",
          "That's an interesting question! For now, feel free to explore the interactive tabs on my portfolio to see all my technical and design projects, including Synapse AI and Vertex Wallet."
        ];
        // Select a random answer or match keywords
        let reply = fallbackAnswers[0];
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('project') || lowerMessage.includes('flowstate') || lowerMessage.includes('synapse')) {
          reply = "Rong's featured projects include Flowstate (a writing platform with web sound synth), Synapse AI (a 3D document relation graph), and Vertex Mobile Wallet. You can see detailed metrics for each in the Projects section!";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email')) {
          reply = "You can reach Rong directly at chhinchhairong18@gmail.com, or fill out the Contact Form. He'll get back to you right away!";
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('figma') || lowerMessage.includes('java') || lowerMessage.includes('database') || lowerMessage.includes('mobile') || lowerMessage.includes('supabase') || lowerMessage.includes('firebase') || lowerMessage.includes('soft')) {
          reply = "Rong's core development stack includes Java, Spring Boot, Database (SQL & NoSQL), Mobile App Dev (Flutter), React, Supabase, and Firebase. He also possesses strong soft skills like Collaboration, Communication, Problem Solving, and Adaptability.";
        }

        return res.json({ reply });
      }

      const client = getGeminiClient();

      // Structure chat contents including the history
      // Express chat history in the format required by the GoogleGenAI chats API,
      // or we can pass it directly to models.generateContent with systemInstructions.
      // Let's use the chats API or build the contents manually for maximum reliability.
      const formattedContents: any[] = [];

      // Add conversation history
      if (Array.isArray(history)) {
        history.forEach((msg: any) => {
          formattedContents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        });
      }

      // Add current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: AI_TWIN_PROMPT,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I apologize, but I couldn't generate a response. Please try again.";
      return res.json({ reply: replyText });

    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      return res.status(500).json({
        error: 'Failed to communicate with AI Twin.',
        details: error.message
      });
    }
  });

  // Serve static files / Vite HMR
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
