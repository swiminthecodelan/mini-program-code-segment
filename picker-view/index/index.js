const date = new Date();
const years = [];
const months = [];
const days = [];

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i);
}

for (let i = 1; i <= 12; i++) {
  months.push(i);
}

for (let i = 1; i <= 31; i++) {
  days.push(i);
}

Page({
  waitChange: false,
  showPicker: false,
  confirm: false,
  data: {
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
  },
  showPicker() {
    this.setData({ showPicker: true });
    this.waitChange = true;
    this.confirm = false;
  },
  bindChange(e) {
    console.log('change');
    const val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    });
    if (this.confirm) {
      this.waitChange = false;
    }
  },
  onConfirm(e, timeoutTotal = 0) {
    if (timeoutTotal === 0) {
      this.setData({ loading: true });
      this.confirm = true;
    }
    setTimeout(() => {
      if (this.waitChange && timeoutTotal < 3000) {
        timeoutTotal += 50;
        console.log('wait change');
        console.log(timeoutTotal);
        this.onConfirm({}, timeoutTotal);
      } else {
        this.setData({ showPicker: false });
        this.setData({ loading: false });
        console.log('call api');
      }
    }, 50);
  },
});
