import moment from "moment";

export const prepareIncomeLineChartData = (transactions) => {
  const groupedData = {};

  transactions.forEach((transaction) => {
    const rawDate = transaction.date.split("T")[0];

    if (!groupedData[rawDate]) {
      groupedData[rawDate] = {
        date: rawDate,
        totalAmount: 0,
        categories: {}, // name -> amount
      };
    }

    const amount = Number(transaction.amount);

    // Add to total
    groupedData[rawDate].totalAmount += amount;

    // Add per category/name
    const name = transaction.name || "Other";

    if (!groupedData[rawDate].categories[name]) {
      groupedData[rawDate].categories[name] = 0;
    }

    groupedData[rawDate].categories[name] += amount;
  });

  return Object.values(groupedData)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      date: moment(item.date).format("Do MMM"), // 12th Jun
      amount: item.totalAmount,
      categories: item.categories,
    }));
};