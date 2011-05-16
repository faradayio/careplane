Feature: Hipmunk
  As a Careplane user
  I want to see flight footprints on Hipmunk.com

  Scenario: Basic domestic search
    Given I am visiting "www.hipmunk.com"
    When I go to the home page
    And I fill in "from0" with "DTW"
    And I fill in "to0" with "SFO"
    And I fill in "date0" with a departure date
    And I fill in "date1" with a return date
    And I press "Search!"
    Then I should see "[\d]+,[\d]+ lbs CO2e"
