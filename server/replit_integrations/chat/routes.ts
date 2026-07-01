import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import { chatStorage } from "./storage";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SYSTEM_PROMPT = `You are the AI Support Assistant for iThing Smart Business Solutions (iThing لتطوير حلول الأعمال الذكية).

## About iThing
iThing is a leading technology company specializing in AI, data analytics, cloud services, and Software Development development. We help businesses transform digitally and leverage cutting-edge technology for growth.

## Our Services
1. **Data Analytics / AI** - Transform data into actionable insights with advanced analytics and AI-powered solutions
2. **Consulting** - Expert technology consulting for digital transformation and process optimization
3. **IoT (Internet of Things)** - Connect and automate operations with smart devices and real-time monitoring
4. **Custom Development** - Tailored software solutions built to meet unique business requirements
5. **SaaS** - Cloud-based software solutions with flexibility and scalability
6. **AaaS (Analytics as a Service)** - On-demand data analytics without infrastructure complexity
7. **Digital Transformation** - End-to-end strategies to modernize businesses for the digital age
8. **Agentic AI** - Next-generation autonomous AI agents that reason, plan, and execute complex tasks

## Office Locations
- **Amman, Jordan (Headquarters)**: P.O. Box 11194, Amman, Jordan
- **Dubai, UAE**: Dubai Office

## Contact
- Website: iThing Smart Business Solutions
- For inquiries, users can fill out the contact form on our website

## Your Role
- You are a helpful, professional support assistant
- Answer questions about our services, capabilities, and how we can help businesses
- Be friendly but professional
- If asked about pricing, mention that pricing varies by project and encourage them to contact us through the website form
- Respond in the same language the user uses (Arabic or English)
- Keep responses concise but informative
- If you don't know something specific, offer to connect them with our team through the contact form`;

export function registerChatRoutes(app: Express): void {
  // Get all conversations
  app.get("/api/conversations", async (req: Request, res: Response) => {
    try {
      const conversations = await chatStorage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get single conversation with messages
  app.get("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await chatStorage.getConversation(id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      const messages = await chatStorage.getMessagesByConversation(id);
      res.json({ ...conversation, messages });
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  // Create new conversation
  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const conversation = await chatStorage.createConversation(
        title || "New Chat"
      );
      res.status(201).json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Delete conversation
  app.delete("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await chatStorage.deleteConversation(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  });

  // Send message and get AI response (streaming)
  app.post(
    "/api/conversations/:id/messages",
    async (req: Request, res: Response) => {
      try {
        const conversationId = parseInt(req.params.id);
        const { content } = req.body;

        // Save user message
        await chatStorage.createMessage(conversationId, "user", content);

        // Get conversation history for context
        const messages = await chatStorage.getMessagesByConversation(
          conversationId
        );
        const chatMessages: Array<{
          role: "system" | "user" | "assistant";
          content: string;
        }> = [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ];

        // Set up SSE
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Stream response from OpenAI
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: chatMessages,
          stream: true,
          max_completion_tokens: 1024,
        });

        let fullResponse = "";

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            fullResponse += content;
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }

        // Save assistant message
        await chatStorage.createMessage(
          conversationId,
          "assistant",
          fullResponse
        );

        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      } catch (error) {
        console.error("Error sending message:", error);
        // Check if headers already sent (SSE streaming started)
        if (res.headersSent) {
          res.write(
            `data: ${JSON.stringify({ error: "Failed to send message" })}\n\n`
          );
          res.end();
        } else {
          res.status(500).json({ error: "Failed to send message" });
        }
      }
    }
  );
}
