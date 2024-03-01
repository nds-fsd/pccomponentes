
![Logo](https://res.cloudinary.com/computech/image/upload/v1709306566/bbycdqphw06uu4q5huat.svg)


## Overview

Welcome to our Marketplace repo! This project is the result of our master project, where we have developed a technology marketplace using the MERN stack. 
## Core Business

We are a marketplace of gaming products for demanding gamers with their setup. Today we have more than 20 leading companies in the gaming sector that provide us with products at attractive costs for our customers. One aspect that differentiates us from the competition is the user experience that we offer on our platform, making it more attractive to browse and purchase. We also offer support to our companies by providing them with a backoffice where they can manage their products, orders, addresses, etc.

In summary, our gaming marketplace offers an exceptional user experience, with a wide range of attractive products at competitive prices and solid support for our partners, join us and take your gaming experience to the next level!

## Key Features:

- User-Friendly Shopping Experience:
Computech offers an intuitive and user-friendly interface, allowing customers to easily navigate through a vast array of products. With a diverse range of categories, users can find everything they need in one centralized platform.

- Product Wishlist:
Users have the ability to curate their personalized shopping experience by saving their favorite products.

- Review System:
We value user feedback, and Computech encourages customers to share their thoughts through a robust review system. This not only assists other buyers in making informed decisions but also provides valuable insights to companies about the quality and performance of their products.

- Company Management:
Computech empowers companies to manage their presence seamlessly. The comprehensive back office provides a centralized hub for companies to oversee various aspects of their operations.

- Order Management:
Computech ensures a smooth order management system, allowing companies to monitor and fulfill orders efficiently.

- Category Management:
Companies can effortlessly organize and update their product categories through the back office. This ensures a well-structured and easily navigable product catalog for users.
## Main Implemented Libraries

- React [Javascript Library]
- Stripe [Payment Transactions Handler]
- Antd [React UI Library]
- Lottie-react [JSON Animations] 
- Cloudinary [Image Upload] 
- Bcrypt [Password Hashing]
- Jest/Supertest [Javascript Testing]
- JsonWebToken [Secure data exchange]
- Mongoose [MongoDB object modeling tool]


## UI

<h3>Home Page</h3>
At this page we have the hero, category list and the product list. The header displays the navigation links, search bar and access to the cart and profile.
<p></p> 

![Home_Page](https://res.cloudinary.com/computech/image/upload/v1709301079/mq5zsg3lvqdhx6sy28eu.png)

<h3>Search Results</h3>
With our search functionality located in the top bar, users can effortlessly explore our products. Utilizing the search input, users can input text to discover products by name, brand, or category, with matches displayed even for partial entries. The matches are presented as a series of product cards, offering a quick glimpse into each item. Furthermore, users can refine their search experience by filtering results based on price range or sorting them according to price, ensuring they find exactly what they're looking for with ease.
<p></p>

![Search_Results](https://res.cloudinary.com/computech/image/upload/v1709302122/ogjm2rmggiynoz2ot33y.png)


<h3>Product Page</h3>

The product page view displays all the information about the selected products:
- Carousel
- Reviews
- Add to cart
- Add to wishlist
<p></p>

![Product_Page](https://res.cloudinary.com/computech/image/upload/v1709301613/tp30gjhcqakvsfeufisl.png)

<h3>Login / Register</h3>
We can access to the marketplace by logging in or creating an account.
<p></p>

![Login_Register_Form](https://res.cloudinary.com/computech/image/upload/v1709302743/s4ary65hgeczrzmq8umx.png)

<h3>Profile</h3>
The profile page displays access to your personal information and wishlist.
<p></p>

![Login_Register_Form](https://res.cloudinary.com/computech/image/upload/v1709303738/cplhnsnh0t1a3xgtrxd6.png)

<h3>Checkout</h3>
Our checkout process is quick and secure, thanks to our integration with Stripe. Simply enter your payment details, choose from various payment methods, and confirm your address for a smooth transaction. With Stripe handling the transaction, you can trust that your purchase will be processed swiftly and securely.
<p></p>

![Checkout](https://cdn.discordapp.com/attachments/1202642794217476111/1213124314627448882/Stripe_Computech.gif?ex=65f4550f&is=65e1e00f&hm=0c3ee5d88f508240ccea2f752c9ef8011c7736f7df567364ac05375b02e55355&)

<h3>Backoffice Login</h3>
The backoffice login offers access to the backoffice for admins.
<p></p>

![Backoffice_login](https://res.cloudinary.com/computech/image/upload/v1709304102/viypvozktludjxp3753r.png)

<h3>Backoffice Dashboard</h3>
The backoffice dashboard shows us different data about the database.
<p></p>

![Backoffice_Dashboard](https://res.cloudinary.com/computech/image/upload/v1709304313/m4lehhypz8dtzxuh2wfa.png)

<h3>Backoffice Products</h3>
The product backoffice allows us to do CRUD-type management of the data.
<p></p>

![Backoffice_Products](https://res.cloudinary.com/computech/image/upload/v1709304492/xlc87nnhkcuuoeaibtpt.png)

## DB Relationships
![DB_Relationships](https://cdn.discordapp.com/attachments/1202642794217476111/1213191554349670411/entities-schema.png?ex=65f493ae&is=65e21eae&hm=492c72090179519ad0feb93b3f48a349e4b0f17b3bce7c873588760de99fb618&)

## Next Steps

- Edit the cart product (color, amount of RAM, etc.)
- Filters, by brand, by color, etc.
- Product comparator
- Support chat 

## Installation


- Clone the Repository:
Open your terminal and run the following command to clone the repository:
```bash
  gh repo clone nds-fsd/pccomponentes

```

- Navigate to the Project Directory:
Change your current directory to the newly cloned project:
```bash
  cd pccomponentes

```

-Install Dependencies:
Once you are inside the project directory, you need to install the project dependencies. Run the following command:
```bash
  npm install

```

- Create and configure the environment variables in the .env file
`MONGO_URL`
`JWT_SECRET`
`STRIPE_PUBLIC_KEY`
`STRIPE_SECRET_KEY`

- Run the project in the terminal with the following command:
```bash
  npm run dev

```
- Navigate to `http://localhost:3000` to view the application.
## Authors


- [@Ruben26rcz](https://github.com/Ruben26rcz)
- [@Artbat03](https://github.com/Artbat03)
- [@mauiriarte](https://github.com/mauiriarte)
- [@BRYAANSET](https://github.com/BRYAANSET)


