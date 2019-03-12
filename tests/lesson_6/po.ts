import { expect } from "chai";
import * as faker from "faker";
import { ProductDetails, Checkout, Confirmation } from "../../pageObjects";
import { createNewUser } from '../../utils/createAccount';

// PageObject example
describe.skip("Guest", function() {
  it("should be able to buy item", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();

    Checkout.open();
    Checkout.customerDetails.enterCustomerDetails({
      firstName: "TestFirstName",
      lastName: "TestLastName",
      address1: "address line 1",
      address2: "address line 2",
      country: 'UA',
      postCode: faker.address.zipCode(),
      city: "CityName",
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
    });
    Checkout.saveChanges();
    Checkout.confirmOrder();
    expect(Confirmation.isLoaded()).to.equal(
      true,
      "Expected that confirmation page appears"
    );
    expect(Confirmation.confirmationTitle()).to.match(
      /Your order #.* is successfully completed!/
    );
  });
});

describe("Registered user", function() {
  beforeEach(function () {
    let credentials = createNewUser()
    browser.url('/login')
    $('[name="login_form"]').$('[name="email"]').setValue(credentials.email)
    $('[name="login_form"]').$('[name="password"]').setValue(credentials.password)
    $('[name="login_form"]').$('button[name="login"]').click()

    browser.pause(10000)
  })

  it("should be able to buy item", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();

    Checkout.open();
    Checkout.customerDetails.enterCustomerDetails({
      firstName: "TestFirstName",
      lastName: "TestLastName",
      address1: "address line 1",
      address2: "address line 2",
      country: 'UA',
      postCode: faker.address.zipCode(),
      city: "CityName",
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
    });
    Checkout.saveChanges();
    Checkout.confirmOrder();
    expect(Confirmation.isLoaded()).to.equal(
      true,
      "Expected that confirmation page appears"
    );
    expect(Confirmation.confirmationTitle()).to.match(
      /Your order #.* is successfully completed!/
    );
  });
});