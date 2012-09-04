Feature: Bing
  As a Careplane user
  I want to see flight footprints on Bing

  Background:
    Given I am visiting "www.bing.com"

  @javascript
  Scenario: Basic Bing search
    When I go to the travel page
    And I fill in "orig1Text" with "DTW"
    And I fill in "dest1Text" with "SFO"
    And I fill in "d1" with a departure date
    And I fill in "r1" with a return date
    And I press "Search" within "#flt_form"
    And Careplane runs as soon as ".results-table" is visible
    Then I should see "Brighter Planet"
    And I should see carbon footprints

  @firefox @chrome @safari
  Scenario: Basic Bing search
    When I go to the travel page
    And I fill in "orig1Text" with "DTW"
    And I click the "origin" airport
    And I fill in "dest1Text" with "SFO"
    And I click the "destination" airport
    And I fill in "d1" with a departure date
    And I fill in "r1" with a return date
    And I press "Search" within "#flt_form"
    Then I should see "Brighter Planet"
    And I should see carbon footprints
