import { expect } from "chai";
import mongoose from "mongoose";
import Flat from "../models/Flat.js";

describe("Flat model - CRUD with real DB", function () {
  this.timeout(60000); // extend timeout for DB ops

  before(async () => {
    // Replace with your actual MongoDB connection string
    const uri = "mongodb+srv://parmarkushal642:kushal1206@cluster0.entef2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
    await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase(); // clean up test DB
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Flat.deleteMany({});
  });

  it("creates a flat", async () => {
    const doc = await Flat.create({
      number: "A-101",
      size: "85 sqm",
      floor: 1,
      occupied: false
    });

    expect(doc).to.have.property("_id");
    expect(doc.number).to.equal("A-101");
  });

  it("reads flats", async () => {
    await Flat.insertMany([
      { number: "B-204", size: "90 sqm", floor: 2, occupied: true },
      { number: "C-305", size: "76 sqm", floor: 3, occupied: false }
    ]);
    const list = await Flat.find();
    expect(list).to.have.length(2);
  });

  it("updates a flat", async () => {
    const created = await Flat.create({ number: "D-406", size: "88 sqm", floor: 4 });
    const updated = await Flat.findByIdAndUpdate(
      created._id,
      { occupied: true },
      { new: true }
    );
    expect(updated.occupied).to.equal(true);
  });

  it("deletes a flat", async () => {
    const created = await Flat.create({ number: "E-507", size: "92 sqm", floor: 5 });
    await Flat.findByIdAndDelete(created._id);
    const count = await Flat.countDocuments();
    expect(count).to.equal(0);
  });
});
