# Holidaze | venues
(Venue Booking Web Application)

---

![Skjermbilde 2024-12-01 kl  21 39 59](https://github.com/user-attachments/assets/d0c3d31b-3e7c-4258-ba27-e71a6372b413)

---

Live site: <https://holidaze-a-s.netlify.app/>

Holidaze is a modern venue booking platform for accommodations, designed for customers to book venues, and for venue managers to manage their venues and bookings. This project integrates with the Noroff API to deliver a seamless and dynamic user experience.

## Key Technologies

- **Vite**
- **React**
- **Tailwind CSS**
- **Zustand - State management**

## Features

**Customer-Facing**

- View a list of available venues.
- Search for specific venues.
- View detailed information for each venue, including availability calendars.
- Register as a customer with a stud.noroff.no email.
- Create and manage bookings.
- View upcoming bookings.
- May login.
- May log out.

**Admin-Facing**

- Register as a venue manager with a stud.noroff.no email.
- Create, update, and delete venues.
- View bookings for venues they own.
- Update profile information, including avatar and bio.
- May login.
- May log out.

## Installation and Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/Anne-Serine/holidaze_project-exam-2
    ```
    ```
    cd <your-project-folder>
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Set up invironment variables**

    Create a `.env` file in the root of the project and add the API url-key for the Noroff API:
    ```bash
    VITE_BASE_URL="base-url-key"
    VITE_API_KEY="api-key"
    ```
4. **Run the application**

    ```bash
    npm run dev
    ```
The app should now be running locally on localhost.

## Project Structure

| Directory/File          | Description                                               |
|-------------------------|-----------------------------------------------------------|
| `src/components/common/`       | Contains components: `Buttons`, `Modal`, `Search` |
| `src/components/features/`       | Contains components: `BookingCard`, `Calendar`, `Carousel`, `VenueCard` |
| `src/components/forms/`       | Contains components: `LoginForm`, `RegisterForm`, `VenueForm` |
| `src/components/layout/`       | Contains components: `Footer`, `Header`, `Nav` |
| `src/hooks/Store.jsx`   | Manages API calls and global state                         |
| `src/hooks/useProfile.jsx`   | Manages API calls and global state                         |
| `src/pages.jsx`   | All the different pages for the app: register, login, home, profile, single venue, manage venue                         |
| `src/styles/index.css`  | Additional custom styles                                   |
| `src/App.jsx`           | Main application component                                |
| `src/main.jsx`          | Entry point for rendering the application                 |

## Design and Planning
- [Gantt Chart](https://github.com/users/Anne-Serine/projects/3/views/4)
- [Figma Prototype](https://www.figma.com/proto/RosHPyCxBFksAcNecl57b1/Holidaze---Project-Exam-2?node-id=1-2&t=YftwH0gEwjiAvRtp-1)
- [Style Guide](https://www.figma.com/design/RosHPyCxBFksAcNecl57b1/Holidaze---Project-Exam-2?node-id=1-3&t=YftwH0gEwjiAvRtp-1)
- [Kanban Board](https://github.com/users/Anne-Serine/projects/3/views/2)

## Responsive Design
Holidaze is fully responsive, ensuring an optimal user experience across devices (desktop, tablet, mobile).

## Additional Information

- **API Integration:** The app integrates with the Noroff API to provide real-time data.

- **State Management:** Zustand is used to handle global state.

## Contact

For any inquiries, you can contact me through:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anne-serine-johannessen-587b4024a/)
