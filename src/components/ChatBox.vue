<template>
  <div>
    <button @click="toggleChat" class="chat-toggle-btn" aria-label="Toggle chatbox" type="button"
            style="background:none; padding:0; border:none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path fill="#25A2CC"
              d="M32 2C18 2 6 14 6 28c0 7.7 4.6 14.4 11.3 18v10.6l9.3-5.3c0.8 0.2 1.6 0.3 2.4 0.3 14 0 26-12 26-26S46 2 32 2z"/>
        <ellipse cx="32" cy="28" rx="20" ry="12" fill="#fff"/>
        <rect x="18" y="22" width="28" height="12" rx="6" ry="6" fill="#4A4A4A"/>
        <circle cx="24.5" cy="28" r="3" fill="#54C4E0"/>
        <circle cx="39.5" cy="28" r="3" fill="#54C4E0"/>
        <line x1="32" y1="14" x2="32" y2="10" stroke="#D9D9D9" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="9" r="2" fill="#D9D9D9"/>
      </svg>
    </button>


    <div v-if="isChatOpen" class="chatbox">
      <div class="chat-messages">
        <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="msg.sender === 'user' ? 'chat-message user-message' : 'chat-message bot-message'"
        >
          <span class="message-content">{{ msg.content }}</span>
          <div class="message-time">{{ msg.time }}</div>
        </div>

      </div>
      <div class="chat-input-area">
        <div class="input-with-icon">
          <input
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Nhập tin nhắn..."
              type="text"
              ref="messageInput"
          />
          <button @click="toggleIconPicker" type="button" aria-label="Chọn icon" class="icon-btn">😊</button>
        </div>

        <button @click="sendMessage" type="button" aria-label="Gửi" class="send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </button>
      </div>

      <div v-if="showIconPicker" class="icon-picker">
        <span v-for="icon in icons" :key="icon" class="icon-item" @click="addIcon(icon)">{{ icon }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChatOpen: false,
      newMessage: '',
      messages: [],
      showIconPicker: false,
      icons: ['😊', '😂', '👍', '❤️', '✈️', '🎉', '😎', '😉', '😢', '🤔', '🎈', '🚀', '🌟', '💡', '😊', '😂', '👍', '❤️', '✈️', '🎉', '😎', '😉', '😢', '🤔', '🎈', '🚀', '🌟', '💡'], // Thêm icon tùy ý
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen && this.messages.length === 0) {
        this.messages.push({sender: 'bot', content: 'Tôi có thể giúp gì cho bạn?'});
      }
      this.showIconPicker = false;
    },
    async sendMessage() {
      if (this.newMessage.trim() === '') return;

      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;

      const messageToSend = this.newMessage.trim();
      this.loading = true;
      this.error = null;

      // Đẩy tin nhắn người dùng
      this.messages.push({sender: 'user', content: messageToSend, time: timeString});

      try {
        const payload = {
          sender: 'user',
          message: messageToSend,
        };

        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok && data.length) {
          const botNow = new Date();
          const botHours = botNow.getHours().toString().padStart(2, '0');
          const botMinutes = botNow.getMinutes().toString().padStart(2, '0');
          const botTime = `${botHours}:${botMinutes}`;

          data.forEach(reply => {
            this.messages.push({sender: 'bot', content: reply.text, time: botTime});
          });
        }
      } catch (e) {
        this.error = 'Lỗi kết nối API.';
      } finally {
        this.loading = false;
        this.newMessage = '';
      }
    },
    toggleIconPicker() {
      this.showIconPicker = !this.showIconPicker;
    },
    addIcon(icon) {
      this.newMessage += icon;
      this.showIconPicker = false;
      this.$nextTick(() => {
        this.$refs.messageInput.focus();
      });
    },
  },
};
</script>

<style scoped>
.chat-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 28px;
  padding: 12px 16px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.chat-toggle-btn:hover {
  background-color: #0056b3;
}

.message-time {
  font-size: 10px;
  color: #666;
  margin-top: 2px;
  text-align: right;
}

.chatbox {
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-message {
  max-width: fit-content;
  word-wrap: break-word;
  padding: 8px 12px;
  border-radius: 16px;
  color: #333;
}

.user-message {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
  border-top-right-radius: 0;
}

.bot-message {
  background-color: #ffbe0b;
  color: #333;
  align-self: flex-start;
  border-top-left-radius: 0;
}

.message-content {
  font-size: 14px;
}

.chat-input-area {
  display: flex;
  padding: 10px;
  background-color: #f5f5f5;
  gap: 8px;
}

.input-with-icon {
  position: relative;
  flex: 1;
}

.input-with-icon input {
  width: 100%;
  padding-right: 36px;
  box-sizing: border-box;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  color: #333;
  border-radius: 8px;
}

.icon-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #555;
  padding: 0;
  line-height: 1;
}

.icon-btn:hover {
  color: #007bff;
}

.send-btn {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-picker {
  position: fixed;
  bottom: 120px;
  right: 20px;
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1100;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.icon-item {
  cursor: pointer;
  font-size: 24px;
  user-select: none;
  transition: transform 0.1s ease;
  text-align: center;
}

.icon-item:hover {
  transform: scale(1.3);
}
</style>
