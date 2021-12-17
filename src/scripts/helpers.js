export const renderSummaryItemView = (meterId, value) => {
  return `
    <li class="list__item">
      <p><span class="list__item-label">${meterId}</span>
        <span class="price">$ <b>${value}</b></span>
      </p>
    </li>
  `;
};

export const renderTotalValueView = (total) => {
  return `
    <li class="list__item list__total">
      <p><span class="list__item-label">Всего</span>
        <span class="price">$ <b>${total}</b></span>
      </p>
    </li>
  `;
};
