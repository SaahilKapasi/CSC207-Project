# Clean Architecture PRs
### [Saahil](https://github.com/SaahilKapasi/CSC207-Project/pull/29)

### [Serena](https://github.com/SaahilKapasi/CSC207-Project/pull/34)

### [Yimin](https://github.com/SaahilKapasi/CSC207-Project/pull/33)

### [Aaina](https://github.com/SaahilKapasi/CSC207-Project/pull/53)

### [Dany](https://github.com/SaahilKapasi/CSC207-Project/pull/22)

### [Extra (6th)](https://github.com/SaahilKapasi/CSC207-Project/pull/42)

# Tests
### [Frontend Tests](https://youtu.be/rD32jV-tjMc)
### [Backend Tests](https://www.youtube.com/watch?v=Q0sRAoE_cbI)

# Link to the Application
### [Application](https://cashapp-dashboard.netlify.app/)

# Code Quality (ESLint, Flake8)
Code quality is something we focused a lot as we came to a close on the project. We use ESLint to make sure frontend code quality is good, and flake8 to make sure backend code quality is good. 

# Design
We focused very heavily on clean architecture and good design principles. We made sure all of our classes in the project followed the Liskov Substitution Principle, meaning that all of our subclasses could be substituted for their parent class. We follow the dependency inversion principles and did our best to make sure we didn't use any hard dependencies, making for easy testing. We also followed the open closed principle meaning that we can easily extend the behaviour of a class without modifying it. Some examples of these principles coming into use in our program is our DatasetFile class and our BiasAnalyzer class. Our good design principles allows us to easily add other dataset file formats if we would like to. It also allows us to switch from a simple stats based analyzer to an analyzer driven by a large language model at any time.

# Accessibility 
Our project incorporates key accessibility features, including keyboard navigation, screen reader compatibility, sufficient color contrast for visualizations, and responsive design. We’ve also ensured clear error messaging and descriptive labels for non-text elements, making the tool usable across diverse devices and for users relying on assistive technologies.