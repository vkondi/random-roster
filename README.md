# Random Roster

Random Roster is a modern web application designed to streamline team organization and collaboration. Whether you're managing classroom activities, organizing work teams, or running group events, Random Roster helps you create fair and balanced team arrangements with just a few clicks.

The application offers various randomization tools to eliminate bias in team formation and member selection, making it perfect for educators, team leaders, and event organizers who want to ensure equal participation and diverse group dynamics.

Key benefits:
- Fair and unbiased team organization
- Quick and efficient member selection
- Flexible group management
- Beautiful and intuitive interface
- Seamless user experience

## Features

1. **Team Shuffler**
   - Create random groups by splitting members equally
   - Smart dropdown for selecting number of teams
   - Smooth shuffle animations and transitions
   - Responsive card-based interface

2. **Team Sorting**
   - Sort team members randomly
   - Animated sorting experience
   - Easy group selection
   - Modern Material Design

3. **Team Pairs**
   - Create random pairs for buddy systems and pair programming
   - Handle odd numbers gracefully (last person may be alone)
   - Exclude marked members from pairing
   - Visual representation with avatars

4. **Random Member Selection**
   - Select specified number of random members
   - Perfect for presentations and tasks
   - Number input constrained to group size
   - Exclude marked members from selection

5. **Team Groups**
   - Create and manage custom groups
   - Add/remove team members
   - Unique avatar for each member
   - Local storage persistence
   - Support for 2-100 members per group
   - Intuitive group management interface

6. **All-in-One**
   - Access all features in one unified interface
   - Quick switching between different tools
   - Consistent experience across features
   - Streamlined workflow

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Material-UI (MUI)
- Emotion for styling
- Framer Motion for animations
- Zustand for state management
- DiceBear for avatars
- MUI Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd random-roster
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Creating a Group**
   - Navigate to the Team Groups page
   - Enter a group name and click "Add Group"
   - Add team members using the input field
   - View all members in a responsive grid layout

2. **Shuffling Teams**
   - Go to the Team Shuffler page
   - Choose the number of teams from available options
   - Click "Shuffle Teams" to see the results
   - Teams are displayed in beautiful animated cards

3. **Sorting Members**
   - Visit the Team Sorting page
   - Click "Sort Members" to randomize the order
   - View sorted members in a modern grid layout

4. **Creating Pairs**
   - Navigate to the Team Pairs page
   - Click "Create Pairs" to generate random pairs
   - View pairs with member avatars and names

5. **Selecting Random Members**
   - Go to the Random Members page
   - Set the number of members to select
   - Click "Select Members" to choose random participants
   - View selected members with their avatars

6. **Using All-in-One**
   - Access the All-in-One page for all features
   - Switch between different tools without changing pages
   - Maintain consistent workflow and experience
   - View results in a unified interface

## Features in Detail

### Modern UI/UX
- Material Design components and styling
- Responsive layout that works on all devices
- Smooth animations and transitions
- Consistent theme across all pages
- Intuitive navigation and user flow
- Personalized avatars for all members

### Smart Team Management
- Automatic calculation of possible team combinations
- Dropdown selection for number of teams based on group size
- Real-time updates and animations
- Error prevention with smart input validation

### Data Persistence
- Local storage for saving groups and members
- Automatic state management with Zustand
- Seamless data synchronization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
