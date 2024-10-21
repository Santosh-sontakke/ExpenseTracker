

                    Expense Tracker App
Overview
  The Expense Tracker App is a expense/income management tool developed using React Native, Redux, and Firebase. It allows users to track their income and expenses, categorize transactions, and can maintain and updated balance. The application having a user-friendly interface.

  NOTE 
  kindly use below username and password to login the app

  username      passworsd
1 abc           123
2 def            456

Process To Genrate apk file

1> Open android studio -> Build -> generate signed apk 
2> choose keystore path of Demo.jks android-> app-> Demo.jks
3> enter alias as Demo
4> password is Santosh@123
click on build apk will be genrated at cd android/app/build/outputs/apk/release


Table of Contents
Features
Technologies Used
Setup Instructions
Using Redux
Using Material UI
Notes


           Features
1: Add, edit, and delete income and expense transactions.
2: categorize transactions into given categories or  you cancreate new custom categories as per requirnment.
3: app display the total balance based on transactions ie final balance user having if the expense is more      than   income balance will be negative.
4: Store transactions and balance data in Firebase Firestore.
5: Also using local storage (AsyncStorage) for caching data.
6: For new user if cache is empty then  data will be collected from firebase and then stored in asyncstorage.
also for each transactions both firebase DB and local storage is getting updated.
7: data visualisation added in the form of Bar chart Expense/income
8: reading data from json to authenticate user using username and password


.
           Technologies Used
React Native: Framework for building native mobile applications.
Redux: for Managing the state of app.
Firebase: to store data of CRUD operation .
react-native-paper : To use predefined component like card/Buttons/Textiunput/ RadioButtons etc.
React Navigation: Navigation library for routing in React Native apps.

Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/expense-tracker-app.git
cd expense-tracker-app

bash
Copy code
npm install
Set Up Firebase:

Create a Firebase project in the Firebase Console.
Add a new web app to your Firebase project and copy the Firebase configuration.
Update the firebaseConfig in your project with your Firebase credentials.
Run the App: For iOS:

bash
Copy code
npx react-native run-ios
For Android:

bash
Copy code
npx react-native run-android
Using Redux
The app uses Redux for state management, allowing you to manage transactions and balance in a centralized store.
The application listens for state changes and updates the UI accordingly.
Key Redux Actions
addTransaction(transaction): Adds a new transaction to the state and updates Firebase.
editTransaction(transaction): Updates an existing transaction in the state and Firebase.
deleteTransaction(transactionId): Removes a transaction from the state and Firebase.
Components such as TextInput, Button, and RadioButton are used for creating interactive forms and controls.
TextInput: For inputting transaction amounts and categories.
Button: For submitting forms to add or edit transactions.
DatePickerModal: For selecting transaction dates.


