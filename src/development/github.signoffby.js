// ==UserScript==
// @name         Prepare 'sign-off-by' message
// @namespace    dpordomingo.usercripts.src.development.github.signoffby
// @version      0.1
// @description  Prepare the 'sign-off-by' message for your user, and set it as a commit description
// @author       dpordomingo
// @source       https://github.com/dpordomingo/usercripts
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Defines the sign-off-by attributes for each account, indexed by GitHub handler
    const users = {
        'dpordomingo': {
            'name': 'David Pordomingo',
            'email': 'david.pordomingo.f@gmail.com',
        },
    };

    const getLoggedUser = () => {
        const userTag = document.querySelector('meta[name="user-login"]');
        return userTag && userTag.getAttribute('content');
    };

    const setSignedOffMessage = (i, info) => {
        i.value=`Signed-off-by: ${info.name} <${info.email}>`;
    }

    const addSignOffForUser = (handler) => {
        const userInfo = users[handler];
        if (!userInfo) return false;
        document
            .querySelectorAll(`\
                #commit-description-textarea,
                .js-suggestion-commit-message,
                textarea[aria-label="Commit message"]
            `)
            .forEach(elem => setSignedOffMessage(elem, userInfo));
    }

    const loggedUser = getLoggedUser();
    addSignOffForUser(loggedUser);
})();
