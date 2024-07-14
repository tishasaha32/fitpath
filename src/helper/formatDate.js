export function formatDate(dateString) {
  const dateObject = dateString;
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  const formattedDate = `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year}`;

  return formattedDate;
}

export function formatDateForHistory(dateString) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateComponents = dateString.split(" ");
  const day = parseInt(dateComponents[2], 10);
  const monthIndex = months.indexOf(dateComponents[1]);
  const year = parseInt(dateComponents[3], 10);

  const formattedDate = `${day < 10 ? "0" : ""}${day}/${
    monthIndex < 9 ? "0" : ""
  }${monthIndex + 1}/${year}`;

  return formattedDate;
}
