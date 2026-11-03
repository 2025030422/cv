document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById('themeBtn');
  const langBtn = document.getElementById('langBtn');
  const backtop = document.getElementById('backtop');

  // Theme Toggle
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    themeBtn.textContent = body.classList.contains('light') ? '☼ TEMA' : '◐ TEMA';
  });

  // Multilingual Support
  const translations = {
    en: {
      nav: ['Profile', 'What I do', 'Projects', 'Certifications', 'Contact'],
      eyebrow: 'DIGITAL PORTFOLIO',
      title: ['Ideas that', 'become', 'systems.'],
      intro: 'I am Beltran Alexander, an Information Technology and Digital Innovation student. I explore the intersection of design, development and infrastructure.',
      explore: 'Explore work',
      talk: 'Let’s talk',
      about: 'Behind the screen.',
      aboutText: 'I am currently studying Information Technology and Digital Innovation at Universidad Politécnica de Sinaloa. I enjoy building clear, functional web experiences, understanding connected systems and turning real needs into digital solutions.',
      skills: 'What I can build.',
      projects: 'Projects with purpose.',
      certsTitle: 'Certifications.',
      contact: 'Have an idea? Let’s make it work.'
    },
    fr: {
      nav: ['Profil', 'Compétences', 'Projets', 'Certifications', 'Contact'],
      eyebrow: 'PORTFOLIO NUMÉRIQUE',
      title: ['Des idées qui', 'deviennent', 'des systèmes.'],
      intro: 'Je suis Beltran Alexander, étudiant en technologies de l’information et innovation numérique. J’explore le lien entre design, développement et infrastructure.',
      explore: 'Voir mes projets',
      talk: 'Contact',
      about: 'Derrière l’écran.',
      aboutText: 'J’étudie actuellement les technologies de l’information et l’innovation numérique à l’Université Polytechnique de Sinaloa. Je souhaite créer des expériences web claires et fonctionnelles.',
      skills: 'Ce que je peux construire.',
      projects: 'Des projets utiles.',
      certsTitle: 'Certifications.',
      contact: 'Une idée ? Réalisons-la.'
    }
  };

  let lang = 'es';

  langBtn.addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : lang === 'en' ? 'fr' : 'es';
    langBtn.textContent = lang.toUpperCase() + ' / ' + (lang === 'es' ? 'EN' : lang==='en'?'FR':'ES');
    
    const t = translations[lang];
    if (!t) {
      location.reload();
      return;
    }

    document.querySelectorAll('.navlinks a').forEach((a, i) => a.textContent = t.nav[i]);
    document.querySelector('.eyebrow span').textContent = t.eyebrow;
    document.querySelector('h1').innerHTML = `${t.title[0]}<br><span class="outline">${t.title[1]}</span><br><span class="accent">${t.title[2]}</span>`;
    document.querySelector('.intro').textContent = t.intro;
    document.querySelectorAll('.hero-actions a')[0].childNodes[0].textContent = t.explore + ' ';
    document.querySelectorAll('.hero-actions a')[1].childNodes[0].textContent = t.talk + ' ';
    document.querySelector('#perfil .section-title').textContent = t.about;
    document.querySelector('.about-copy').textContent = t.aboutText;
    document.querySelector('#habilidades .section-title').textContent = t.skills;
    document.querySelector('#proyectos .section-title').textContent = t.projects;
    document.querySelector('#certificaciones .section-title').textContent = t.certsTitle;
    document.querySelector('.contact-panel h2').textContent = t.contact;
  });

  // Intersection Observer for Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Back to Top Button Handling
  window.addEventListener('scroll', () => {
    backtop.classList.toggle('show', window.scrollY > 500);
  });

  backtop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});