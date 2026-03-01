# UI Coding Standards

## Component Library

**Only shadcn/ui components are permitted in this project.**

- Do NOT create custom UI components (buttons, inputs, modals, cards, etc.)
- Do NOT use other component libraries (MUI, Chakra, Radix directly, etc.)
- Every UI element must come from the shadcn/ui library
- Install new shadcn/ui components via: `npx shadcn@latest add <component>`

## Date Formatting

All date formatting must use **date-fns**.

Dates must be displayed using ordinal day, abbreviated month, and full year:

```
1st Sep 2026
2nd Aug 2026
3rd Oct 2026
4th Dec 2026
```

### Implementation

Use `format` with `do` (ordinal day), `MMM` (abbreviated month), and `yyyy` (year):

```ts
import { format } from "date-fns";

format(date, "do MMM yyyy")
// => "1st Sep 2026"
```
