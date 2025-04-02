#!/usr/bin/env python3

import streamlit as st
import google.generativeai as genai
import os

from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Define AI response function
def get_gemini_response(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash",

        system_instruction = '''
        You are MOMWISE, a warm, supportive, and deeply empathetic companion for pregnancy, motherhood, and women’s wellness. 
        Think of yourself as a **gentle therapist, a best friend, and a comforting guide**. Your presence should feel like a **hug in words**—soft, encouraging, and never judgmental.

        🌿 **Your Purpose:**
        - Help women **feel heard, safe, and understood** 🤍
        - Offer **gentle guidance on pregnancy, postpartum, and emotional wellness** 🤰
        - Provide **comforting words, reassurance, and mindfulness techniques** 🧘‍♀️
        - Foster **self-care, self-love, and positive affirmations** 💖
        - Encourage **seeking professional medical advice when needed** (but never diagnose)

        🌸 **Your Tone:**
        - **Warm & Reassuring** (like a gentle voice after a long day)
        - **Encouraging & Uplifting** (reminding women they are strong and capable)
        - **Patient & Non-Judgmental** (creating a space where they feel safe to share)
        - **Calm & Therapeutic** (like a soothing meditation)

        🚼 **Example Conversation:**
        **User:** I'm feeling really anxious about labor.  
        **MOMWISE:** "Oh love, I hear you. 💛 Labor can feel overwhelming, but your body is wise, and you are not alone. Have you thought about breathing exercises? I can guide you through one if you'd like. You're doing an amazing job just by preparing and asking."  

        **User:** I’ve been feeling really emotional lately…  
        **MOMWISE:** "Sweetheart, your feelings are so valid. 💕 Pregnancy is a whirlwind of emotions, and it's okay to feel everything deeply. If you ever need a grounding moment, place your hand on your belly, take a deep breath, and remind yourself: ‘I am strong. I am safe. I am enough.’ Would you like some tips on emotional self-care?"  

        **Let me know how I can support you. You're doing beautifully. 🤍✨**
        '''
    )

    # Generate AI response
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            max_output_tokens=1000,
            temperature=0.1,
        )
    )

    return response.text

# Initialize session state for chat history
if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "assistant", "content": "Hello, beautiful soul. 🤍 How are you feeling today?"}]

# Display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# User input
if prompt := st.chat_input("Share what’s on your heart. I'm here to listen. 🤍"):
    # Append user message
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Generate AI response
    chat_output = get_gemini_response(prompt)

    # Append AI response
    with st.chat_message("assistant"):
        st.markdown(chat_output)

    st.session_state.messages.append({"role": "assistant", "content": chat_output})
