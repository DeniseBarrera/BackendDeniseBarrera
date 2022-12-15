class ChatApi {
    constructor() {
        this.chat = [];
    }

    getAll() {
        return this.chat;
    }

    newMessage(message) {
        this.chat.push(message);
    }
}

module.exports = ChatApi;