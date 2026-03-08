## ✅ Skills & Concepts Applied

### useReducer
Both `CitiesContext` and `FakeAuth` use **useReducer** to manage complex state transitions.  
Actions like loading data, creating or deleting cities, and logging in/out are dispatched to a reducer that keeps state immutable and predictable.

This approach centralizes state logic and makes updates easier to track in medium-to-large applications.

---

### useContext / Context API
The application exposes `CitiesProvider` and `FakeAuthProvider` to wrap the component tree and supply state and actions via custom hooks like `useCities()` and `useFakeAuth()`.

Context removes the need for prop-drilling and is useful for global data such as authentication state or shared resources.

---

### Protected Routes for Authentication
A `ProtectedRoute` component checks authentication status from context and redirects unauthenticated users using `useNavigate`.

This pattern ensures that sensitive routes are only accessible to authorized users.

---

### Nested Routes using React Router and `Outlet`
Routes under `/app` are nested. A layout component (e.g., `SideBar`) contains an `<Outlet />` that renders child routes such as the city list, city details, or forms.

Nested routing allows layout components (like navigation or sidebar) to stay visible while inner content changes.

---

### Lazy Loading using `React.lazy`
Top-level pages (`Homepage`, `Product`, `Pricing`, `AppLayout`, `Login`, `PageNotFound`) are imported using `React.lazy`.

This splits the JavaScript bundle and loads page code only when the user visits that route, improving initial load performance.

---

### Suspense for Loading Fallback UI
A `<Suspense>` wrapper with `SpinnerFullPage` fallback surrounds the `<Routes>` component.

This displays a loading indicator while lazy-loaded components are being downloaded.

---

### Custom Hooks
Custom hooks like `useGeolocation` and `useUrlPosition` encapsulate reusable logic:

- `useGeolocation` handles browser geolocation API
- `useUrlPosition` extracts latitude and longitude from URL query parameters

This keeps components clean and focused on UI rendering.

---

### useCallback
The `getCity` function in `CitiesContext` is memoized using `useCallback`.

This prevents the function from being recreated on every render and avoids unnecessary re-renders or effects.

---

### Component Composition & Reusable Components
UI elements such as:

- `Button`
- `Spinner`
- `Message`
- `BackButton`
- `PageNav`
- `Logo`

are designed as small reusable components.

This encourages **DRY (Don't Repeat Yourself)** principles and makes the UI easier to maintain.

---

### State Lifting via Context
City data and authentication state are lifted from individual components into context providers.

This allows multiple components to access and update the same shared state without complex prop passing.

---

### Code Splitting
Lazy imports ensure that only the JavaScript required for the current page is downloaded.

This reduces the initial bundle size and improves application performance.

---

### Performance Optimization Techniques
The application uses several performance optimizations:

- `React.lazy` and `Suspense`
- `useCallback` memoization
- Efficient loading states
- Avoiding redundant API requests when data is already available

These techniques help create a smoother user experience.

---

### Loading States & User Feedback
The UI displays feedback during asynchronous operations using components such as:

- `<Spinner>`
- `<SpinnerFullPage>`
- `<Message>`

This keeps users informed and prevents abrupt UI changes.
