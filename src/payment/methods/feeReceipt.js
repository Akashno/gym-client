import { jsPDF } from "jspdf";
import moment from "moment";

var pageWidth = 210;
var pageHeight = 210;

var start = 10;
var end = 200;

var normalFontSize = 16;
var mediumFontSize = 14;

var lineHeight = Math.floor(normalFontSize / 2);
var currentY = 2 * lineHeight - 10;
var xCenter = Math.floor(pageWidth / 2);

let doc = new jsPDF("p", "mm", [pageWidth, pageHeight]);

const feeReceipt = (payment) => {
  debugger
  //fake data

  currentY = 2 * lineHeight - 10;

  doc = new jsPDF("p", "mm", [pageWidth, pageHeight]);

  doc.setFontSize(normalFontSize);
  // doc.addImage("assets/logo.jpg", "jpeg", 100, currentY, 20, 12);
  nextLine(2.25);
  seperator();
  nextLine(1);
  doc.text(`Order No :`, start, currentY);
  // nextLine(1);
  // fontSize(mediumFontSize);
  // nextLine(2);
  // doc.text("Order Summery", start, currentY);
  // nextLine(1);
  // doc.text("Order placed at :", start, currentY);
  // fontType("bold");
  // doc.text(moment(new Date(parseInt(payment.createdAt))).format("DD MMM YYYY, h:mm:ss A"), start + 40, currentY);
  // nextLine(1);
  // fontType("normal");
  // doc.text("Plan name:", start, currentY);
  // fontType("bold");
  // doc.text(payment.note, start + 30, currentY);
  // nextLine(2);
  // fontType("normal");
  // doc.text("Order from : ", start, currentY);
  // nextLine(1);
  // fontType("bold");
  // doc.text(`${payment.name}`, start, currentY);
  // fontType("normal");
  // nextLine(1);

  // nextLine(1.5);
  // doc.text("Delivery to ", start, currentY);
  // nextLine(1);
  // fontType("bold");
  // doc.text(`${invoice.customerInfo.firstnameEn} ${invoice.customerInfo.lastnameEn}`, start, currentY);
  // nextLine(1);
  // fontType("normal");

  // let addresses = getFullAddress(invoice);
  // addresses.forEach(address => {
  //   doc.text(address, start, currentY);
  //   nextLine(1);
  // });


  // nextLine(1);

  // doc.setFillColor(189, 189, 189);
  // doc.rect(start, currentY, end - start, 10, "F");
  // nextLine(0.7);
  // doc.setTextColor(255, 255, 255);
  // fontType("bold");
  // doc.text("Plan Name", start + 5, currentY);
  // doc.text("Quantity", xCenter, currentY, { align: "center" });
  // doc.text("Package Price", end - start, currentY, { align: "right" });
  // nextLine(1.5);
  // doc.setTextColor(0, 0, 0);
  // fontType("normal");

  // doc.text(invoice.note, start + 5, currentY);
  // doc.text("1", xCenter, currentY, { align: "center" });
  // doc.text(invoice.amount.toFixed(2) + " KD", end - start, currentY, { align: "right" });
  // nextLine(1);
  // seperator();
  // nextLine(1);

  // doc.text("Item Total:", end - 50, currentY, { align: "right" });
  // doc.text(`${invoice.amount.toFixed(2)} KD`, end - start, currentY, { align: "right" });
  // nextLine(1.5);
  // doc.text("Discount:", end - 50, currentY, { align: "right" });
  // doc.text(`${invoice.discount.toFixed(2)} KD`, end - start, currentY, { align: "right" });
  // // nextLine(1.5);
  // // doc.text("Taxes:", end - 50, currentY, { align: "right" });
  // // doc.text(`${invoice.tax.toFixed(2)} KD`, end - start, currentY, { align: "right" });
  // nextLine(1.5);
  // doc.setFillColor(222, 222, 222);
  // doc.rect(start, currentY, end - start, 10, "F");
  // nextLine(0.7);
  // fontType("bold");
  // doc.text("Order Total: ", end - 50, currentY, { align: "right" });
  // doc.text(`${invoice.total.toFixed(2)} KD`, end - start, currentY, { align: "right" });
  // doc.line(0, pageHeight - 20, end, pageHeight - 20);
  fontType("normal");
  //doc.text("Get the App: ", start, pageHeight - 10);
  //doc.addImage("assets/android.svg", "svg", start + 40, pageHeight - 16, 8, 8);
  //doc.addImage("assets/android.svg", "svg", start + 40, pageHeight - 16, 8, 8);

  //design ends

  doc.save(`Invoice.pdf`);
};

const fontType = (type) => doc.setFont(undefined, type);
const fontSize = (size) => doc.setFontSize(size);
const nextLine = (numberOfLines) =>
  (currentY += numberOfLines * lineHeight + 1);
const seperator = (item) => {
  console.log(item)
  doc.setDrawColor(210, 210, 210);
  doc.line(start, currentY, end, currentY);
};

export { feeReceipt };
