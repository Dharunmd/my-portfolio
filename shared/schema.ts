import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog Posts Table
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  tags: json("tags").$type<string[]>().default([]),
  category: text("category").default("general"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  authorId: varchar("author_id").references(() => users.id),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials Table
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  avatar: text("avatar"),
  featured: boolean("featured").default(false),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact Form Submissions Table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  phone: text("phone"),
  status: text("status").default("new"), // new, read, replied
  replied: boolean("replied").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Analytics/Visitor Tracking Table
export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  path: text("path").notNull(),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  ipAddress: text("ip_address"),
  sessionId: text("session_id"),
  country: text("country"),
  city: text("city"),
  device: text("device"),
  browser: text("browser"),
  visitDuration: integer("visit_duration"), // in seconds
  bounced: boolean("bounced").default(true),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  approved: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  replied: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  timestamp: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
