export function addSelectServiceListener(event) {
  const { id } = event.target.dataset;
  if (id) {
    this.setActiveServiceCss(id);
    this.setServiceId(id);
  }
}

export function addSelectMeterListener(event) {
  const { value: meterId } = event.target;
  meterId && this.setMeterId(meterId);
}

export function addChangeInputPreviousListener(event) {
  const { value } = event.target;
  this.setPrevious(value);
}

export function addChangeInputCurrentListener(event) {
  const { value } = event.target;
  this.setCurrent(value);
}

export function addChangeInputCurrentOnDateListener(event) {
  const { value } = event.target;
  this.setCurrentOnDate(value);
}

export function addSavePaymentListener(event) {
  event.preventDefault();

  if (!this.payment.id) {
    alert("Выберите тип платежа");
    return;
  }

  if (!this.payment.previous || !this.payment.current) {
    alert("Заполните предыдущие и текущие показания");
    return;
  }

  const total = this.calculateCostOfService();
  if (total) {
    this.payment.total = total;
    this.payments.push(this.payment);
    this.clearPaymentData();
    this.clearMetersInputValue();
    this.renderSummaryList();
  }
}

export function addResetPaymentsListener() {
  this.resetPayments();
}
