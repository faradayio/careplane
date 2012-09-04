Feature: Hipmunk
  As a Careplane user
  I want to see flight footprints on Hipmunk.com

  Background:
    Given I am visiting "www.hipmunk.com"

  @javascript
  Scenario: Basic Hipmunk search
    When I go to the home page
    And I fill in "from0" with "DTW"
    And I fill in "to0" with "SFO"
    And I fill in "date0" with a departure date
    And I fill in "date1" with a return date
    And I press "Search!"
    And Careplane runs as soon as ".results-table" is visible
    Then I should see carbon footprints

  @chrome @safari
  Scenario: Basic Hipmunk search
    When I go to the home page
    And I fill in "from0" with "DTW"
    And I fill in "to0" with "SFO"
    And I fill in "date0" with a departure date
    And I fill in "date1" with a return date
    And I press "Search!"
    Then I should see carbon footprints
