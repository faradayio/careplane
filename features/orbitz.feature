Feature: Orbitz
  As a Careplane user
  I want to see flight footprints on Orbitz.com

  Background:
    Given I am visiting "www.orbitz.com"

  @javascript
  Scenario: Basic Orbitz search
    When I go to the home page
    And I choose "Flight" within "#productNavMenu"
    And I fill in "airOrigin" with "DTW" within "#airbotForm"
    And I fill in "airDestination" with "SFO" within "#airbotForm"
    And I fill in "airStartDate" with a departure date within "#airbotForm"
    And I fill in "airEndDate" with a return date within "#airbotForm"
    And I press "Find Flights" within "#airbotForm"
    And Careplane runs as soon as "#matrix" is visible
    Then I should see "Emission estimates powered by Brighter Planet"
    And I should see carbon footprints
