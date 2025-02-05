# Bookery

Welcome to Bookery, a tailored booking management application created exclusively for Kairos Weddings (kairosweddings.com). Bookery is designed to simplify and streamline the management of wedding consultation appointment bookings, ensuring that you can efficiently manage your client's schedules and provide a seamless experience for everyone involved in planning their special day.

## Purpose
Bookery was developed with the unique needs of Kairos Weddings in mind, enabling you to: 
    - Efficiently manage time slots and appointments
    - Provide secure access for a team of users, each with different roles
    - Ensure greate communication and convenience for your clients

### Tech/Tools
This application was built using
    - PostgreSQL for the database
    - Prisma ORM for database management
    - React for the frontend
    - Express.js and Node.js for the backend
    - Redux Toolkit (RTK) for state management

#### Key Features

1. User Access Roles for Team Management
    - Owner:
        - Full access to manage team members, time slots, and bookings
    - Manager:
        - Can manage time slots and view bookings but can't add or edit users
    - Assistant:
        - Only able to view bookings without making changes

2. Secure Dashboard
    - Bookery includes a password-protected dashboard that is simple to use yet ensures your data and appointments are kept secure
    - Includes an analytics dashboard to track how many inquiries came in (monthly, quarterly, and yearly)

3. Time Slot Management
    - Create, edit, and delete available time slots
    - Mark time slots as booked once an appointment is confirmed
    - View the calendar of both booked and available times

4. Appointment Tracking
    - Add and store client details such as first name, last name, email, phone number, event date, and venue(s)
    - Easily find and review appointments for quick updates or reference

5. Automatic Updates
    - When time slots or appointments are updated or removed, Bookery ensures all linked data stays consistent to avoid double bookings or mismatches

6. Dynamic Search Bar
    - to quickly find specific appointments or free time slots

##### Usage Guide

- Step 1: Logging In
    - Open your management dashboard
    - Enter your login details (provided by owner)
    - If you're the owner, you can create accounts for your team with tailored roles

- Step 2: Managing Time Slots
    - After logging in:
        - Navigate to the Time Slot Management page
        - Add, edit, or delete available time slots for different dates and times
        - View a clear overview of available and booked slots

- Step 3: Viewing and Adding Appointments
    - Navigate to Bookings to see the list of all appointments
    - Add new appointments by filling in your client's details (event date, venue, contact information, etc.)
    - Double-check the appointment details, and assign it to an available time slot

- Step 4: Team Collaboration
    - Add new team members
    - Assign roles like Manager or Assistant
    - Remove users who no longer need access

###### Support
If you encounter any issues, have questions, or need additional features, feel free to reach out to our support team. We're here to ensure that Bookery grows alongside Kairos Weddings.

Contact Support:
    - Email: ayang312@gmail.com

###### Future Updates
We're always looking for ways to improve. Some planned updates include:
    - Calendar syncing with Google Calendar/Outlook
    - Email and SMS appointment reminders for clients
    - Analytics for time slot utilization and booking trends


