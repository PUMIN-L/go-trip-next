Features

- UI / UX
  Light / Dark mode toggle
  Responsive and modern UI

Visitor (Not Logged In)

- View product list
- View product details
- Login is required to interact with products (add to cart, like, comment, etc.)

User Features

- Register / Login using:
  Email (via Clerk)
  LINE (via Clerk)
- Add products to cart
- Create orders
- Checkout using Stripe (Test Mode)
- Automatically clear cart after successful payment
- View order history
- Like / unlike products
- Comment on products
- Rate products (average rating shown on product detail page)
- Delete own comments

Admin Features

- Admin can do everything a normal user can
- Create / Edit / Delete products
- View all orders from all users
- Delete any order

Authentication

This project uses Clerk
for authentication and user management.

- Email & social login
- Role-based access (User / Admin)
- Secure session handling

Payments

Payments are implemented using Stripe (Test Mode).

Test Card
Card Number: 4242 4242 4242 4242
Expiration Date: 12/29
CVC: Any 3 digits

Test Accounts
Test User
Email: user1+clerk_test@example.com
Password: user1Fortest1

Admin Account
Email: admin+clerk_test@example.com
Password: Nicole-test222

Tech Stack
Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Radix UI (Accessible UI primitives)
- shadcn/ui (UI components built on Radix UI)
- next-themes (Light / Dark mode)
- Backend / Services
- Clerk (Authentication)
- Prisma (ORM)
- TiDB / MySQL
- Supabase
- Stripe (Payments)

Dependencies (Main) -->คืออะไร ไม่ต้องใส่ดีป่าว

- Next.js
- React
- @clerk/nextjs (Authentication)
- Prisma (ORM)
- Stripe & @stripe/react-stripe-js (Payments)
- Supabase JS (Image storage)
- Tailwind CSS
- shadcn/ui (UI components)

Environment Variables

Create a .env file in the root directory and configure the following variables:
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

SUPABASE_URL=your_supabase_url  
SUPABASE_KEY=your_supabase_key

ADMIN_USER_ID=your_admin_user_id

Purpose of This Project

This project was built to:

- Practice full-stack web development with modern tools
- Demonstrate real-world features (authentication, payments, roles, orders)
- Serve as a demo project for job applications
- Deploy a production-like application using Vercel and TiDB Cloud as the database

Notes

All payments use Stripe test mode
This is a demo project, not intended for production use
