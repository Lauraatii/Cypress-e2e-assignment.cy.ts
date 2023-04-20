// // We need this empty export to silence a module error
// export {};

// // https://cph-mtnl.github.io/business-card/


// describe('Wash World Test', () => {
//   it('completes the full flow from location selection to finishing a wash', () => {
//     // Visit the page
//     cy.visit('https://wash-world-nextjs.vercel.app/');

//     // Wait for the page to load completely
//     cy.wait(5000)

//     // Verify the title
//     cy.get('h1').should('contain', "Wash World")

//     // Get the list of locations
//     cy.get('.Index_buttonsGrid__5FFzJ > :nth-child(1)').as('locationButtons');

//     // Verify the number of locations
//     cy.get('@locationButtons').should('have.length', 1);

//     // Verify that the closed location cannot be selected
//     cy.get('[disabled=""]').contains('Aalborg hovedvej 19').should('be.disabled');

//     // Select the first available location
//     cy.get('@locationButtons').not(':disabled').first().click();

//     // Verify the title on the next page
//     cy.title().should('eq', 'Wash World - Program');

//     // Get the list of products
//     cy.get('.buttons--grid > div').as('productButtons');

//     // Verify the number of products
//     cy.get('@productButtons').should('have.length', 4);

//     // Select the first product
//     cy.get('@productButtons').first().click();

//     // Intercept the POST request and set the estimated duration to 1 second
//     cy.intercept('POST', '/startWash').as('startWash');
//     cy.wait('@startWash').then((interception) => {
//       interception.send({
//         response: {
//           estimated_duration: 1,
//         },
//       });
//     });

//     // Verify the title on the next page
//     cy.title().should('eq', 'Wash World - Vask i gang');

//     // Verify that the estimated duration is less than or equal to 1 second
//     cy.contains('Varighed:').should(($duration) => {
//       const durationText = $duration.text();
//       const durationSeconds = parseInt(durationText.substring(durationText.indexOf(':') + 1).trim());
//       expect(durationSeconds).to.be.at.most(1);
//     });

//     // Wait for the wash to finish
//     cy.wait(2000);

//     // Verify the title on the next page
//     cy.title().should('eq', 'Wash World - Vask afsluttet');

//     // Verify the success message
//     cy.contains('Tak fordi du vasker hos Wash World!');
//   });
// });


// We need this empty export to silence a module error
export {};

// https://cph-mtnl.github.io/business-card/

describe('Wash World Test', () => {
  it('completes the full flow from location selection to finishing a wash', () => {
    // Visit the page
    cy.visit('https://wash-world-nextjs.vercel.app/');

    // Wait for the page to load completely
    cy.wait(5000)

    // Verify the title
    cy.get('h1').should('contain', "Wash World")

    // Get the list of locations
    cy.get('.Index_buttonsGrid__5FFzJ > :nth-child(1)').as('locationButtons');

    // Verify the number of locations
    cy.get('@locationButtons').should('have.length', 1);

    // Verify that the closed location cannot be selected
    cy.get('[disabled=""]').contains('Aalborg hovedvej 19').should('be.disabled');

    // Select the first available location
    cy.get('@locationButtons').not(':disabled').first().click();

    // Verify the title on the next page
    cy.get('h1').should('contain', "Program")

    // Get the list of products
    cy.get('.LocationId_grid__uvwm2 > :nth-child(1)').as('productButtons');

    // Verify the number of products
    cy.get('@productButtons').should('have.length', 1);

    // Select the second product
    cy.get('@productButtons').eq(0).click();

    // // Intercept the POST request and set the estimated duration to 1 second
    // cy.intercept('POST', '/startWash').as('startWash');
    // cy.wait('@startWash').then((interception) => {
    //   interception.send({
    //     response: {
    //       estimated_duration: 1,
    //     },
    //   });
    // });

    cy.intercept('POST', '/startWash').as('startWash');
    cy.wait('@startWash').then((interception) => {
    interception.reply((res) => {
    res.body = {
      estimated_duration: 1,
    };
  });
});



    // Verify the title on the next page
    cy.get('h1').should('contain', "Tid tilbage")

    // Verify that the estimated duration is less than or equal to 1 second
    cy.contains('Varighed:').should(($duration) => {
      const durationText = $duration.text();
      const durationSeconds = parseInt(durationText.substring(durationText.indexOf(':') + 1).trim());
      expect(durationSeconds).to.be.at.most(1);
    });

    // Wait for the wash to finish
    cy.wait(2000);

    // Verify the title on the next page
    cy.get('h1').should('contain', "Wash World");

    // Verify the success message
    cy.contains('Tak fordi du vasker hos Wash World!');
  });
});
