Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Petrucio')   
    cy.get('#lastName').type('Alberto')    
    cy.get('#email').type('petruciolima2406@hotmail.com') 
    cy.get('#open-text-area').type('tantandoooo')
    cy.contains('button', 'Enviar').click()  
})