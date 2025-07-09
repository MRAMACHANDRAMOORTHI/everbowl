import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Card } from '../ui/Card';
import { Mail, Clock } from 'lucide-react';

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: any;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactMessage[];
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
        <Mail className="w-6 h-6 text-emerald-600" />
        <span>Contact Messages</span>
      </h2>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-lg">No messages received yet</p>
        </div>
      )}

      {messages.map((msg) => (
        <Card key={msg.id} className="p-6 shadow border-l-4 border-emerald-500">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {msg.firstName} {msg.lastName}
              </h3>
              <p className="text-sm text-gray-500">{msg.email} | {msg.phone}</p>
            </div>
            <span className="text-xs text-gray-400 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>
                {msg.createdAt?.toDate().toLocaleString() || '—'}
              </span>
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-1">
            <strong>Subject:</strong> {msg.subject}
          </div>
          <p className="text-gray-800">{msg.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default ContactMessages;
