<template>
  <div class="chat-container p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">Liên hệ Hỗ trợ Khách hàng</h2>

      <div class="space-y-3">
        <input
            v-model="email"
            type="email"
            class="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Email của bạn"
        />
        <input
            v-model="subject"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Tiêu đề"
        />
        <textarea
            v-model="newMessage"
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Nội dung tin nhắn..."
        ></textarea>
        <button
            @click="sendMessage"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Gửi tin nhắn
        </button>
      </div>

      <div class="messages-container mt-6 max-h-80 overflow-y-auto space-y-3 border-t pt-4">
        <h3 class="text-lg font-semibold text-gray-700">Lịch sử tin nhắn</h3>
        <div v-for="(message, index) in messages" :key="index" class="flex">
          <div :class="{
              'ml-auto text-right': message.sender === 'admin',
              'mr-auto text-left': message.sender === 'customer'
            }" class="max-w-sm">
            <div :class="{
                'bg-blue-500 text-white': message.sender === 'admin',
                'bg-gray-200 text-gray-900': message.sender === 'customer'
              }"
                 class="p-3 rounded-lg shadow"
            >
              <p class="font-medium">{{ message.subject }}</p>
              <p class="text-sm mt-1">{{ message.text }}</p>
              <p class="text-xs mt-1 opacity-70">{{ message.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      subject: '',
      newMessage: '',
      messages: [
        {
          sender: 'customer',
          text: 'Xin chào, tôi cần hỗ trợ đặt vé.',
          subject: 'Hỗ trợ đặt vé',
          email: 'khach@example.com'
        },
        {
          sender: 'admin',
          text: 'Vâng, bạn cần giúp gì ạ?',
          subject: 'Trả lời: Hỗ trợ đặt vé',
          email: 'admin@support.com'
        }
      ]
    };
  },
  methods: {
    sendMessage() {
      if (this.email.trim() && this.subject.trim() && this.newMessage.trim()) {
        this.messages.push({
          sender: 'customer',
          text: this.newMessage,
          subject: this.subject,
          email: this.email
        });

        // Reset form
        this.email = '';
        this.subject = '';
        this.newMessage = '';

        // (Optional) Gửi về backend tại đây nếu cần
        // axios.post('/api/support', { email, subject, text: newMessage })
      } else {
        alert('Vui lòng điền đầy đủ thông tin trước khi gửi!');
      }
    }
  }
};
</script>

<style scoped>
.chat-container {
  background: linear-gradient(to right, #e0eafc, #cfdef3);
}
</style>
