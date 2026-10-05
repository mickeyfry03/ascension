const modal = document.getElementById('request-modal');
const openButtons = document.querySelectorAll('[data-open-form]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const filterButtons = document.querySelectorAll('.filter-btn');
const needCards = document.querySelectorAll('.need-card');
const requestForm = document.getElementById('help-form');

const openModal = () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

openButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    needCards.forEach((card) => {
      const category = card.dataset.category;
      const isVisible = selectedFilter === 'all' || category === selectedFilter;
      card.style.display = isVisible ? 'flex' : 'none';
    });
  });
});

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(requestForm);
  const name = formData.get('name');

  alert(`Thanks, ${name}! Your request has been submitted for review. A team member will follow up soon.`);
  requestForm.reset();
  closeModal();
});

