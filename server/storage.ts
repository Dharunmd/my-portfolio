import { 
  users, 
  blogPosts, 
  testimonials, 
  contactSubmissions, 
  analytics,
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type ContactSubmission,
  type InsertContactSubmission,
  type Analytics,
  type InsertAnalytics
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql, count } from "drizzle-orm";

// Extended interface for all CRUD operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Blog operations
  getBlogPosts(options?: { published?: boolean; limit?: number; offset?: number }): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  incrementBlogPostViews(id: string): Promise<void>;
  
  // Testimonial operations
  getTestimonials(options?: { approved?: boolean; featured?: boolean; limit?: number }): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
  
  // Contact operations
  getContactSubmissions(options?: { status?: string; limit?: number; offset?: number }): Promise<ContactSubmission[]>;
  getContactSubmission(id: string): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: string): Promise<boolean>;
  
  // Analytics operations
  recordAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalytics(options?: { path?: string; dateFrom?: Date; dateTo?: Date; limit?: number }): Promise<Analytics[]>;
  getAnalyticsSummary(dateFrom?: Date, dateTo?: Date): Promise<{
    totalVisits: number;
    uniqueVisitors: number;
    topPages: { path: string; views: number }[];
    topCountries: { country: string; visits: number }[];
    topBrowsers: { browser: string; visits: number }[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Blog operations
  async getBlogPosts(options: { published?: boolean; limit?: number; offset?: number } = {}): Promise<BlogPost[]> {
    const { published, limit = 50, offset = 0 } = options;
    
    let query = db.select().from(blogPosts);
    
    if (published !== undefined) {
      query = query.where(eq(blogPosts.published, published));
    }
    
    const posts = await query
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);
      
    return posts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }

  async incrementBlogPostViews(id: string): Promise<void> {
    await db
      .update(blogPosts)
      .set({ viewCount: sql`${blogPosts.viewCount} + 1` })
      .where(eq(blogPosts.id, id));
  }

  // Testimonial operations
  async getTestimonials(options: { approved?: boolean; featured?: boolean; limit?: number } = {}): Promise<Testimonial[]> {
    const { approved, featured, limit = 50 } = options;
    
    let query = db.select().from(testimonials);
    const conditions = [];
    
    if (approved !== undefined) {
      conditions.push(eq(testimonials.approved, approved));
    }
    if (featured !== undefined) {
      conditions.push(eq(testimonials.featured, featured));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const results = await query
      .orderBy(desc(testimonials.createdAt))
      .limit(limit);
      
    return results;
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | undefined> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial || undefined;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.rowCount > 0;
  }

  // Contact operations
  async getContactSubmissions(options: { status?: string; limit?: number; offset?: number } = {}): Promise<ContactSubmission[]> {
    const { status, limit = 50, offset = 0 } = options;
    
    let query = db.select().from(contactSubmissions);
    
    if (status) {
      query = query.where(eq(contactSubmissions.status, status));
    }
    
    const submissions = await query
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(limit)
      .offset(offset);
      
    return submissions;
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission || undefined;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission | undefined> {
    const [submission] = await db
      .update(contactSubmissions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return submission || undefined;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
    return result.rowCount > 0;
  }

  // Analytics operations
  async recordAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const [record] = await db
      .insert(analytics)
      .values(insertAnalytics)
      .returning();
    return record;
  }

  async getAnalytics(options: { path?: string; dateFrom?: Date; dateTo?: Date; limit?: number } = {}): Promise<Analytics[]> {
    const { path, dateFrom, dateTo, limit = 1000 } = options;
    
    let query = db.select().from(analytics);
    const conditions = [];
    
    if (path) {
      conditions.push(like(analytics.path, `%${path}%`));
    }
    if (dateFrom) {
      conditions.push(sql`${analytics.timestamp} >= ${dateFrom}`);
    }
    if (dateTo) {
      conditions.push(sql`${analytics.timestamp} <= ${dateTo}`);
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const results = await query
      .orderBy(desc(analytics.timestamp))
      .limit(limit);
      
    return results;
  }

  async getAnalyticsSummary(dateFrom?: Date, dateTo?: Date) {
    const conditions = [];
    if (dateFrom) {
      conditions.push(sql`${analytics.timestamp} >= ${dateFrom}`);
    }
    if (dateTo) {
      conditions.push(sql`${analytics.timestamp} <= ${dateTo}`);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Total visits
    const [totalVisitsResult] = await db
      .select({ count: count() })
      .from(analytics)
      .where(whereClause);

    // Unique visitors (by session ID)
    const [uniqueVisitorsResult] = await db
      .select({ count: sql`COUNT(DISTINCT ${analytics.sessionId})` })
      .from(analytics)
      .where(whereClause);

    // Top pages
    const topPages = await db
      .select({
        path: analytics.path,
        views: count()
      })
      .from(analytics)
      .where(whereClause)
      .groupBy(analytics.path)
      .orderBy(desc(count()))
      .limit(10);

    // Top countries
    const topCountries = await db
      .select({
        country: analytics.country,
        visits: count()
      })
      .from(analytics)
      .where(whereClause)
      .groupBy(analytics.country)
      .orderBy(desc(count()))
      .limit(10);

    // Top browsers
    const topBrowsers = await db
      .select({
        browser: analytics.browser,
        visits: count()
      })
      .from(analytics)
      .where(whereClause)
      .groupBy(analytics.browser)
      .orderBy(desc(count()))
      .limit(10);

    return {
      totalVisits: totalVisitsResult.count,
      uniqueVisitors: Number(uniqueVisitorsResult.count),
      topPages: topPages.map(p => ({ path: p.path || 'Unknown', views: p.views })),
      topCountries: topCountries.map(c => ({ country: c.country || 'Unknown', visits: c.visits })),
      topBrowsers: topBrowsers.map(b => ({ browser: b.browser || 'Unknown', visits: b.visits })),
    };
  }
}

export const storage = new DatabaseStorage();