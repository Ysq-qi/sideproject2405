const jackets = require('./product/jackets.json');
const shirts = require('./product/shirts.json');
const pants = require('./product/pants.json');
const tops = require('./product/tops.json');
const accessories = require('./product/accessories.json');

module.exports = () => ({
  products: [
    ...jackets.jackets,
    ...shirts.shirts,
    ...pants.pants,
    ...tops.tops,
    ...accessories.accessories
  ]
});
