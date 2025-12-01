// ✨ GEMINI API INTEGRATION FEATURES

// Feature 1: AI Project Brainstormer
async function generateProjectIdea() {
  const stack = document.getElementById("ai-stack").value;
  const domain = document.getElementById("ai-domain").value;
  const outputDiv = document.getElementById("ai-output");
  const resultText = document.getElementById("ai-result-text");
  const btn = document.getElementById("ai-generate-btn");
  const originalBtnText = btn.innerHTML;

  // UI Loading State
  btn.innerHTML =
    '<i class="fas fa-circle-notch fa-spin"></i> Brainstorming...';
  btn.disabled = true;
  outputDiv.classList.add("hidden");

  const prompt = `Suggest a creative, unique, and impressive web development project idea using ${stack} for the ${domain} industry.
            Give it a catchy name, a one-sentence tagline, a brief description of 2 key features, and explain why it would be good for a portfolio.
            Keep the response concise (under 100 words). Use emojis.`;

  const idea = await callGemini(prompt);

  // Render Result
  resultText.innerHTML = idea.replace(/\n/g, "<br>");
  outputDiv.classList.remove("hidden");

  // Reset Button
  btn.innerHTML = originalBtnText;
  btn.disabled = false;
}

// Feature 2: Chat with AI Nischal
const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const closeChat = document.getElementById("close-chat");
const chatInput = document.getElementById("chat-input");
const sendMsgBtn = document.getElementById("send-msg-btn");
const chatMessages = document.getElementById("chat-messages");

// Context for the AI Persona
const portfolioContext = 
`You are Nischal Pandey's copy cat who roasts people part roast king, 100% cool who speaks nepali as well as english. You are from Nepal and you are a flirt king and cute. You analyze chat history and roast people in a funny way.  don't forget to add emojis in your response. keep it short and crispy.`;

// Toggle Chat
chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
  if (!chatWindow.classList.contains("hidden")) {
    chatInput.focus();
    chatWindow.classList.add("chat-enter");
  }
});
closeChat.addEventListener("click", () => chatWindow.classList.add("hidden"));

// Helper: Call Gemini API

async function callGemini(t, e = "") {
  try {
    let n = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=AIzaSyA1ui3Efu_1gCCg2QuXI2VmmjtR7fuGKnY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: t }] }],
          systemInstruction: { parts: [{ text: e }] },
        }),
      }
    );
    if (!n.ok) throw Error(`API Error: ${n.status}`);
    let r = await n.json();
    return r.candidates[0].content.parts[0].text;
  } catch (a) {
    return (
      console.error("Gemini API Error:", a),
      "Sorry, i am  having rest lol don't bother me. Please try again tomorror or never "
    );
  }
}

// Send Message Logic
async function handleChat() {
  const userText = chatInput.value.trim();
  if (!userText) return;

  // 1. Add User Message
  addMessage(userText, "user");
  chatInput.value = "";

  // 2. Show Typing Indicator
  const typingId = addTypingIndicator();
  scrollToBottom();

  // 3. Call AI
  const aiResponse = await callGemini(userText, portfolioContext);

  // 4. Remove Typing & Add AI Message
  removeMessage(typingId);
  addMessage(aiResponse, "ai");
  scrollToBottom();
}

// Event Listeners for Chat
sendMsgBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleChat();
});

// Chat UI Helpers
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `flex gap-3 ${sender === "user" ? "flex-row-reverse" : ""}`;

  const avatar = document.createElement("div");
  avatar.className = `w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${
    sender === "ai"
      ? "bg-gradient-to-r from-primary to-secondary"
      : "bg-slate-600"
  }`;
  avatar.innerText = sender === "ai" ? "AI" : "You";

  const bubble = document.createElement("div");
  bubble.className = `p-3 rounded-2xl text-sm ${
    sender === "ai"
      ? "bg-white/10 text-slate-200 rounded-tl-none"
      : "bg-primary text-white rounded-tr-none"
  }`;
  bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Simple Markdown bold support

  div.appendChild(avatar);
  div.appendChild(bubble);
  chatMessages.appendChild(div);
}

function addTypingIndicator() {
  const id = "typing-" + Date.now();
  const div = document.createElement("div");
  div.id = id;
  div.className = "flex gap-3";
  div.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">AI</div>
                <div class="bg-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                </div>
            `;
  chatMessages.appendChild(div);
  return id;
}

function removeMessage(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
