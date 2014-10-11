# Ember-SC Follow-Along of Boston Ember Group's Ember/Ember-CLI/Rails Tutorial

Boston Ember's tutorial can be found here:

* [Part 1](http://reefpoints.dockyard.com/2014/05/07/building-an-ember-app-with-rails-part-1.html)
* [Part 2](http://reefpoints.dockyard.com/2014/05/08/building-an-ember-app-with-rails-part-2.html)
* [Part 3](http://reefpoints.dockyard.com/2014/05/09/building-an-ember-app-with-rails-part-3.html)
* [Part 4](http://reefpoints.dockyard.com/2014/05/31/building-an-ember-app-with-rails-part-4.html)

This code base demonstrates the Ember application reading data from the Rails application.

## Installation

If you are interested in following along, installation instructions can be found in part 1 of the tutorial above.

Or...

You can follow these installation instructions to cut to the end of the tutorial.

### Installation Instructions

These are the instructions to follow if you simply want to see the Ember application read data from the Rails application.

#### Prerequisites

You should have installed the following:

1.  Ruby (version 1.9.3 or higher)
1.  [RVM](http://rvm.io)
1.  Node
1.  Npm

#### Installation Steps


1.  In your work directory, retrieve the Ember and Rails projects as one git cloning:

    ```bash
    git clone https://github.com/Ember-SC/ember-sc-bostonember.git
    cd ember-sc-bostonember
    ```
    
Ember:

1.  Go into the `ember` directory to set up the client system:

    ```bash
    cd ember
    ```

1.  Install everything:

    ```bash
    npm install
    bower install
    ```
    
Rails:

1.  Go into the `rails` directory to set up `rvm`:

    ```bash
    cd ../rails
    ```

    Observe that the `rvm` gemset is created:
    
    ```bash
    ruby-1.9.3-p545 - #gemset created /Users/SSmith/.rvm/gems/ruby-1.9.3-p545@ember-sc-bostonember
    ruby-1.9.3-p545 - #generating ember-sc-bostonember wrappers...........
    ```

1.  If you don't have `bundler` installed, do so now:

    ```bash
    gem install bundler
    ```

1.  Install the gems:

    ```bash
    bundle
    ```
    
1.  Build the database:

    ```bash
    rake db:create
    rake db:migrate
    rake db:seed
    ```

1.  Try accessing the Rails application from a browser:

    *NOTE: The rails tests are not yet running; this will be followed up on shortly.*
    
    ```bash
    rails s
    ```
    
    Then browse `http://localhost:3000`.  You should get the standard Rails index page.
    
Test both together:

1.  Start Ember referencing Rails:

    ```bash
    ember server --proxy http://localhost:3000
    ```
    
1.  Browse `localhost:4200`.  Browse around and notice that you have

    * Bugs Bunny w/ 2 presentations
    * Wile E. Coyote w/ 1 presenation
    * Yosemite same w/ 3 presenations

If you get further than we have, we would appreciate a PR from you, thanks!

#### Troubleshooting

This is currently running using ember-sc version 0.0.44.
We try to keep it upgraded periodically to the latest released ember-sc version.
