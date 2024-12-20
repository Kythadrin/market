import i18n from "../../utils/i18n";

export const getMenuButtons = () => ({
    reply_markup: {
        keyboard: [
            [
                { text: i18n.__("buttons.account") },
                { text: i18n.__("buttons.shop") },
                { text: i18n.__("buttons.language")},
            ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
});