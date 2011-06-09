@functioning
Feature: Kayak
  As a Careplane user
  I want to see flight footprints on Kayak.com

  Background:
    Given I am visiting "www.kayak.com"

  @javascript
  Scenario: Basic Kayak search
    When I go to the home page
    And I follow "Flights"
    And I fill in "origin" with "DTW"
    And I fill in "destination" with "SFO"
    And I fill in "depart_date" with a departure date
    And I fill in "return_date" with a return date
    And I press "fdimgbutton"
    And Careplane runs as soon as ".flightresult" is visible
    Then I should see "Carbon calculations powered by"
    And I should see carbon footprints
