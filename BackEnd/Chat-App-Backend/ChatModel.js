class ChatModel {
    constructor(queryText, queryResponse) {
        this.queryText = queryText;
        this.queryResponse = queryResponse;
    }

    // Optionally, you can add methods to manipulate or display the history item
    display() {
        console.log(`Query ${this.queryText}`);
        console.log(`Response: ${this.queryResponse}`);
    }
}

module.exports = ChatModel;
