Physics Problem Generator
==============================

## Getting started as a dev

1. Install [yarn](https://yarnpkg.com/en/docs/install#linux-tab):

  ```sh
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get update && sudo apt-get install nodejs build-essential yarn
  ```
  
2. Clone the repository
3. From your repository instance, run:

  ```sh
  yarn && grunt
  ```
4. Set up your `DB_CONFIG.php` file.
