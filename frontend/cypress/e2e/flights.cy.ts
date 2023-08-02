import { configureAxe } from 'cypress-axe'

const TEST_ATTR = 'data-testid'

const appSelector = `[${TEST_ATTR}=app]`

const departureSelectorName = `departure`
const destinationSelectorName = `destination`
type Selectors = typeof departureSelectorName | typeof destinationSelectorName

const departureSelector = `[${TEST_ATTR}=selector-${departureSelectorName}]`
const destinationSelector = `[${TEST_ATTR}=selector-${destinationSelectorName}]`

const departureListSelector = `[${TEST_ATTR}=selector-${departureSelectorName}-list]`
const destinationListSelector = `[${TEST_ATTR}=selector-${destinationSelectorName}-list]`

const offersBlockSelector = `[${TEST_ATTR}=offers-block]`
const offerPriceSelector = `[${TEST_ATTR}=offer-price]`

const getClearSelectorBtn = (selectorName: Selectors) =>
  `[${TEST_ATTR}=clear-selector-btn-${selectorName}]`
const getOptionSelector = (selectorName: Selectors, value: string) =>
  `[${TEST_ATTR}=select-${selectorName}-option-${value}]`

const getOfferAirport = (type: Selectors) => {
  return `[${TEST_ATTR}=airport-${type}]`
}

const searchSelector = `[${TEST_ATTR}=search-button]`
const loaderSelector = `[${TEST_ATTR}=loader]`

describe('Request flights', () => {
  it('Render selectors and button', () => {
    cy.intercept({ url: '**' }, (req) => {
      const newUrl = req.url.replace(Cypress.env('/api'), Cypress.env('http:localhost:3000'))
      req.url = newUrl
    })
    cy.visit('/')
    cy.contains(departureSelector, 'Departure airport')
    cy.contains(destinationSelector, 'Destination airport')
    cy.contains(searchSelector, 'Search for flight')
  })
  it('Filling form and search (mouse)', () => {
    cy.intercept({ url: '**' }, (req) => {
      const newUrl = req.url.replace(Cypress.env('/api'), Cypress.env('http:localhost:3000'))
      req.url = newUrl
    })
    cy.visit('/')
    cy.get(departureSelector).click()
    cy.get(getOptionSelector('departure', 'HAM')).click()
    cy.contains(departureSelector, 'Hamburg • HAM')
    cy.contains(destinationSelector, 'Destination airport')
    cy.get(searchSelector).click()
    cy.get(destinationSelector).should('be.focused')
    cy.get(offersBlockSelector).get(loaderSelector).should('not.exist')
    cy.get(destinationSelector).click()
    cy.get(destinationListSelector).get(getOptionSelector('departure', 'HAM')).should('not.exist')
    cy.get(getOptionSelector('destination', 'MUC')).click()
    cy.contains(departureSelector, 'Hamburg • HAM')
    cy.contains(destinationSelector, 'Munich • MUC')
  })
  it('Request flights (mouse)', () => {
    cy.visit('/')
    cy.get(departureSelector).click()
    cy.get(getOptionSelector('departure', 'HAM')).click()
    cy.get(destinationSelector).click()
    cy.get(getOptionSelector('destination', 'MUC')).click()
    cy.get(searchSelector).click()
    cy.get(offersBlockSelector).get(loaderSelector).should('exist')
    cy.get(offersBlockSelector).children().should('have.length', 4)
  })
  it('Filling selectors (keyboard + mouse)', () => {
    cy.visit('/')
    cy.get(departureSelector).type('am')
    cy.get(departureListSelector).get('ul').children().should('have.length', 2)
    cy.get(getOptionSelector('departure', 'HAM')).click()
  })

  it('Keyboard navigation', () => {
    cy.visit('/')

    cy.wait(800)

    cy.get('body').tab()
    cy.get(departureSelector)
      .should('be.focused')
      .type('{enter}{esc}')
      .get(departureListSelector)
      .should('not.exist')

    cy.get('body').tab()
    cy.get(departureSelector)
      .should('be.focused')
      .type('{enter}{downArrow}{downArrow}{enter}')
      .contains('Hamburg • HAM')

    cy.get('body').tab().tab()
    cy.get(getClearSelectorBtn('departure')).should('be.focused')

    cy.get('body').tab().tab().tab()
    cy.get(destinationSelector)
      .should('be.focused')
      .type('{enter}{downArrow}{downArrow}{upArrow}{downArrow}{downArrow}{enter}')
      .contains('Frankfurt am Main • FRA')

    cy.get('body').tab().tab().tab().tab()
    cy.get(getClearSelectorBtn('destination')).should('be.focused')

    cy.get('body').tab().tab().tab().tab().tab()
    cy.get(searchSelector).should('be.focused').type('{enter}')

    cy.wait(800)

    const offer = cy.get('body').tab().tab().tab().tab().tab().tab().tab().tab().tab().tab()

    offer.get(getOfferAirport('departure')).contains('HAM')
    offer.get(getOfferAirport('destination')).contains('FRA')
    offer.get(offerPriceSelector).contains('38.99')
  })
})

// I'm not sure about this test
describe('Accessibility', () => {
  it('Test accessibility', () => {
    cy.intercept({ url: '**' }, (req) => {
      const newUrl = req.url.replace(Cypress.env('/api'), Cypress.env('http:localhost:3000'))
      req.url = newUrl
    })
    cy.visit('/')
    cy.injectAxe()
    cy.checkA11y(departureSelector, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a']
      }
    })
  })
})
