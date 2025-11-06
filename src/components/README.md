# Components

Reusable React components organized by domain.

## Structure

- `ui/` - shadcn/ui base components (Button, Card, Dialog, etc.)
- `frontend/` - Customer-facing components
  - `layout/` - Header, Footer, Navigation
  - `menu/` - MenuCard, MenuGrid, MenuFilters
  - `orders/` - OrderStatus, OrderCard, OrderTracking
  - `whatsapp/` - WhatsApp integration components
- `dashboard/` - Admin dashboard components
  - `layout/` - Sidebar, DashboardNav, TopBar
  - `orders/` - OrderTable, OrderFilters, OrderForm
  - `customers/` - CustomerTable, CustomerForm
  - `analytics/` - Charts, Stats, Reports
- `shared/` - Components used by BOTH frontend and dashboard
  - `forms/` - FormInput, FormSelect, FormTextarea
  - `feedback/` - LoadingSpinner, ErrorMessage, Toast

## Rules

- **Never** mix frontend and dashboard components
- Co-locate related components in the same folder
- Use descriptive names (OrdersTable, not Table)
- Export named components (not default)
- Type all props with interfaces
- Use shadcn/ui components from `ui/` folder
- Keep components focused and reusable
- Max folder depth: 3 levels

## When to Create a Shared Component

Only create a shared component if:
1. Used by both frontend AND dashboard
2. Truly generic (not domain-specific)
3. No domain-specific logic

Otherwise, keep in frontend/ or dashboard/
