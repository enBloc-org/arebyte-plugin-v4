# Patterns

Read below for a quick reference to our application of common patterns or the specific implementation of external libraries.

## State Management

This codebase uses [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) to serve and manage state in a global context to the platform.

As all data is managed and served by the CMS, state management involves two main steps:

- communicating with the background
- managing state changes on the front

### Communicating between different parts of the extension

To handle all communication with the background we use [plasmo messaging](https://docs.plasmo.com/framework/messaging). The official documentation gives a detailed explanation of the implementation of this api but in this codebase it takes the following form:

- all messaging handlers are stored under `background/messages/` with the following pattern
  > | background/  
  > |-- messages/  
  > |---- handler_name.ts

Types are auto generated for all handlers, so long as they are stored according to this file structure. An implementation of this handler would look like this:

```typescript
const messagingResult = await sendToBackground({
  name: "handler_name"
})
```
### Handling state on the frontend

Similarly to the messaging handlers, our implementation of Zustand is set up to automaticaly create all selectors for any part of our state as defined in `store/store.ts`

To use any part of the state, whether it's a value or a setter function, you can simply import the `useStore` hook and destructure the necessary values from the auto-generated selectors.

Here's an example that utilises the method `updateMessage` from the store:

```typescript
 const updateMessage = useStore.use.updateMessage()
```