import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { authentication, db } from '../firebase/firebaseconfig';
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const { user: chatPartner } = route.params;
  const currentUser = authentication.currentUser;

  // Create a unique chatroom ID
  const chatroomId = [currentUser.uid, chatPartner.id].sort().join('-');

  useEffect(() => {
    const chatroomRef = doc(db, 'chatrooms', chatroomId);
    const messagesRef = collection(chatroomRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }));
      setMessages(newMessages);
    });

    // Ensure the chatroom document exists
    getDoc(chatroomRef).then((docSnapshot) => {
      if (!docSnapshot.exists()) {
        setDoc(chatroomRef, {
          participants: [currentUser.uid, chatPartner.id],
          lastMessage: null,
          lastMessageTimestamp: null
        });
      }
    });

    return () => unsubscribe();
  }, [chatroomId, currentUser.uid, chatPartner.id]);

  const onSend = useCallback((newMessages = []) => {
    const chatroomRef = doc(db, 'chatrooms', chatroomId);
    const messagesRef = collection(chatroomRef, 'messages');

    newMessages.forEach(async (message) => {
      await addDoc(messagesRef, {
        _id: message._id,
        createdAt: serverTimestamp(),
        text: message.text,
        user: {
          _id: currentUser.uid,
          name: currentUser.displayName || currentUser.email,
          avatar: currentUser.photoURL || 'https://placehold.co/100x100?text=Avatar'
        }
      });

      // Update the chatroom document with the last message
      await setDoc(chatroomRef, {
        lastMessage: message.text,
        lastMessageTimestamp: serverTimestamp()
      }, { merge: true });
    });
  }, [chatroomId, currentUser]);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: currentUser.uid,
        name: currentUser.displayName || currentUser.email,
        avatar: currentUser.photoURL || 'https://placehold.co/100x100?text=Avatar'
      }}
    />
  );
}