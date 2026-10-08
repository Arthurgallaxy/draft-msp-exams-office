/* Thin navigation overlay for the *prebuilt* Exams Office static Next.js export.
 * No application bundles or internal routes are edited. */
(function () {
  'use strict';
  if (window.__mspExamsNavLoaded) return;
  window.__mspExamsNavLoaded = true;
  var m = location.pathname.match(/^(.*?)\/draft-msp-exams-office(?:\/|$)/);
  var root = location.origin + (m ? m[1] : '') + '/';
  var homepage = root + 'draft-msp-homepage/staff.html';
  var P = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ico = {
    target:P+'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    clock:P+'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    clipboard:P+'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
    users:P+'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    briefcase:P+'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    hub:P+'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="3" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="21" cy="12" r="1.5"/><line x1="12" y1="9" x2="12" y2="4.5"/><line x1="12" y1="15" x2="12" y2="19.5"/><line x1="9" y1="12" x2="4.5" y2="12"/><line x1="15" y1="12" x2="19.5" y2="12"/></svg>'
  };
  var apps = [
    { name:'Project Periods', repo:'draft-msp-project-periods', icon:'target' },
    { name:'Academic Calendar',repo:'draft-msp-academic-calendar',icon:'clock' },
    { name:'Exams Office',repo:'draft-msp-exams-office',icon:'clipboard',current:true },
    { name:'Tutor Registration',repo:'draft-msp-tutoring',icon:'users' },
    { name:'BTR for Supervisors',repo:'draft-msp-btr-projects',icon:'briefcase' }
  ];
  function ready() {
    if (document.getElementById('msp-exams-nav')) return;
    var box = document.createElement('div'); box.id='msp-exams-nav';
    var btn = document.createElement('button');btn.type='button';btn.id='msp-exams-toggle';
    btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','msp-exams-menu');
    btn.textContent='Exams Office  ▾';
    box.appendChild(btn);
    var menu=document.createElement('div');menu.id='msp-exams-menu';menu.hidden=true;
    apps.forEach(function(app){
      var a=document.createElement('a');a.href=root+app.repo+'/';
      a.innerHTML='<span class="msp-exams-icon">'+ico[app.icon]+'</span><span></span>';
      a.lastChild.textContent=app.name;
      if(app.current)a.setAttribute('aria-current','page');
      menu.appendChild(a);
    });
    var hub=document.createElement('a');hub.href=homepage;hub.className='msp-exams-all';
    hub.innerHTML='<span class="msp-exams-icon">'+ico.hub+'</span><span>All staff tools</span>';
    menu.appendChild(hub);box.appendChild(menu);document.body.appendChild(box);
    function show(on){menu.hidden=!on;btn.setAttribute('aria-expanded',String(on));}
    btn.addEventListener('click',function(){show(menu.hidden);});
    document.addEventListener('click',function(e){if(!box.contains(e.target))show(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){show(false);btn.focus();}});

    // Next's in-app router can own the existing logo anchor. Handle logo clicks in
    // capture phase so they go back to the independent homepage instead.
    document.addEventListener('click',function(e){
      var img=e.target.closest&&e.target.closest('img');
      if(!img)return;
      var src=img.getAttribute('src')||'';
      if(!/\/(?:msp-emblem|um-wordmark)\.png(?:\?|$)/.test(src))return;
      e.preventDefault();e.stopImmediatePropagation();location.assign(homepage);
    },true);
    var style=document.createElement('style');
    style.textContent='img[src*="msp-emblem.png"],img[src*="um-wordmark.png"]{cursor:pointer}';
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);
  else ready();
}());
