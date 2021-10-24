import { makeAutoObservable, flowResult, flow } from 'mobx';


class NotificationsStore {
    messages = []
    activeMessage = ''
    userId
    notificationsDuration
    notificationsDelay

    constructor () {
        makeAutoObservable(this, {
            appendChar: false,
            capsSubtext: false,
            fetchInitialMessages: flow,
            fetchUserData: flow
        });
        this.messages = [];
        this.activeMessage = '';
        this.updateActiveMessage.bind(this);
    }

    appendChar (msg, regex, char) {
        if (!msg) return '';
        return msg.match(regex) ? `${msg}${char}` : msg;
    }

    capsSubtext (msg, regex, replacementStr) {
        return msg.replaceAll(regex, replacementStr);
    }

    get processedMessage () {
        let processedMsg = this.appendChar(this.activeMessage.text, /sale/i, "!");
        processedMsg = this.appendChar(processedMsg, /new/i, "~~");
        processedMsg = this.capsSubtext(processedMsg, /limited edition/ig, "LIMITED EDITION");

        return processedMsg;

    }

    removeMsg (msgId) {
        this.messages = this.messages.filter(msg => msg._id !== msgId);
    }

    updateActiveMessage () {
        console.log(this.messages);
        let randomIndex = Math.floor(Math.random() * (this.messages.length - 1));

        this.activeMessage = this.messages[randomIndex];
        console.log(this.activeMessage)
    }

    *fetchInitialMessages() {
        yield fetch("/notifications").then(res => res.json()).then(data => {
            this.messages = data;
            console.log(this.messages, data)
        });
        console.log(this.activeMessage, this.messages);
    }

    *fetchUserData() {
        const response = yield fetch("/users", { method: 'POST' }).then(res => res.json()).then(data => {
            this.userId = data._id;
            this.notificationsDuration = data.notification_duration;
            this.notificationsDelay = data.notification_interval;
        })
        console.log(this.notificationsDelay, this.notificationsDuration, this.userId);
    }
}

class UIStore {
    messageIcons
    closedMessage

    constructor () {
        makeAutoObservable(this, {
            messageIcons: false
        });
        this.closedMessage = false;
        this.messageIcons = {
            success: "pi-check",
            warn: "pi-exclamation-triangle",
            error: "pi-ban",
            info: "pi-info-circle"
        }
    }

    toggleClosedMessage () {
        this.closedMessage = !this.closedMessage;
    }
}


export const notificationsStore = new NotificationsStore();
export const initialNotifications = async () => await flowResult(notificationsStore.fetchInitialMessages());
export const userData = async () => await flowResult(notificationsStore.fetchUserData());
export const uiStore = new UIStore();
