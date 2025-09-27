import { 
  type User, type InsertUser, users,
  type Client, type InsertClient, clients,
  type ClientProcess, type InsertClientProcess, clientProcesses,
  type ClientCase, type InsertClientCase, clientCases,
  type ClientInssRequest, type InsertClientInssRequest, clientInssRequests,
  type ClientFinancial, type InsertClientFinancial, clientFinancials,
  type ClientDocument, type InsertClientDocument, clientDocuments,
  type ClientSchedule, type InsertClientSchedule, clientSchedule,
  type ClientTask, type InsertClientTask, clientTasks
} from "@shared/schema";
import { eq, ilike, desc, count } from "drizzle-orm";
import { db } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Client operations
  getClients(page?: number, limit?: number, search?: string, status?: string): Promise<{ clients: Client[]; total: number }>;
  getClient(id: string): Promise<Client | undefined>;
  getClientByCpf(cpf: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  
  // Client related data operations
  getClientProcesses(clientId: string): Promise<ClientProcess[]>;
  getClientCases(clientId: string): Promise<ClientCase[]>;
  getClientInssRequests(clientId: string): Promise<ClientInssRequest[]>;
  getClientFinancials(clientId: string): Promise<ClientFinancial[]>;
  getClientDocuments(clientId: string): Promise<ClientDocument[]>;
  getClientSchedule(clientId: string): Promise<ClientSchedule[]>;
  getClientTasks(clientId: string): Promise<ClientTask[]>;
  
  // Create related records
  createClientProcess(process: InsertClientProcess): Promise<ClientProcess>;
  createClientCase(clientCase: InsertClientCase): Promise<ClientCase>;
  createClientInssRequest(request: InsertClientInssRequest): Promise<ClientInssRequest>;
  createClientFinancial(financial: InsertClientFinancial): Promise<ClientFinancial>;
  createClientDocument(document: InsertClientDocument): Promise<ClientDocument>;
  createClientSchedule(schedule: InsertClientSchedule): Promise<ClientSchedule>;
  createClientTask(task: InsertClientTask): Promise<ClientTask>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Client methods
  async getClients(page = 1, limit = 10, search?: string, status?: string): Promise<{ clients: Client[]; total: number }> {
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [];
    if (search) {
      whereConditions.push(ilike(clients.name, `%${search}%`));
    }
    if (status && status !== "todos") {
      whereConditions.push(eq(clients.status, status));
    }

    // Execute queries
    const clientsPromise = whereConditions.length > 0
      ? db.select().from(clients).where(whereConditions[0]).orderBy(desc(clients.createdAt)).offset(offset).limit(limit)
      : db.select().from(clients).orderBy(desc(clients.createdAt)).offset(offset).limit(limit);

    const countPromise = whereConditions.length > 0
      ? db.select({ count: count() }).from(clients).where(whereConditions[0])
      : db.select({ count: count() }).from(clients);

    const [clientsResult, countResult] = await Promise.all([
      clientsPromise,
      countPromise
    ]);

    return {
      clients: clientsResult,
      total: Number(countResult[0].count)
    };
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result[0];
  }

  async getClientByCpf(cpf: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.cpf, cpf)).limit(1);
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    const result = await db.insert(clients).values(client).returning();
    return result[0];
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await db
      .update(clients)
      .set({ ...client, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return result[0];
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Client related data methods
  async getClientProcesses(clientId: string): Promise<ClientProcess[]> {
    return await db.select().from(clientProcesses).where(eq(clientProcesses.clientId, clientId)).orderBy(desc(clientProcesses.createdAt));
  }

  async getClientCases(clientId: string): Promise<ClientCase[]> {
    return await db.select().from(clientCases).where(eq(clientCases.clientId, clientId)).orderBy(desc(clientCases.createdAt));
  }

  async getClientInssRequests(clientId: string): Promise<ClientInssRequest[]> {
    return await db.select().from(clientInssRequests).where(eq(clientInssRequests.clientId, clientId)).orderBy(desc(clientInssRequests.createdAt));
  }

  async getClientFinancials(clientId: string): Promise<ClientFinancial[]> {
    return await db.select().from(clientFinancials).where(eq(clientFinancials.clientId, clientId)).orderBy(desc(clientFinancials.createdAt));
  }

  async getClientDocuments(clientId: string): Promise<ClientDocument[]> {
    return await db.select().from(clientDocuments).where(eq(clientDocuments.clientId, clientId)).orderBy(desc(clientDocuments.createdAt));
  }

  async getClientSchedule(clientId: string): Promise<ClientSchedule[]> {
    return await db.select().from(clientSchedule).where(eq(clientSchedule.clientId, clientId)).orderBy(desc(clientSchedule.startDate));
  }

  async getClientTasks(clientId: string): Promise<ClientTask[]> {
    return await db.select().from(clientTasks).where(eq(clientTasks.clientId, clientId)).orderBy(desc(clientTasks.createdAt));
  }

  // Create related records
  async createClientProcess(process: InsertClientProcess): Promise<ClientProcess> {
    const result = await db.insert(clientProcesses).values(process).returning();
    return result[0];
  }

  async createClientCase(clientCase: InsertClientCase): Promise<ClientCase> {
    const result = await db.insert(clientCases).values(clientCase).returning();
    return result[0];
  }

  async createClientInssRequest(request: InsertClientInssRequest): Promise<ClientInssRequest> {
    const result = await db.insert(clientInssRequests).values(request).returning();
    return result[0];
  }

  async createClientFinancial(financial: InsertClientFinancial): Promise<ClientFinancial> {
    const result = await db.insert(clientFinancials).values(financial).returning();
    return result[0];
  }

  async createClientDocument(document: InsertClientDocument): Promise<ClientDocument> {
    const result = await db.insert(clientDocuments).values(document).returning();
    return result[0];
  }

  async createClientSchedule(schedule: InsertClientSchedule): Promise<ClientSchedule> {
    const result = await db.insert(clientSchedule).values(schedule).returning();
    return result[0];
  }

  async createClientTask(task: InsertClientTask): Promise<ClientTask> {
    const result = await db.insert(clientTasks).values(task).returning();
    return result[0];
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private clients: Map<string, Client>;

  constructor() {
    this.users = new Map();
    this.clients = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Client methods - Use database for now
  async getClients(page = 1, limit = 10, search?: string, status?: string): Promise<{ clients: Client[]; total: number }> {
    let query = db.select().from(clients);
    let countQuery = db.select({ count: count() }).from(clients);

    if (search) {
      const searchFilter = ilike(clients.name, `%${search}%`);
      query = query.where(searchFilter);
      countQuery = countQuery.where(searchFilter);
    }

    if (status && status !== "todos") {
      const statusFilter = eq(clients.status, status);
      query = query.where(statusFilter);
      countQuery = countQuery.where(statusFilter);
    }

    const offset = (page - 1) * limit;
    query = query.orderBy(desc(clients.createdAt)).offset(offset).limit(limit);

    const [clientsResult, countResult] = await Promise.all([query, countQuery]);

    return {
      clients: clientsResult,
      total: countResult[0].count as number
    };
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result[0];
  }

  async getClientByCpf(cpf: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.cpf, cpf)).limit(1);
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    const result = await db.insert(clients).values(client).returning();
    return result[0];
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await db
      .update(clients)
      .set({ ...client, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return result[0];
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Client related data methods - delegate to database
  async getClientProcesses(clientId: string): Promise<ClientProcess[]> {
    return await db.select().from(clientProcesses).where(eq(clientProcesses.clientId, clientId)).orderBy(desc(clientProcesses.createdAt));
  }

  async getClientCases(clientId: string): Promise<ClientCase[]> {
    return await db.select().from(clientCases).where(eq(clientCases.clientId, clientId)).orderBy(desc(clientCases.createdAt));
  }

  async getClientInssRequests(clientId: string): Promise<ClientInssRequest[]> {
    return await db.select().from(clientInssRequests).where(eq(clientInssRequests.clientId, clientId)).orderBy(desc(clientInssRequests.createdAt));
  }

  async getClientFinancials(clientId: string): Promise<ClientFinancial[]> {
    return await db.select().from(clientFinancials).where(eq(clientFinancials.clientId, clientId)).orderBy(desc(clientFinancials.createdAt));
  }

  async getClientDocuments(clientId: string): Promise<ClientDocument[]> {
    return await db.select().from(clientDocuments).where(eq(clientDocuments.clientId, clientId)).orderBy(desc(clientDocuments.createdAt));
  }

  async getClientSchedule(clientId: string): Promise<ClientSchedule[]> {
    return await db.select().from(clientSchedule).where(eq(clientSchedule.clientId, clientId)).orderBy(desc(clientSchedule.startDate));
  }

  async getClientTasks(clientId: string): Promise<ClientTask[]> {
    return await db.select().from(clientTasks).where(eq(clientTasks.clientId, clientId)).orderBy(desc(clientTasks.createdAt));
  }

  async createClientProcess(process: InsertClientProcess): Promise<ClientProcess> {
    const result = await db.insert(clientProcesses).values(process).returning();
    return result[0];
  }

  async createClientCase(clientCase: InsertClientCase): Promise<ClientCase> {
    const result = await db.insert(clientCases).values(clientCase).returning();
    return result[0];
  }

  async createClientInssRequest(request: InsertClientInssRequest): Promise<ClientInssRequest> {
    const result = await db.insert(clientInssRequests).values(request).returning();
    return result[0];
  }

  async createClientFinancial(financial: InsertClientFinancial): Promise<ClientFinancial> {
    const result = await db.insert(clientFinancials).values(financial).returning();
    return result[0];
  }

  async createClientDocument(document: InsertClientDocument): Promise<ClientDocument> {
    const result = await db.insert(clientDocuments).values(document).returning();
    return result[0];
  }

  async createClientSchedule(schedule: InsertClientSchedule): Promise<ClientSchedule> {
    const result = await db.insert(clientSchedule).values(schedule).returning();
    return result[0];
  }

  async createClientTask(task: InsertClientTask): Promise<ClientTask> {
    const result = await db.insert(clientTasks).values(task).returning();
    return result[0];
  }
}

// Use database storage in production, memory storage for development if needed
export const storage = new DbStorage();
