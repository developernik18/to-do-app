## Overview

This is a simple yet powerful To-Do List application built with React, TypeScript, and TailwindCSS. It supports the following features:

- Adding and removing tasks
- Marking tasks as completed
- Drag-and-drop reordering using `react-dnd`
- Keyboard shortcuts for quick actions
- Filtering tasks (All, Active, Completed)
- Persistent data storage with Local Storage

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS version recommended)
- npm or yarn

### Steps to Install

1. Clone the repository:
    
    ```bash
    git clone https://github.com/developernik18/to-do-app.git
    cd to-do-app
    
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    # or
    yarn install
    
    ```
    
3. Start the development server:
    
    ```bash
    npm run dev
    # or
    yarn dev
    
    ```
    

## Features & Usage

### Adding a Task

- Type a task in the input box.
- Press `Enter` to add the task.
- Alternatively, click the "Add" button.

### Marking a Task as Completed

- Click on the task text or the checkbox to toggle completion.
- Press `Shift + Enter` to mark the last task as completed.

### Removing a Task

- Click the "Remove" button next to a task.

### Drag-and-Drop Reordering

- Drag tasks to reorder them.
- The new order is saved automatically.

### Filtering Tasks

- Click on "All", "Active", or "Completed" to filter tasks.
- The selected filter is highlighted.

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| Enter | Add a new task |
| Shift + Enter | Mark the last task as completed |

## Data Persistence

- Tasks are stored in the browser's Local Storage.
- Tasks persist even after page refresh.

## Technologies Used

- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Styling framework
- **react-dnd**: Drag-and-drop functionality
- **Local Storage**: Data persistence

## Future Enhancements

- Dark mode support
- Task editing feature
- Task due dates and reminders
