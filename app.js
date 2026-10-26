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
        copyBtn.style.color = '#c5f2dc';

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          copyBtnText.textContent = 'Copy Email';
          copyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        // Fallback: select link
        window.location.href = `mailto:${emailAddress}`;
      }
    });
  }

  // 3. Dynamic Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Subtle Header State on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 20) {
        header.style.backgroundColor = 'rgba(7, 21, 15, 0.96)';
        header.style.borderColor = 'rgba(159, 227, 193, 0.16)';
      } else {
        header.style.backgroundColor = 'rgba(7, 21, 15, 0.88)';
        header.style.borderColor = 'rgba(159, 227, 193, 0.11)';
      }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }
});
