/**
 * Xiimo — Studio Client Logic
 * Lightweight, accessible, zero external runtime dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (menuToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileDrawer.setAttribute('aria-hidden', String(isExpanded));
      mobileDrawer.classList.toggle('is-open', !isExpanded);
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close on navigation link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileDrawer.classList.remove('is-open');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    });
  }

  // 2. Email Copy Interaction
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const emailAddress = 'hello@xiimo.com';

  if (copyBtn && copyBtnText) {
    let timeoutId = null;

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyBtnText.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#ffffff';

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          copyBtnText.textContent = 'Copy';
          copyBtn.style.backgroundColor = '';
        }, 2000);
      } catch (err) {
        window.location.href = `mailto:${emailAddress}`;
      }
    });
  }

  // 3. Dynamic Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Subtle Header State on Scroll (Matching the light mint/sage theme)
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 20) {
        header.style.backgroundColor = 'rgba(244, 250, 246, 0.96)';
        header.style.borderColor = 'rgba(12, 37, 27, 0.12)';
        header.style.boxShadow = '0 4px 16px rgba(12, 37, 27, 0.04)';
      } else {
        header.style.backgroundColor = 'rgba(210, 242, 225, 0.88)';
        header.style.borderColor = 'rgba(12, 37, 27, 0.08)';
        header.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }
});
