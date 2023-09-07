import {MESSAGE_SLIDE_DURATION, MESSAGE_TIMEOUT} from "./Constants.js";

export class Messaging {
    constructor() {
        this.messageContainer = $('#messaging #message-container');
        this.messagesBuffer = [];
        this.slideDownTimeout = null;
    }

    displayMessage(message) {
        this.#displayMessage(message, false);
    }

    displayErrorMessage(message) {
        this.#displayMessage(message, true);
    }

    #displayMessage(message, isError) {
        const messageElement = $(
            '<div>',
            {
                class: 'message-content' + (isError ? ' message-error' : ''),
                id: this.#generateUniqueId()
            })
            .text(message);

        this.messagesBuffer.push(messageElement);
        if(this.slideDownTimeout === null)
            this.slideDownTimeout = this.#slide();
    }

    #slide() {
        const gap = (this.messagesBuffer.length * 45);
        this.messageContainer.css('border-spacing', '0');
        this.messageContainer.animate({  borderSpacing: gap }, {
            step: function(now) {
                $(this).css('transform','translate(0px, ' + (-gap + now) + 'px)');
            },
            duration: MESSAGE_SLIDE_DURATION
        },'linear');

        this.messagesBuffer.forEach((element) => {
            this.messageContainer.prepend(element);
        });
        this.messagesBuffer = [];

        const self = this;
        return new Promise(function(resolve) {
            setTimeout(resolve, MESSAGE_TIMEOUT);
        }).then(async function () {
            const gap = (self.messageContainer.children().length * 45);
            self.messageContainer.css('border-spacing', '0');
            self.messageContainer.animate({borderSpacing: gap}, {
                step: function (now) {
                    $(this).css('transform', 'translate(0px, ' + (-now) + 'px)');
                },
                duration: MESSAGE_SLIDE_DURATION
            }, 'linear');
            await new Promise(function (resolve) {
                setTimeout(resolve, MESSAGE_SLIDE_DURATION + 10);
            });
            self.messageContainer.children().remove();

            if (self.messagesBuffer.length > 0)
                return self.#slide();
            else
                self.slideDownTimeout = null;
        });
    }
     #generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0);
     }

}