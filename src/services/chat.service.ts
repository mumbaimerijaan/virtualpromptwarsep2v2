import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { getDb } from '../lib/firebase';
import { ChatRequest, ChatResponse, ChatMessage } from '../types/chat';

/**
 * Service to handle both Firestore chat persistence and AI backend interactions.
 */
export class ChatService {
  private static API_URL = '/api/chat';

  /**
   * Subscribes to real-time chat messages from Firestore.
   */
  static subscribeToMessages(sessionId: string, callback: (messages: any[]) => void) {
    const db = getDb();
    const messagesRef = collection(db, `chats/${sessionId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    }, (error) => {
      console.error("Firestore subscription error:", error);
    });
  }

  /**
   * Saves a message to Firestore.
   */
  static async saveMessage(sessionId: string, messageData: any) {
    const db = getDb();
    const messagesRef = collection(db, `chats/${sessionId}/messages`);
    
    return await addDoc(messagesRef, {
      ...messageData,
      createdAt: serverTimestamp()
    });
  }

  /**
   * Sends a prompt to the Gemini AI backend.
   */
  static async sendToAI(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get AI response');
      }

      return await response.json();
    } catch (error) {
      console.error('ChatService AI Error:', error);
      return {
        intent: 'ERROR',
        message: 'I am having trouble connecting to my knowledge base right now. Please try again later.',
        suggestions: ['Register as a voter', 'Check voter list', 'How to vote']
      };
    }
  }
}
