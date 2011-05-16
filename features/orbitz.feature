Feature: Orbitz
  As a Careplane user
  I want to see flight footprints on Orbitz.com

  Scenario: Basic domestic search
    Given I am visiting "www.orbitz.com"
    When I go to the home page
    And I follow "flightsTab"
    And I fill in "airOrigin" with "DTW"
    And I fill in "airDestination" with "SFO"
    And I fill in "airStartDate" with a departure date
    And I fill in "airEndDate" with a return date
    And I press "Find Flights"
    Then I should see "Emission estimates powered by Brighter Planet"
    And I should see "[\d]+,[\d]+ lbs CO2e"
