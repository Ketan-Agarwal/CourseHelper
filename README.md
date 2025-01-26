# Course Helper

**Course Helper** is a web application designed to simplify course management. Users can seamlessly add, update, delete, and search for courses using a modern interface built with NextJS and Material-UI.

## Features

- **Add Courses**: Create new courses by filling in details such as course name, code, credits, description, and professor's name.
- **Edit Courses**: Update existing course details in real time.
- **Delete Courses**: Remove courses from the system with a single click.
- **Search Courses**: Quickly filter and find courses through a responsive search bar.

## Tech Stack

### Frontend
- **Framework**: [NextJS](https://nextjs.org/)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)

### Backend
- **Server**: [ExpressJS](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

### Other Tools
- **TypeScript**: For type safety and better developer experience.
- **JWT**: For secure user authentication and session management.
- **Axios**: For making HTTP requests to the server.

### Backend API Routes

This section explains the backend API routes available for interacting with courses. These API endpoints are used for managing course data in the system.

**Backend Base URL:** https://course-helper-back.vercel.app

1. **Get All Courses**

- Endpoint: `GET /courses`
- Description: Fetch a list of all available courses.
- Authentication: Not required.
- Usage:
  
```js
const courses = await getCourses();
```

2. Create a New Course

- Endpoint: `POST /courses`
- Description: Add a new course to the system. This requires authentication.
- Authentication: JWT Token (pass as header).
- Request Body:
```js
{
  "courseName": "Introduction to Programming",
  "courseCode": "CS101",
  "credits": 3,
  "profName": "Dr. John Doe",
  "description": "A beginner's guide to programming.",
  "imageURL": "https://example.com/image.jpg" // Optional
}
```

- Usage:

```js
    const courseData = {
      courseName: "Introduction to Programming",
      courseCode: "CS101",
      credits: 3,
      profName: "Dr. John Doe",
      description: "A beginner's guide to programming.",
      imageURL: "https://example.com/image.jpg"
    };
    const newCourse = await createCourse(jwtToken, courseData);

```
3. Update an Existing Course

    - Endpoint: `PUT /courses/:id`
    - Description: Update the details of an existing course.
    - Authentication: JWT Token (pass as header).
    - Request Body: Same as the create course request.
    - Usage:
```js
    const updatedCourse = await updateCourse(courseId, jwtToken, updatedCourseData);
```

4. Delete a Course

    - Endpoint: `DELETE /courses/:id`
    - Description: Delete an existing course by its ID.
    - Authentication: JWT Token (pass as header).
    - Usage:

    ```js
    await deleteCourse(courseId, jwtToken);
    ```

Note: All API routes are protected by JWT authentication. You will need to include a valid JWT token in the Authorization header when making requests that modify course data (e.g., create, update, delete).


## Usage Guide
### Adding Courses

  1. You have to be logged in to add a course.
  2. Navigate to the 'Add Course' section.
  3. Fill out the form with course details.
  4. Click 'Submit' to add the course.

### Editing Courses

  1. You have to be logged in to edit any course.
  2. Select a course from the course list.
  3. Update the necessary fields.
  4. Save changes by clicking 'Update'.

### Deleting Courses

  1. You have to be logged in to delete a course.
  2. Click on the 'Delete' button next to the course you wish to remove.
  3. Confirm the deletion in the dialog prompt.

### Searching for Courses

  1. Use the search bar at the top of the course list.
  2. Enter keywords related to the course name, code, or professor's name.
  3. The list will dynamically update based on your input.

### Contact

For any inquiries or issues, please open an issue on GitHub.
