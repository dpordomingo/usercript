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
    const users = {/*
        'handler-1': {
            'name': 'User Full Name',
            'email': 'user-email@example.com',
        },*/
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
