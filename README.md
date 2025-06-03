
# Firebase Studio - Royal Casino

This is a NextJS starter for the Royal Casino app in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

## Theme System

The Royal Casino app uses a theme system to manage the appearance and behavior of different games and their variations.

### Game Types vs. Themes

*   **Game Types**: These are the fundamental game mechanics, such as Slots, Poker, Bingo, Coin Flip, etc. Each game type has its own core logic.
*   **Themes**: These are specific variations applied to a Game Type. For example, for the "Slots" game type, you might have themes like "Classic Fruits," "Vegas Adventure," "Horrific Halloween," or "Triple Diamond." Each theme can have its own unique:
    *   Visual assets (backgrounds, symbols)
    *   Sound effects
    *   Grid layout (for games like Slots)
    *   Paylines and Paytables (for games like Slots)
    *   Minor rule variations (if applicable)

### Theme Configuration

Theme configurations are defined as TypeScript objects. The interfaces for these configurations can be found in `src/types/game-theme.ts`.

For example, `SlotGameThemeConfig` defines the structure for slot game themes, including:
*   `themeId`: A unique string identifier for the theme.
*   `displayName`: A user-friendly name for the theme.
*   `description`: A short description of the theme.
*   `grid`: An object specifying the number of `rows` and `cols` for the slot machine.
*   `symbols`: An array of symbol objects, each with an `id` (matching a symbol component name) and a `weight` (for weighted random generation).
*   `paylines`: An array defining the winning lines as coordinates on the grid.
*   `paytable`: An object mapping symbol IDs and their counts to payout multipliers.
*   `backgroundAsset`: A string (often a Tailwind class) for the theme's background.
*   `soundAssets`: Paths to sound files for various game events.

### Adding a New Slot Theme

1.  **Create Symbol Components**: If your new theme uses new symbols, create SVG React components for them in `src/components/game/symbols/`. For example, `MyNewLabelSymbol.tsx`. Make sure to add a `data-ai-hint` attribute to the SVG for image generation assistance.
2.  **Register Symbol Components**: In the relevant game page (e.g., `src/app/games/slots/page.tsx`), import your new symbol component and add it to the `allSymbolComponents` map:
    ```tsx
    import MyNewLabelSymbol from '@/components/game/symbols/MyNewLabelSymbol';

    const allSymbolComponents: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
      // ... existing symbols
      MyNewLabelSymbol: MyNewLabelSymbol,
    };
    ```
3.  **Create Theme Configuration File**:
    *   Create a new file in the `src/game-themes/` directory, e.g., `my-new-slot-theme.theme.ts`.
    *   Import `SlotGameThemeConfig` from `src/types/game-theme.ts`.
    *   Define and export your theme configuration object:
        ```ts
        import type { SlotGameThemeConfig } from '@/types/game-theme';

        export const myNewSlotTheme: SlotGameThemeConfig = {
          gameType: 'slots',
          themeId: 'my-new-slot',
          displayName: 'My Awesome New Slot',
          description: 'Experience the thrill of my new slot game!',
          grid: { rows: 3, cols: 5 },
          symbols: [
            { id: 'CherrySymbol', weight: 30 }, // Uses an existing symbol
            { id: 'MyNewLabelSymbol', weight: 20 }, // Uses your new symbol
            // ... other symbols
          ],
          paylines: [
            [[1, 0], [1, 1], [1, 2], [1,3], [1,4]], // Middle row example for a 3x5 grid
            // ... other paylines
          ],
          paytable: {
            "CherrySymbol": { 5: 20, 4: 10, 3: 5 },
            "MyNewLabelSymbol": { 5: 100, 4: 50, 3: 10 },
            // ... payouts for other symbols
          },
          backgroundAsset: 'bg-my-new-theme-background', // Add this class to globals.css or use an image
          soundAssets: { /* ... */ },
        };
        ```
4.  **Make Theme Selectable**: Update the game page (e.g., `src/app/games/slots/page.tsx`) to include your new theme in the theme selection logic, allowing users to switch to it. This might involve adding it to an array of available themes and updating the `toggleTheme` function or a theme selector component.

This structured approach allows for easy expansion and management of game themes within the Royal Casino application.
