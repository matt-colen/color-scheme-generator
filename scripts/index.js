let currentColors = [];

const getFormData = () => ({
  seedColor: `${document
    .querySelector("#color-options__color-picker")
    .value.split("")
    .slice(1)
    .join("")}`,
  schemeType: `${document.querySelector("#color-options__scheme").value}`,
});

const getColorHTML = () => {
  let html = "";
  currentColors.forEach((color) => {
    html += `
      <div class="color-card__container">
        <div class="color-card__color-display" style="background:${color.hex.value}"></div>
        <div class="color-card__code-container flex flex-centered" data-hex="${color.hex.value}">
          <p class="color-card__color-code">${color.hex.value}</p>
          <i class="fa-solid fa-copy"></i>
        </div>
      </div>
    `;
  });
  return html;
};

const renderColorHTML = () =>
  (document.querySelector("#color-results__container").innerHTML =
    getColorHTML());

const getScheme = (formData) => {
  let url = `https://www.thecolorapi.com/scheme?hex=${formData.seedColor}&format=json&mode=${formData.schemeType}&count=4`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      currentColors = [];
      currentColors.push({
        hex: {
          value: `#${formData.seedColor}`,
        },
      });
      data.colors.forEach((color) => currentColors.push(color));
      renderColorHTML();
    });
};

document
  .querySelector("#color-options__form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    getScheme(getFormData());
  });

document.body.addEventListener("click", (e) => {
  const code = e.target.dataset.hex;
  if (code) {
    navigator.clipboard.writeText(code);
    alert(`Copied the text: ${code}`);
  }
});
