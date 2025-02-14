# Event Ticketing App

This project is a simple event ticketing system built with **React.js** and **Tailwind CSS**. It allows users to select a ticket, provide their details, and generate a ticket.

## Features

### Home Page (`Home.js`)
- Displays available ticket types.
- Allows users to select a ticket and specify the number of tickets they want to purchase.
- Navigates to the User Details page with the selected ticket data.

### User Details Page (`UsersDetails.js`)
- Allows users to enter their **name**, **email**, and upload a **profile photo**.
- Special request field for additional information.
- Image upload functionality using **Cloudinary**.
- Form validation with error handling.
- LocalStorage is used to persist user details.
- "Back" button to return to the Home page.
- "Get My Ticket" button to proceed to the Tickets page.
- **Icons** added to input fields for better UI experience.
- Responsive for mobile, tablet, and large screens.

### Tickets Page (`Tickets.js`)
- Displays the generated ticket with user details.
- Shows ticket type and number of tickets purchased.
- Option to return to the home page.

## Technologies Used
- **React.js** for the frontend.
- **React Router** for navigation.
- **Tailwind CSS** for styling.
- **React Icons** for input field icons.
- **Cloudinary** for image uploads.
- **Toastify** for notifications and so on

## How to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/RealRiga/hng_event_ticket
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm start
   ```

## Environment Variables
Create a `.env` file in the root directory and add:
```
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

## Deployment
The project can be deployed using **Vercel**, **Netlify**, or any static hosting platform.

## Future Enhancements
- Add a payment integration.
- Implement seat selection.
- Improve UI with animations.

Feel free to contribute! 🚀

