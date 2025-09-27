import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema, insertClientProcessSchema, insertClientCaseSchema, insertClientInssRequestSchema, insertClientFinancialSchema, insertClientDocumentSchema, insertClientScheduleSchema, insertClientTaskSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Client routes
  
  // Get all clients with pagination, search, and filtering
  app.get("/api/clients", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const status = req.query.status as string;
      
      const result = await storage.getClients(page, limit, search, status);
      res.json(result);
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  });

  // Get single client by ID
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.json(client);
    } catch (error) {
      console.error('Error fetching client:', error);
      res.status(500).json({ error: 'Failed to fetch client' });
    }
  });

  // Create new client
  app.post("/api/clients", async (req, res) => {
    try {
      const clientData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(clientData);
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid client data', details: error.errors });
      }
      console.error('Error creating client:', error);
      res.status(500).json({ error: 'Failed to create client' });
    }
  });

  // Update client
  app.put("/api/clients/:id", async (req, res) => {
    try {
      const clientData = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(req.params.id, clientData);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.json(client);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid client data', details: error.errors });
      }
      console.error('Error updating client:', error);
      res.status(500).json({ error: 'Failed to update client' });
    }
  });

  // Delete client
  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const success = await storage.deleteClient(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.json({ message: 'Client deleted successfully' });
    } catch (error) {
      console.error('Error deleting client:', error);
      res.status(500).json({ error: 'Failed to delete client' });
    }
  });

  // Get client processes
  app.get("/api/clients/:id/processes", async (req, res) => {
    try {
      const processes = await storage.getClientProcesses(req.params.id);
      res.json(processes);
    } catch (error) {
      console.error('Error fetching client processes:', error);
      res.status(500).json({ error: 'Failed to fetch client processes' });
    }
  });

  // Get client cases
  app.get("/api/clients/:id/cases", async (req, res) => {
    try {
      const cases = await storage.getClientCases(req.params.id);
      res.json(cases);
    } catch (error) {
      console.error('Error fetching client cases:', error);
      res.status(500).json({ error: 'Failed to fetch client cases' });
    }
  });

  // Get client INSS requests
  app.get("/api/clients/:id/inss-requests", async (req, res) => {
    try {
      const requests = await storage.getClientInssRequests(req.params.id);
      res.json(requests);
    } catch (error) {
      console.error('Error fetching client INSS requests:', error);
      res.status(500).json({ error: 'Failed to fetch client INSS requests' });
    }
  });

  // Get client financials
  app.get("/api/clients/:id/financials", async (req, res) => {
    try {
      const financials = await storage.getClientFinancials(req.params.id);
      res.json(financials);
    } catch (error) {
      console.error('Error fetching client financials:', error);
      res.status(500).json({ error: 'Failed to fetch client financials' });
    }
  });

  // Get client documents
  app.get("/api/clients/:id/documents", async (req, res) => {
    try {
      const documents = await storage.getClientDocuments(req.params.id);
      res.json(documents);
    } catch (error) {
      console.error('Error fetching client documents:', error);
      res.status(500).json({ error: 'Failed to fetch client documents' });
    }
  });

  // Get client schedule
  app.get("/api/clients/:id/schedule", async (req, res) => {
    try {
      const schedule = await storage.getClientSchedule(req.params.id);
      res.json(schedule);
    } catch (error) {
      console.error('Error fetching client schedule:', error);
      res.status(500).json({ error: 'Failed to fetch client schedule' });
    }
  });

  // Get client tasks
  app.get("/api/clients/:id/tasks", async (req, res) => {
    try {
      const tasks = await storage.getClientTasks(req.params.id);
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching client tasks:', error);
      res.status(500).json({ error: 'Failed to fetch client tasks' });
    }
  });

  // Create client process
  app.post("/api/clients/:id/processes", async (req, res) => {
    try {
      const processData = insertClientProcessSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      const process = await storage.createClientProcess(processData);
      res.status(201).json(process);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid process data', details: error.errors });
      }
      console.error('Error creating client process:', error);
      res.status(500).json({ error: 'Failed to create client process' });
    }
  });

  // Create client case
  app.post("/api/clients/:id/cases", async (req, res) => {
    try {
      const caseData = insertClientCaseSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      const clientCase = await storage.createClientCase(caseData);
      res.status(201).json(clientCase);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid case data', details: error.errors });
      }
      console.error('Error creating client case:', error);
      res.status(500).json({ error: 'Failed to create client case' });
    }
  });

  // Create client INSS request
  app.post("/api/clients/:id/inss-requests", async (req, res) => {
    try {
      const requestData = insertClientInssRequestSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      const request = await storage.createClientInssRequest(requestData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid INSS request data', details: error.errors });
      }
      console.error('Error creating client INSS request:', error);
      res.status(500).json({ error: 'Failed to create client INSS request' });
    }
  });

  // Create client financial record
  app.post("/api/clients/:id/financials", async (req, res) => {
    try {
      const financialData = insertClientFinancialSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      const financial = await storage.createClientFinancial(financialData);
      res.status(201).json(financial);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid financial data', details: error.errors });
      }
      console.error('Error creating client financial record:', error);
      res.status(500).json({ error: 'Failed to create client financial record' });
    }
  });

  // Create client document
  app.post("/api/clients/:id/documents", async (req, res) => {
    try {
      const documentData = insertClientDocumentSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      const document = await storage.createClientDocument(documentData);
      res.status(201).json(document);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid document data', details: error.errors });
      }
      console.error('Error creating client document:', error);
      res.status(500).json({ error: 'Failed to create client document' });
    }
  });

  // Create client schedule item
  app.post("/api/clients/:id/schedule", async (req, res) => {
    try {
      const scheduleData = insertClientScheduleSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      const schedule = await storage.createClientSchedule(scheduleData);
      res.status(201).json(schedule);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid schedule data', details: error.errors });
      }
      console.error('Error creating client schedule item:', error);
      res.status(500).json({ error: 'Failed to create client schedule item' });
    }
  });

  // Create client task
  app.post("/api/clients/:id/tasks", async (req, res) => {
    try {
      const taskData = insertClientTaskSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      const task = await storage.createClientTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Invalid task data', details: error.errors });
      }
      console.error('Error creating client task:', error);
      res.status(500).json({ error: 'Failed to create client task' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
