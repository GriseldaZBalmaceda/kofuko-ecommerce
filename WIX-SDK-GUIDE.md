# How the Wix SDK Works in This Project

## Overview

This project uses the **Wix JavaScript SDK** (`@wix/sdk` + `@wix/stores`) to fetch product and category data from a Wix headless CMS. The SDK acts as a typed wrapper around the Wix REST API — you call JavaScript methods and the SDK handles HTTP requests, authentication, and response parsing behind the scenes.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Client)                           │
│                                                                     │
│  ┌───────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│  │  ProductList   │    │  ProductPage     │    │  CategoryList    │  │
│  │  Component     │    │  Component       │    │  Component       │  │
│  └──────┬────────┘    └──────┬───────────┘    └──────┬───────────┘  │
│         │                    │                       │              │
│         │ useProducts()      │ useProduct()          │ useCategories│
│         │                    │                       │              │
│  ┌──────▼────────────────────▼───────────────────────▼───────────┐  │
│  │                   TanStack React Query                        │  │
│  │              (Caching, Deduplication, Refetch)                 │  │
│  └──────────────────────────┬────────────────────────────────────┘  │
│                             │                                       │
│                     fetch("/api/...")                                │
│                             │                                       │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     NEXT.JS SERVER (API Routes)                     │
│                                                                     │
│  ┌──────────────────────┐       ┌────────────────────────────────┐  │
│  │ /api/products        │       │ /api/categories                │  │
│  │   route.ts           │       │   route.ts                     │  │
│  └──────────┬───────────┘       └───────────────┬────────────────┘  │
│             │                                   │                   │
│             └─────────────┬─────────────────────┘                   │
│                           │                                         │
│                           ▼                                         │
│             ┌──────────────────────────┐                            │
│             │   wixClientServer()      │                            │
│             │   src/lib/wixClientServer│                            │
│             │                          │                            │
│             │  - createClient()        │                            │
│             │  - OAuthStrategy()       │                            │
│             │  - modules: products,    │                            │
│             │    collections           │                            │
│             └────────────┬─────────────┘                            │
│                          │                                          │
└──────────────────────────┼──────────────────────────────────────────┘
                           │
                   SDK handles HTTP
                   requests + auth
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        WIX CLOUD (CMS)                              │
│                                                                     │
│           Products Data    |    Collections Data                     │
│           (name, price,    |    (categories,                        │
│            images, slug)   |     descriptions)                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Step-by-Step

### 1. Component Renders

A React component (e.g., `ProductList`) calls a custom hook like `useProducts()`.

### 2. TanStack Query Manages the Request

The hook uses `useQuery` from TanStack React Query. TanStack handles:
- **Caching** — avoids duplicate requests for the same data
- **Background refetching** — keeps data fresh
- **Loading/error states** — provides `isLoading` and `error` out of the box

### 3. Fetch Hits the Next.js API Route

The `queryFn` inside the hook makes a `fetch()` call to a local Next.js API route (e.g., `/api/products`).

### 4. API Route Creates a Wix SDK Client

The API route calls `wixClientServer()` which:
- Reads the `refreshToken` from cookies (for authenticated sessions)
- Calls `createClient()` from `@wix/sdk` with:
  - **modules** — `products` and `collections` from `@wix/stores`
  - **auth** — `OAuthStrategy` using your `NEXT_PUBLIC_WIX_CLIENT_ID`

### 5. SDK Queries Wix Cloud

The API route uses the SDK's query builder to fetch data:

```ts
// Fetch all products
wixClient.products.queryProducts().find()

// Fetch a single product by slug
wixClient.products.queryProducts().eq('slug', 'my-product').find()

// Fetch products by category
wixClient.products.queryProducts().eq('collectionIds', categoryId).find()

// Fetch all collections/categories
wixClient.collections.queryCollections().find()
```

Under the hood, the SDK converts these method calls into HTTP requests to the Wix REST API, attaches auth headers, and parses the JSON response into typed objects.

### 6. Response Flows Back

```
Wix Cloud → SDK (parsed response) → API Route (NextResponse.json) → fetch() → TanStack cache → Component re-renders
```

---

## Key Files

| File | Role |
|------|------|
| `src/lib/wixClientServer.ts` | Creates the server-side Wix SDK client with OAuth auth |
| `src/app/context/wixContext.tsx` | Creates a client-side Wix SDK client + React Context provider |
| `src/app/hooks/useWixClient.tsx` | Hook to access the client-side Wix client from context |
| `src/app/hooks/useProducts.ts` | TanStack hook — fetches products via `/api/products` |
| `src/app/hooks/useProduct.ts` | TanStack hook — fetches a single product by slug |
| `src/app/hooks/useCategories.ts` | TanStack hook — fetches categories via `/api/categories` |
| `src/app/api/products/route.ts` | Next.js API route — uses server SDK to query Wix products |
| `src/app/api/categories/route.ts` | Next.js API route — uses server SDK to query Wix collections |
| `src/app/components/ProductList.tsx` | UI component — displays products using `useProducts()` |
| `src/app/layout.tsx` | Wraps app with `QueryProvider` + `WixClientContextProvider` |

---

## Two SDK Clients: Server vs Client

This project has **two** Wix SDK clients:

### Server Client (`wixClientServer.ts`)
- Runs on the **server** inside Next.js API routes
- Reads auth tokens from **Next.js cookies** (`cookies()` from `next/headers`)
- Used by `/api/products` and `/api/categories`

### Client Client (`wixContext.tsx`)
- Runs in the **browser**
- Reads auth tokens from **browser cookies** (`js-cookie`)
- Provided to components via React Context
- Accessible through the `useWixClient()` hook

---

## Authentication Flow

```
┌──────────────┐         ┌──────────────┐         ┌──────────┐
│   Browser    │         │  Next.js     │         │   Wix    │
│   Cookie     │────────▶│  Server/     │────────▶│   Cloud  │
│ (refreshToken│         │  Client      │         │          │
│  stored)     │         │              │         │          │
└──────────────┘         │  OAuthStrategy        │          │
                         │  + clientId  │         │          │
                         └──────────────┘         └──────────┘
```

- The `NEXT_PUBLIC_WIX_CLIENT_ID` identifies your Wix app
- The `refreshToken` (stored in cookies) handles user sessions
- The SDK's `OAuthStrategy` manages token refresh automatically
