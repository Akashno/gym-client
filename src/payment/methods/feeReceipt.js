import { jsPDF } from "jspdf";
import moment from "moment";

let pageWidth = 210;
let pageHeight = 210;

let start = 15;
let end = 195;

let black = [36,36,35]
let grey = [134,134,134]
let normalFontSize = 16;
let mediumFontSize = 14;
let smallFontSize = 12

let lineHeight = Math.floor(normalFontSize / 2);
let currentY = 2 * lineHeight - 10;
let xCenter = Math.floor(pageWidth / 2);

let doc = new jsPDF("p", "mm", [pageWidth, pageHeight]);

const feeReceipt = (payment) => {
  debugger
  let fullName = payment.firstName + ' ' + payment.lastName
  let paymentCode =`#${payment.paymentCode}` 
  let description = `${moment().month(payment.month - 1).format('MMMM')} ${payment.year} gym membership fee`
  let phone = payment.phone
  let createdAt =moment(new Date(parseInt( payment.createdAt))).format('DD.MM.YYYY')
  let amount =   String(payment.amount.toFixed(2))


  currentY = 2 * lineHeight - 10;

  doc = new jsPDF("p", "mm", [pageWidth, pageHeight]);

  doc.addImage(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnXf4cf2JV3KFCwCvO6i4fcAGLmbuvRM2KCFubbvDsNitUxWIVuRbX4O0GU2_6eF4lAA&usqp=CAU",
    "jpg",
    start-10 ,
    currentY +10 ,
    35,
   29 
  );
  seperator(start-6,currentY,end + 6,currentY)
  seperator(start-6,pageHeight - 8,start-6,currentY)
  seperator(start-6,pageHeight - 8,start-6,pageHeight-8)
  seperator(start-6,pageHeight - 8,end + 6,pageHeight-8)
  seperator(end +6 ,currentY,end +6,pageHeight-8)
  doc.setFontSize(normalFontSize);
  nextLine(2.5);

  fontType('bold')
  doc.text(`Dark Fit`, start +20 , currentY + 5);

  fontType('normal')
  fontColor(grey)
  fontSize(smallFontSize)
  doc.text(`Payment Id `, end, currentY,{align:"right"});
  nextLine(1)



  fontColor(black)
  fontSize(mediumFontSize)
  fontType('bold')
  doc.text(paymentCode, end, currentY,{align:"right"});
  fontType('normal')
  // seperator(start,currentY,end-40,currentY);
  nextLine(2.5)

  doc.text(`Fee Paid On : ${createdAt}`,start,currentY) 
  nextLine(3)
  fontColor(grey)
  fontSize(smallFontSize)
  doc.text('Bill To',start,currentY)
  seperator(start + 20,currentY-1,xCenter,currentY-1);
  doc.text('From',xCenter+5,currentY)
  seperator(xCenter + 20,currentY-1,end,currentY-1);
  
  nextLine(1)
  fontColor(black)
  fontSize(mediumFontSize)
  doc.text(fullName,start,currentY) 
  doc.text('Dark fit Gym',xCenter+5,currentY)
  nextLine(1)
  doc.text(phone,start,currentY) 
  doc.text('New York , NY 10128',xCenter+5,currentY)
  nextLine(1)
  doc.text('United States',xCenter+5,currentY)
  nextLine(4)

  fontColor(grey)
  fontSize(smallFontSize)
  doc.text('Description',start,currentY) 
  seperator(start + 30,currentY-1,end-20,currentY-1);
  doc.text('Amount', end, currentY,{align:"right"});
  nextLine(1.5)

  fontColor(black)
  fontSize(mediumFontSize)
  doc.text(description,start,currentY) 
  doc.text(amount, end, currentY,{align:"right"});
  nextLine(1.5)
  seperator(start,currentY-1,end-20,currentY-1);

  fontColor(grey)
  fontSize(smallFontSize)
  doc.text('Total',end,currentY,{align:"right"}) 
  fontColor(black)
  fontSize(mediumFontSize)
  nextLine(1.5)
  fontType('bold')
  doc.text(amount, end, currentY,{align:"right"});




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

  doc.save(`${payment.paymentCode}.pdf`);
};

const fontType = (type) => doc.setFont(undefined, type);
const fontSize = (size) => doc.setFontSize(size);
const fontColor = (color) => doc.setTextColor(...color);
const nextLine = (numberOfLines) =>

  (currentY += numberOfLines * lineHeight + 1);

const seperator = (x1,y1,x2,y2) => {
  doc.setDrawColor(210, 210, 210);
  doc.line(x1, y1, x2, y2);
};

export { feeReceipt };
