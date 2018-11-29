// ==UserScript==
// @name         GoFit schedule formater
// @namespace    dpordomingo.usercripts.src.life.gofit.scheduler
// @version      0.1
// @description  Logins, loads the schedule and shows the relevant lessons
// @author       dpordomingo
// @source       https://github.com/dpordomingo/usercripts
// @match        http://www.go-fit.es/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Your code here...

    const email = 'rizome.es.register@gmail.com';
    const pass = 'casasa82';
    const interests = ['stretching', 'yoga', 'pilates', 'go fit cross'];

    // DO: login
    const emailInput = document.querySelector('form#form_login_index input[name="email"]');
    const passInput = document.querySelector('form#form_login_index input[name="password"]');
    const loginButton = document.querySelector('form#form_login_index input[type="submit"]');
    if (emailInput && passInput && loginButton) {
        emailInput.value = email;
        passInput.value = pass;
        loginButton.click();
        return;
    }

    // DO: go to "reservas"
    const availableClasses = document.querySelectorAll('li.cont_dias > ul.cont_clases_dia > li');
    if (availableClasses.length < 1) {
        window.location = 'http://www.go-fit.es/Reservas/Index';
        return;
    }

    // DO: report
    const finderRegExp = /^\s*(?:(adaptive?|family) +)?(.+?)\s*$/;
    function GetActivityGroup(activityName, items) {
        const res = finderRegExp.exec(activityName);
        const prefix = res[1];
        const name = res[2];
        return {
            name,
            count: items.length,
            prefix,
            items,
            prio: interests.indexOf(name) > -1 && prefix != 'family',
        };
    }

    const sortByName = (a,b) => a.name > b.name;
    const getBuckets = function(groups) {
        const data = {
            interests: [],
            family: [],
            others: [],
        };
        Object.getOwnPropertyNames(groups).forEach( activName => {
            const items = groups[activName];
            const group = GetActivityGroup(activName, items);
            const bucket = group.prio ? 'interests' : (group.prefix === 'family' ? 'family' : 'others');
            data[bucket].push(group);
        });
        return data;
    };

    const report = function(buckets) {
        Object.getOwnPropertyNames(buckets).forEach( k => {
            buckets[k].sort(sortByName);
            console.log(k);
            console.table(buckets[k], ['count', 'name', 'prefix']);
        });
    };

    const groupByActivityName = (acc, e) => {
        acc = acc || {};
        const activName = e.dataset.actividad;
        if (!acc[activName]) acc[activName] = [];
        acc[activName].push(e);
        return acc;
    };

    const configure = buckets => {
        Object.getOwnPropertyNames(buckets).forEach(k => {
            const bucket = buckets[k];
            bucket.forEach(group => group.items.forEach(e => e.dataset.type = group.prio ? 'important' : 'trivia'));
        });
    };

    const toogler = e => {
        const elem = e.target;
        const shouldBeHidden = elem.dataset.mode === 'importants';
        elem.dataset.mode = shouldBeHidden ? 'all' : 'importants';
        elem.innerHTML = elem.dataset.mode;

        const panel = document.querySelector('#contenido_main_section');
        panel.dataset.mode = elem.dataset.mode;
    };

    const addTooglerTab = function(t){
        const item = document.createElement('li');
        item.className = 'toogle';
        item.dataset.mode = 'importants';
        item.innerHTML = 'importants';
        item.onclick = t;

        const menu = document.querySelector('#contenido_main_section > div.acciones_reservas > ul.botones_cambio_vista');
        menu.appendChild(item);


        const panel = document.querySelector('#contenido_main_section');
        panel.dataset.mode = 'importants';

        const style = document.createElement('style');
        style.innerHTML = `
            .botones_cambio_vista .toogle {margin-left: 4px; cursor: pointer;}
            #contenido_main_section[data-mode="importants"] .botones_cambio_vista .toogle{background: rgba(33, 200, 138, .5); color: white;}
            #contenido_main_section[data-mode="all"] .botones_cambio_vista .toogle{background: rgba(33, 200, 138, .3); color: rgba(33, 200, 138, .6);}
            #contenido_main_section[data-mode="importants"] li[data-type="trivia"] {display:none;}
            #contenido_main_section[data-mode="all"] li[data-type="trivia"] {opacity:.4;}
        `;
        document.body.appendChild(style);
    };

    const groups = Array.from(availableClasses).reduce(groupByActivityName);
    const buckets = getBuckets(groups);
    report(buckets);
    configure(buckets);
    addTooglerTab(toogler);

})();
