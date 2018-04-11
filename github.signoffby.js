// ==UserScript==
// @name         Prepare 'sign-off-by' message
// @namespace    dpordomingo.usercripts.github.signoffby
// @version      0.1
// @description  Prepare the 'sign-off-by' message for your user, and set it as a commit description
// @author       dpordomingo
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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

    const addSignOffForUser = (handler) => {
        const userInfo = users[handler];
        if (!userInfo) return false;
        document.querySelector('#commit-description-textarea').value=`Signed-off-by: ${userInfo.name} <${userInfo.email}>`;
    };

    const loggedUser = getLoggedUser();
    addSignOffForUser(loggedUser);
})();
