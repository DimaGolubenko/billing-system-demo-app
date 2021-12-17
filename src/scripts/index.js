import "../styles/index.scss";

import { tariffs } from "./constants";
import { renderSummaryItemView, renderTotalValueView } from "./helpers";
import {
  addChangeInputCurrentListener,
  addChangeInputCurrentOnDateListener,
  addChangeInputPreviousListener,
  addResetPaymentsListener,
  addSavePaymentListener,
  addSelectMeterListener,
  addSelectServiceListener,
} from "./listeners";

const app = {
  payment: {},
  payments: [],
  $: {
    services: document.getElementById("companies"),
    get serviceList() {
      return this.services.querySelectorAll(".left__company");
    },
    meters: document.getElementById("meters"),
    previous: document.getElementById("previous"),
    current: document.getElementById("current"),
    currentOnDate: document.getElementById("payment"),
    saveBtn: document.getElementById("save"),
    resetBtn: document.getElementById("reset"),
    summaryList: document.querySelector(".form__summary-list"),
  },
  init() {
    this.initListeners();
  },
  initListeners() {
    this.$.services.addEventListener("click", addSelectServiceListener.bind(this));
    this.$.meters.addEventListener("change", addSelectMeterListener.bind(this));
    this.$.previous.addEventListener("input", addChangeInputPreviousListener.bind(this));
    this.$.current.addEventListener("input", addChangeInputCurrentListener.bind(this));
    this.$.currentOnDate.addEventListener("input", addChangeInputCurrentOnDateListener.bind(this));
    this.$.saveBtn.addEventListener("click", addSavePaymentListener.bind(this));
    this.$.resetBtn.addEventListener("click", addResetPaymentsListener.bind(this));
  },
  // Logic
  setServiceId(id) {
    this.payment.id = id;
  },
  setMeterId(meterId) {
    this.payment.meterId = meterId;
  },
  setPrevious(value) {
    this.payment.previous = value;
  },
  setCurrent(value) {
    this.payment.current = value;
  },
  setCurrentOnDate(value) {
    this.payment.currentOnDate = value;
  },
  calculateCostOfService() {
    const { previous: previousValue, current: currentValue, currentOnDate } = this.payment;
    const previous = parseInt(previousValue);
    const current = currentOnDate ? parseInt(currentOnDate) : parseInt(currentValue);

    if (previous && current && previous < current) {
      return (current - previous) * tariffs[this.payment.id];
    }
  },
  calculateTotalPaymentsCost() {
    let totalCost = 0;
    this.payments.length && this.payments.forEach(({ total }) => (totalCost += total));
    return totalCost;
  },
  clearPaymentData() {
    this.payment = {};
  },
  resetPayments() {
    this.payments = [];
  },
  // Views
  setActiveServiceCss(id) {
    this.$.serviceList.forEach((service) => {
      if (service.dataset.id === id) {
        service.classList.add("selected");
      } else {
        service.classList.remove("selected");
      }
    });
  },
  clearMetersInputValue() {
    this.$.previous.value = "";
    this.$.current.value = "";
    this.$.currentOnDate.value = "";
  },
  renderSummaryList() {
    let summaryHTML = "";
    if (this.payments.length) {
      this.payments.forEach((payment) => {
        summaryHTML += renderSummaryItemView(payment.id, payment.total);
      });
      summaryHTML += renderTotalValueView(this.calculateTotalPaymentsCost());
      this.$.summaryList.innerHTML = summaryHTML;
    }
  },
};

app.init();

// temp for debugging
window.app = app;
