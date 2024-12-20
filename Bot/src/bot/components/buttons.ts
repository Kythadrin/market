import i18n from "../../utils/i18n";

export const getMainMenuButtons = () => ({
    reply_markup: {
        keyboard: [
            [
                { text: i18n.__("buttons.main.account") },
                { text: i18n.__("buttons.main.shop") },
                { text: i18n.__("buttons.main.language")},
                { text: i18n.__("buttons.main.add_funds")},
                { text: i18n.__("buttons.main.support")},
                { text: i18n.__("buttons.main.reviews")},
                { text: i18n.__("buttons.main.news")},
                { text: i18n.__("buttons.main.faq")},
            ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
});