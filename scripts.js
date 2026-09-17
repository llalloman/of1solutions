/** OF1 Solutions — progressive enhancement, no runtime dependencies. */
'use strict';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');
const mobile = window.matchMedia('(max-width: 720px)');

function setMenu(open, returnFocus = false) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
    if (returnFocus) toggle.focus();
}

function syncMenu() {
    toggle.hidden = !mobile.matches;
    setMenu(false);
}

header.classList.add('menu-ready');
syncMenu();
mobile.addEventListener('change', syncMenu);
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('click', event => {
    if (!header.contains(event.target)) setMenu(false);
});
header.addEventListener('focusout', event => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
});

// Native anchors retain URL/history and reduced-motion behavior.
// Existing form URLs now select the appropriate interest in the unified form.
const form = document.getElementById('project-form');
function selectContactInterest() {
    const interests = { '#form-erp': 'ERP Ecuador', '#form-software': 'Desarrollo de software Ecuador' };
    const interest = interests[window.location.hash];
    if (interest) {
        form.elements.interest.value = interest;
        form.elements.tipo_interes.value = interest === 'ERP Ecuador' ? 'Demostración ERP' : 'Desarrollo de software';
    }
}
window.addEventListener('hashchange', selectContactInterest);
selectContactInterest();
form.elements.interest.addEventListener('change', () => {
    form.elements.tipo_interes.value = form.elements.interest.value || 'Consulta empresarial';
});

// Accessible tabs: automatic activation, arrows, Home/End, one tab stop.
const tablist = document.querySelector('.solution-tabs');
const tabs = [...tablist.querySelectorAll('button')];
tablist.setAttribute('role', 'tablist');
function activateTab(selected, focus = false) {
    tabs.forEach(tab => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        document.getElementById(tab.dataset.panel).hidden = !active;
    });
    if (focus) selected.focus();
}
tabs.forEach((tab, index) => {
    const panel = document.getElementById(tab.dataset.panel);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
            event.preventDefault();
            activateTab(tabs[next], true);
        }
    });
});
activateTab(tabs[0]);

// Never hide content before an observer fires; reduced motion stays static.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!motion.matches) entry.target.classList.add('reveal');
                reveals.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-heading, .product-copy, .principles, .leadership-heading').forEach(el => reveals.observe(el));
}

// Existing Formspree endpoint; inline status, retained data on failure, timeout.
form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    if (button.disabled) return;
    const status = form.querySelector('.form-status');
    const requiredText = [['name', 2], ['company', 2], ['phone', 7], ['message', 10]];
    const invalid = requiredText.find(([name, min]) => form.elements[name].value.trim().length < min);
    if (invalid) {
        status.dataset.error = 'true';
        status.textContent = 'Completa los campos con información válida; el mensaje debe tener al menos 10 caracteres.';
        form.elements[invalid[0]].focus();
        return;
    }
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.dataset.error = 'false';
    status.textContent = 'Enviando consulta…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
        const response = await fetch(form.action, {
            method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal
        });
        if (!response.ok) throw new Error('Request failed');
        form.reset();
        status.textContent = 'Gracias. Tu consulta fue enviada al equipo de OF1 Solutions.';
    } catch {
        status.dataset.error = 'true';
        status.textContent = 'No pudimos confirmar el envío. Conservamos tus datos en el formulario para que puedas reintentar. También puedes escribirnos por correo o WhatsApp.';
    } finally {
        clearTimeout(timeout);
        button.disabled = false;
        form.removeAttribute('aria-busy');
    }
});

// Add only approved, verifiable case studies. Empty data keeps the section hidden.
// Schema: { industry, title, summary, url }. No sample clients or invented metrics.
const approvedCases = [];
const caseList = document.getElementById('case-list');
const caseTemplate = document.getElementById('case-template');
approvedCases.forEach(item => {
    const url = new URL(item.url, window.location.href);
    if (!['https:', 'http:'].includes(url.protocol)) return;
    const fragment = caseTemplate.content.cloneNode(true);
    fragment.querySelector('[data-case-industry]').textContent = item.industry;
    fragment.querySelector('[data-case-title]').textContent = item.title;
    fragment.querySelector('[data-case-summary]').textContent = item.summary;
    fragment.querySelector('[data-case-link]').href = url.href;
    caseList.append(fragment);
});
document.getElementById('proyectos').hidden = !caseList.children.length;
