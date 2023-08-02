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

const getOptionSelector = (selectorName: Selectors, value: string) =>
  `[${TEST_ATTR}=select-${selectorName}-option-${value}]`

const searchSelector = `[${TEST_ATTR}=search-button]`
const loaderSelector = `[${TEST_ATTR}=loader]`

const KEYBOARD_CODES = {
  Escape: 'Escape',
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  Tab: 'Tab'
}

describe('Request flights', () => {
  // it('Render selectors and button', () => {
  //   cy.intercept({ url: '**' }, (req) => {
  //     const newUrl = req.url.replace(Cypress.env('/api'), Cypress.env('http:localhost:3000'))
  //     req.url = newUrl
  //   })
  //   cy.visit('/')
  //   cy.contains(departureSelector, 'Departure airport')
  //   cy.contains(destinationSelector, 'Destination airport')
  //   cy.contains(searchSelector, 'Search for flight')
  // })
  // it('Filling form and search (mouse)', () => {
  //   cy.intercept({ url: '**' }, (req) => {
  //     const newUrl = req.url.replace(Cypress.env('/api'), Cypress.env('http:localhost:3000'))
  //     req.url = newUrl
  //   })
  //   cy.visit('/')
  //   cy.get(departureSelector).click()
  //   cy.get(getOptionSelector('departure', 'HAM')).click()
  //   cy.contains(departureSelector, 'Hamburg • HAM')
  //   cy.contains(destinationSelector, 'Destination airport')
  //   cy.get(searchSelector).click()
  //   cy.get(destinationSelector).should('be.focused')
  //   cy.get(offersBlockSelector).get(loaderSelector).should('not.exist')
  //   cy.get(destinationSelector).click()
  //   cy.get(destinationListSelector).get(getOptionSelector('departure', 'HAM')).should('not.exist')
  //   cy.get(getOptionSelector('destination', 'MUC')).click()
  //   cy.contains(departureSelector, 'Hamburg • HAM')
  //   cy.contains(destinationSelector, 'Munich • MUC')
  // })
  // it('Request flights (mouse)', () => {
  //   cy.visit('/')
  //   cy.get(departureSelector).click()
  //   cy.get(getOptionSelector('departure', 'HAM')).click()
  //   cy.get(destinationSelector).click()
  //   cy.get(getOptionSelector('destination', 'MUC')).click()
  //   cy.get(searchSelector).click()
  //   cy.get(offersBlockSelector).get(loaderSelector).should('exist')
  //   cy.get(offersBlockSelector).children().should('have.length', 4)
  // })
  // it('Filling selectors (keyboard + mouse)', () => {
  //   cy.visit('/')
  //   cy.get(departureSelector).type('am')
  //   cy.get(departureListSelector).get('ul').children().should('have.length', 2)
  //   cy.get(getOptionSelector('departure', 'HAM')).click()
  // })
})
