// backend/test/flat.controller.test.js
const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Flat = require('../models/Flat');
const flatsController = require('../controllers/flatsController'); // { createFlat, getFlats, ... }

describe('Flats Controller - createFlat', () => {
  afterEach(() => sinon.restore());

  it('should create a flat successfully', async () => {
    const req = {
      body: { number: 'B-204', floor: 2, owner: 'Alex', bedrooms: 2 }
    };
    const created = { _id: new mongoose.Types.ObjectId(), ...req.body };

    const stub = sinon.stub(Flat, 'create').resolves(created);

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await flatsController.createFlat(req, res);

    expect(stub.calledOnceWith(req.body)).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(created)).to.be.true;
  });

  it('should return 500 on DB error', async () => {
    sinon.stub(Flat, 'create').throws(new Error('DB Error'));
    const req = { body: { number: 'B-204', floor: 2, owner: 'Alex', bedrooms: 2 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await flatsController.createFlat(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
  });
});
