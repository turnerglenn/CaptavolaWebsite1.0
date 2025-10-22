import { type User, type InsertUser, type WaitlistSubmission, type InsertWaitlistSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistSubmission(submission: InsertWaitlistSubmission): Promise<WaitlistSubmission>;
  getAllWaitlistSubmissions(): Promise<WaitlistSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private waitlistSubmissions: Map<string, WaitlistSubmission>;

  constructor() {
    this.users = new Map();
    this.waitlistSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaitlistSubmission(insertSubmission: InsertWaitlistSubmission): Promise<WaitlistSubmission> {
    const id = randomUUID();
    const submission: WaitlistSubmission = {
      id,
      name: insertSubmission.name,
      email: insertSubmission.email,
      company: insertSubmission.company ?? null,
      message: insertSubmission.message ?? null,
      createdAt: new Date(),
    };
    this.waitlistSubmissions.set(id, submission);
    return submission;
  }

  async getAllWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
    return Array.from(this.waitlistSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
