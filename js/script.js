function switchLanguage(lang) {
  document.querySelectorAll('.en, .ja, .id').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.' + lang).forEach(el => el.style.display = 'inline');
}
switchLanguage('en'); // default language
