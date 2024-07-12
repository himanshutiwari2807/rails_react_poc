# Rails_React_POC

## Building the Project

### Prerequisites

1. **Install Git**
    ◦ Update the package list and install Git. 
        sudo apt update sudo apt install git

2. **Install RVM (Ruby Version Manager)**
    ◦ Install GnuPG2. 
        sudo apt install gnupg2
    ◦ Import the RVM keys:
        gpg2 --keyserver hkp://keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
    ◦ Install Curl.
        sudo snap install curl
    ◦ Download and install RVM.
        \curl -sSL https://get.rvm.io -o rvm.sh 
        cat rvm.sh | bash -s stable --rails 
        source ~/.rvm/scripts/rvm

3. **Install Ruby and Rails**
    ◦ List available Ruby versions and install Ruby 3.3.3. 
        rvm list known 
        rvm install 3.3.3
    ◦ Install Rails. 
        gem install rails

4. **Install Node.js**
    ◦ Download and run the Node.js setup script. 
        \curl -sSL https://deb.nodesource.com/setup_20.x -o nodejs.sh
        cat nodejs.sh | sudo -E bash -
    ◦ Install Node.js. 
        sudo apt update 
        sudo apt install nodejs
    ◦ Install NVM (Node Version Manager).
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash 
        source ~/.bashrc
        nvm list-remote
        nvm install 20.15.1

5. **Install MySQL**
    ◦ Install MySQL server and client libraries. 
        sudo apt install mysql-server-8.0 libmysqlclient-dev 
        mysql_secure_installation
    ◦ Secure MySQL installation and set up user authentication. 
        sudo systemctl stop mysql 
        sudo mkdir -p /var/run/mysqld
        sudo chown mysql:mysql /var/run/mysqld
        sudo mysqld_safe --skip-grant-tables --skip-networking & 
        mysql -u root
    ◦ In MySQL prompt: 
        SELECT user, plugin FROM mysql.user WHERE user='root'; ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password'; 
        FLUSH PRIVILEGES; 
        EXIT;

6. **Install Yarn**
    ◦ Add Yarn package repository and install Yarn. 
        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - 
        echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
        sudo apt update && sudo apt install yarn

### Setup Instructions

Follow these steps to set up your development environment:
1. **Clone the Repository**
    • Clone the project repository and navigate to the project directory. 
        git clone https://github.com/himanshutiwari2807/rails_react_poc.git 
        cd rails_react_poc

2. **Setup Environment Variables**
    • Create a .env file and add database credentials. 
        touch .env 
        nano .env 
      Add the following lines to the .env file: 
        DATABASE_USERNAME='YOUR_USERNAME' 
        DATABASE_PASSWORD='YOUR_PASSWORD'

3. **Update database.yml**
    • Update config/database.yml with the following content: 
      default: &default adapter: mysql2 
        encoding: utf8
        pool: 5 
        username: <%= ENV['DATABASE_USERNAME'] %> 
        password: <%= ENV['DATABASE_PASSWORD'] %> 
        host: localhost
      development: 
        <<: *default database: rails_react_poc_development
      test: 
        <<: *default database: rails_react_poc_test
      production: 
        <<: *default database: rails_react_poc_production 
        username: rails_react_poc 
        password: <%= ENV['DATABASE_PASSWORD'] %>

4. **Install Ruby Dependencies**
    • Install the necessary Ruby gems. 
        bundle install

5. **Setup Database**
    • Precompile assets, create the database, and run migrations. 
        rails assets precompile
        rails db:create db:migrate

6. **Run the Development Server**
    • Start the Rails development server. 
        rails server
