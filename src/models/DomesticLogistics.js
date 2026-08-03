const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  ewayBillNo: String,
  generatedDate: Date,
  validUntil: Date,
  dispatchDetails: {
    placeOfDispatch: { type: String, default: 'Jaipur, Rajasthan (08)' },
    placeOfDelivery: String,
    portOfExport: { type: String, default: 'JNPT Mumbai / Delhi ICD' },
    countryOfDestination: String,
  },
  transporterDetails: {
    transporterName: String,
    transporterId: String,
    modeOfTransport: { type: String, enum: ['Road', 'Air', 'Sea', 'Rail', ''], default: 'Road' },
    vehicleNo: String,
    approxDistance: String,
    lrRrAirwayBill: String
  },
  packagingDetails: {
    grossWeight: String,
    noOfPackages: String,
    packagingType: String
  },
  domesticCosts: [{
    description: String,
    amountInr: Number
  }],
  status: { type: String, enum: ['Pending', 'In Transit', 'Reached Port'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('DomesticLogistics', schema);
