import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  cpf: text("cpf").unique(),
  rg: text("rg"),
  birthDate: timestamp("birth_date"),
  profession: text("profession"),
  maritalStatus: text("marital_status"),
  nationality: text("nationality"),
  // Endereço
  street: text("street"),
  number: text("number"),
  complement: text("complement"),
  district: text("district"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country").default("Brasil"),
  // Status e metadados
  status: text("status").notNull().default("ativo"), // ativo, inativo, suspenso
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastContactDate: timestamp("last_contact_date"),
});

export const clientProcesses = pgTable("client_processes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  processNumber: text("process_number").notNull().unique(),
  processType: text("process_type").notNull(), // civel, criminal, trabalhista, etc
  court: text("court").notNull(),
  subject: text("subject").notNull(),
  status: text("status").notNull().default("ativo"), // ativo, arquivado, suspenso
  startDate: timestamp("start_date").notNull(),
  expectedEndDate: timestamp("expected_end_date"),
  description: text("description"),
  value: decimal("value", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clientCases = pgTable("client_cases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  caseNumber: text("case_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  caseType: text("case_type").notNull(),
  status: text("status").notNull().default("aberto"), // aberto, em_andamento, concluido, arquivado
  priority: text("priority").notNull().default("media"), // baixa, media, alta, urgente
  responsibleLawyer: text("responsible_lawyer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clientInssRequests = pgTable("client_inss_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  requestNumber: text("request_number").notNull(),
  requestType: text("request_type").notNull(), // aposentadoria, auxilio_doenca, etc
  status: text("status").notNull().default("em_analise"), // em_analise, deferido, indeferido, recurso
  requestDate: timestamp("request_date").notNull(),
  responseDate: timestamp("response_date"),
  value: decimal("value", { precision: 12, scale: 2 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clientFinancials = pgTable("client_financials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // receita, despesa
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  dueDate: timestamp("due_date"),
  paidDate: timestamp("paid_date"),
  status: text("status").notNull().default("pendente"), // pendente, pago, atrasado, cancelado
  category: text("category"), // honorarios, custas, despesas, etc
  paymentMethod: text("payment_method"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clientDocuments = pgTable("client_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(), // contrato, procuracao, certidao, etc
  filePath: text("file_path"),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  description: text("description"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clientSchedule = pgTable("client_schedule", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // audiencia, reuniao, prazo, etc
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  location: text("location"),
  status: text("status").notNull().default("agendado"), // agendado, realizado, cancelado, adiado
  priority: text("priority").notNull().default("media"),
  reminderMinutes: integer("reminder_minutes").default(60),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clientTasks = pgTable("client_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority").notNull().default("media"), // baixa, media, alta, urgente
  status: text("status").notNull().default("pendente"), // pendente, em_andamento, concluida, cancelada
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientProcessSchema = createInsertSchema(clientProcesses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientCaseSchema = createInsertSchema(clientCases).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientInssRequestSchema = createInsertSchema(clientInssRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientFinancialSchema = createInsertSchema(clientFinancials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientDocumentSchema = createInsertSchema(clientDocuments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientScheduleSchema = createInsertSchema(clientSchedule).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientTaskSchema = createInsertSchema(clientTasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type ClientProcess = typeof clientProcesses.$inferSelect;
export type InsertClientProcess = z.infer<typeof insertClientProcessSchema>;

export type ClientCase = typeof clientCases.$inferSelect;
export type InsertClientCase = z.infer<typeof insertClientCaseSchema>;

export type ClientInssRequest = typeof clientInssRequests.$inferSelect;
export type InsertClientInssRequest = z.infer<typeof insertClientInssRequestSchema>;

export type ClientFinancial = typeof clientFinancials.$inferSelect;
export type InsertClientFinancial = z.infer<typeof insertClientFinancialSchema>;

export type ClientDocument = typeof clientDocuments.$inferSelect;
export type InsertClientDocument = z.infer<typeof insertClientDocumentSchema>;

export type ClientSchedule = typeof clientSchedule.$inferSelect;
export type InsertClientSchedule = z.infer<typeof insertClientScheduleSchema>;

export type ClientTask = typeof clientTasks.$inferSelect;
export type InsertClientTask = z.infer<typeof insertClientTaskSchema>;
