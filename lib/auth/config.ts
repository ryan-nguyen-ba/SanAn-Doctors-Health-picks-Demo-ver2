import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock users for frontend demo (no database needed)
const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123",
    name: "管理者",
    role: "ADMIN",
  },
  {
    id: "2",
    email: "provider@example.com",
    password: "password123",
    name: "プロバイダー",
    role: "PROVIDER",
  },
  {
    id: "3",
    email: "employee@example.com",
    password: "password123",
    name: "従業員",
    role: "EMPLOYEE",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        // Find user in mock data
        const user = mockUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          console.log("User not found:", credentials.email);
          return null;
        }

        console.log("User authorized:", user.email, user.role);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

