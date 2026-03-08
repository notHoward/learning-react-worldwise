✅ Skills & Concepts Applied
useReducer
Both CitiesContext and FakeAuth use useReducer to manage complex state transitions. Actions like loading data, creating or deleting cities, and logging in/out are dispatched to a reducer that keeps state immutable and predictable.

Useful for centralizing state logic and making updates traceable in medium‑to‑large applications.

useContext / Context API
The app exposes CitiesProvider and FakeAuthProvider to wrap the component tree and supply state & actions via useCities() and useFakeAuth() hooks.

Context eliminates prop‑drilling and is ideal for global data like user info or shared resources.

Protected Routes for authentication
ProtectedRoute component checks authentication status (from context) and redirects unauthenticated users with useNavigate.

Essential for gating sensitive UI and ensuring only authorized users access certain routes.

Nested Routes using React Router and Outlet
Routes under /app are nested; SideBar contains an <Outlet /> to render child views such as city list, details, and forms.

Nested routing keeps layout components (e.g. sidebar) persistent while switching inner content.

Lazy Loading using React.lazy
Top‑level pages (Homepage, Product, Pricing, AppLayout, Login, PageNotFound) are imported with React.lazy.

Splits bundle, defers loading of rarely‑used code and speeds up initial render.

Suspense for loading fallback UI
A <Suspense> wrapper with SpinnerFullPage fallback surrounds the <Routes>.

Provides a user-friendly loading indicator while chunks are fetched.

Custom Hooks
useGeolocation encapsulates browser geolocation logic; useUrlPosition reads latitude/longitude from query parameters.

Promotes reuse and keeps components focused on presentation.

useCallback
getCity in CitiesContext is memoized with useCallback to avoid recreating the function on every render.

Prevents unnecessary effects and re-renders, especially when passed as dependencies.

Component Composition & Reusable Components
UI elements like Button, Spinner, Message, BackButton, PageNav, Logo etc. are small, self‑contained components used across pages.

Encourages DRY code and makes UI easy to maintain.

State Lifting via Context
City data and authentication state are lifted out of leaf components into context providers, allowing many components to share and update the same state.

Simplifies state flow and avoids duplicating logic.

Code Splitting
Lazy imports ensure that only the code needed for the current route is downloaded.

Reduces initial payload and improves perceived performance.

Performance Optimization Techniques
Beyond lazy/suspense and useCallback, loading states are handled gracefully with spinners, and the app avoids refetching data when the requested city is already active.

Leads to smoother UX and fewer network requests.

Loading States & Feedback
Components show <Spinner> or <SpinnerFullPage> during async operations, and <Message> for empty/error conditions.

Keeps users informed and prevents UI flicker.

Folder Structure Best Practices
The project segregates components/, pages/, contexts/, hooks/, and data/, with related CSS Modules alongside their components.

Enhances maintainability and makes it easier to locate code.

🚀 What This Project Demonstrates
This repository illustrates solid React architecture with a focus on scalability and maintainability. It employs Context + useReducer for state management, cleanly separates concerns with custom hooks, and implements routing patterns including protected and nested routes. Lazy loading and suspense show awareness of performance optimisation, while modular components and CSS Modules underscore reusable design. Overall, the code reflects an understanding of real‑world application needs—authentication, data fetching, user feedback, and responsive navigation.

🛠 Technologies Used
React (with hooks and functional components)
React Router v6 (BrowserRouter, Routes, NavLink, Outlet)
JavaScript (ES6+)
Context API & useReducer
CSS Modules for scoped styling
React.lazy & Suspense for dynamic imports
Custom hooks (useGeolocation, useUrlPosition)
Third‑party libraries: react-datepicker, react-leaflet
