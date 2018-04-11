// ==UserScript==
// @name         Octobox autorefresher
// @namespace    dpordomingo.usercripts.octobox.autorefresher
// @version      0.1
// @description  Enable autorefresh in Octobox
// @author       dpordomingo
// @match        https://octobox.io/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    const setAutoRefresh = min => {
        $('.js-table-notifications').data('refresh-interval', min * 60 * 1000);
        setAutoSyncTimer();
    };

    setAutoRefresh(3);
})();
