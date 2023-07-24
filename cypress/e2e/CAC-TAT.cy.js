/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function(){ 
      cy.visit('src/index.html')
          
})

  it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


it('preencher os campos obrigatorios e enviar formulario', function() {
  cy.get('#firstName').type('Petrucio')   
  cy.get('#lastName').type('Alberto')    
  cy.get('#email').type('petruciolima2406@hotmail.com') 
  cy.get('#open-text-area').type('tantandoooo')
  cy.contains('button', 'Enviar').click()
  cy.get('.success').should('be.visible') 
})

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
  const longtext = "Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,Petrucio,"
  cy.get('#firstName').type('petrucio')
  cy.get('#lastName').type('Alberto')    
  cy.get('#email').type('petruciolima2406@hotmail,com') 
  cy.get('#open-text-area').type(longtext,{ delay:0 })  
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
})

it('Campo telefone so aceita numeros', function(){
  cy.get('#phone').type('asdref').should('have.value','')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
  
  cy.get('#firstName').type('petrucio')
  cy.get('#lastName').type('Alberto')    
  cy.get('#email').type('petruciolima2406@hotmail,com') 
  cy.get('#phone-checkbox').check()
  cy.get('#open-text-area').type('teste')  
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
})


it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
  cy.get('#firstName').type('petrucio').should('have.value', 'petrucio').clear()
  cy.get('#lastName').type('Alberto').should('have.value', 'Alberto').clear()    
  cy.get('#email').type('petruciolima2406@hotmail.com').should('have.value', 'petruciolima2406@hotmail.com').clear() 
  cy.get('#phone').type('1136564059').should('have.value', '1136564059').clear() 
  cy.get('#open-text-area').type('teste').should('have.value', 'teste').clear()  
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
  
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
  cy.contains('button', 'Enviar').click()
  cy.get('.error > strong').should('be.visible')
  
})

it('envia o formuário com sucesso usando um comando customizado', function(){
  cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible') 

})

it('seleciona um produto (YouTube) por seu texto', function(){
  cy.get('#product').select('YouTube').should('have.value','youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', function(){
  cy.get('#product').select('Cursos').should('have.value','cursos')
  
})

it('seleciona um produto (Blog) por seu índice',function(){
  cy.get('#product').select('Blog').should('have.value','blog')
  
})


// aula 4  radio

it('marca o tipo de atendimento "Feedback"',function(){
  cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback') 

})

it('marca o tipo de atendimento ',function(){
  cy.get('input[type="radio"]').should('have.length', 3)
  .each(function($radio){
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
  })

})

it('marca ambos checkboxes, depois desmarca o último',function(){
  cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')

})



it('seleciona um arquivo da pasta fixtures',function(){
  cy.get('input[type="file"]')
  .should('not.have.value')
  .selectFile('cypress/fixtures/example.json')
  .should(function($input){
    //console.log($input)
    expect($input[0].files[0].name).to.equal('example.json')
  })
})


it('seleciona um arquivo simulando um drag-and-drop',function(){
  cy.get('input[type="file"]')
  .should('not.have.value')
  .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
  .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
      
  })
  
})


it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
  cy.get('#privacy a').should('have.attr', 'target', '_blank')
  
})

it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
  cy.get('#privacy a').invoke('removeAttr', 'target').click();
  cy.contains('Talking About Testing').should('be.visible')
  
  
})


})