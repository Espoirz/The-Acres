import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertAnimalSchema, 
  insertBreedingSchema, 
  insertTrainingSessionSchema,
  insertMarketplaceListingSchema,
  insertFacilitySchema,
  insertCompetitionEntrySchema,
  type AnimalType 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Animal routes
  app.get('/api/animals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const animals = await storage.getAnimalsByOwner(userId);
      res.json(animals);
    } catch (error) {
      console.error("Error fetching animals:", error);
      res.status(500).json({ message: "Failed to fetch animals" });
    }
  });

  app.get('/api/animals/:id', isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.id);
      const animal = await storage.getAnimal(animalId);
      
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      
      // Check if user owns this animal
      if (animal.ownerId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(animal);
    } catch (error) {
      console.error("Error fetching animal:", error);
      res.status(500).json({ message: "Failed to fetch animal" });
    }
  });

  app.post('/api/animals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const animalData = insertAnimalSchema.parse({
        ...req.body,
        ownerId: userId,
      });
      
      const animal = await storage.createAnimal(animalData);
      res.status(201).json(animal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid animal data", errors: error.errors });
      }
      console.error("Error creating animal:", error);
      res.status(500).json({ message: "Failed to create animal" });
    }
  });

  app.patch('/api/animals/:id', isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.id);
      const animal = await storage.getAnimal(animalId);
      
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      
      if (animal.ownerId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updatedAnimal = await storage.updateAnimal(animalId, req.body);
      res.json(updatedAnimal);
    } catch (error) {
      console.error("Error updating animal:", error);
      res.status(500).json({ message: "Failed to update animal" });
    }
  });

  app.delete('/api/animals/:id', isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.id);
      const animal = await storage.getAnimal(animalId);
      
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      
      if (animal.ownerId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deleteAnimal(animalId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting animal:", error);
      res.status(500).json({ message: "Failed to delete animal" });
    }
  });

  // Breeding routes
  app.get('/api/breeding', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const breedings = await storage.getBreedingsByOwner(userId);
      res.json(breedings);
    } catch (error) {
      console.error("Error fetching breedings:", error);
      res.status(500).json({ message: "Failed to fetch breedings" });
    }
  });

  app.post('/api/breeding', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const breedingData = insertBreedingSchema.parse(req.body);
      
      // Verify user owns both animals
      const mother = await storage.getAnimal(breedingData.motherId);
      const father = await storage.getAnimal(breedingData.fatherId);
      
      if (!mother || !father) {
        return res.status(404).json({ message: "One or both animals not found" });
      }
      
      if (mother.ownerId !== userId || father.ownerId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const breeding = await storage.createBreeding(breedingData);
      res.status(201).json(breeding);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid breeding data", errors: error.errors });
      }
      console.error("Error creating breeding:", error);
      res.status(500).json({ message: "Failed to create breeding" });
    }
  });

  // Training routes
  app.get('/api/training/active', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const activeSessions = await storage.getActiveTrainingsByOwner(userId);
      res.json(activeSessions);
    } catch (error) {
      console.error("Error fetching active training:", error);
      res.status(500).json({ message: "Failed to fetch active training" });
    }
  });

  app.post('/api/training', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessionData = insertTrainingSessionSchema.parse(req.body);
      
      // Verify user owns the animal
      const animal = await storage.getAnimal(sessionData.animalId);
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      
      if (animal.ownerId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const session = await storage.createTrainingSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid training data", errors: error.errors });
      }
      console.error("Error creating training session:", error);
      res.status(500).json({ message: "Failed to create training session" });
    }
  });

  // Marketplace routes
  app.get('/api/marketplace', async (req, res) => {
    try {
      const filters = {
        animalType: req.query.animalType as string,
        breed: req.query.breed as string,
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
        sortBy: req.query.sortBy as string,
      };
      
      const listings = await storage.getMarketplaceListings(filters);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching marketplace listings:", error);
      res.status(500).json({ message: "Failed to fetch marketplace listings" });
    }
  });

  app.post('/api/marketplace', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const listingData = insertMarketplaceListingSchema.parse({
        ...req.body,
        sellerId: userId,
      });
      
      // Verify user owns the animal
      const animal = await storage.getAnimal(listingData.animalId);
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      
      if (animal.ownerId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const listing = await storage.createMarketplaceListing(listingData);
      res.status(201).json(listing);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid listing data", errors: error.errors });
      }
      console.error("Error creating marketplace listing:", error);
      res.status(500).json({ message: "Failed to create marketplace listing" });
    }
  });

  // Facilities routes
  app.get('/api/facilities', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const facilities = await storage.getFacilitiesByOwner(userId);
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.post('/api/facilities', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const facilityData = insertFacilitySchema.parse({
        ...req.body,
        ownerId: userId,
      });
      
      const facility = await storage.createFacility(facilityData);
      res.status(201).json(facility);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid facility data", errors: error.errors });
      }
      console.error("Error creating facility:", error);
      res.status(500).json({ message: "Failed to create facility" });
    }
  });

  // Competition routes
  app.get('/api/competitions', async (req, res) => {
    try {
      const competitions = await storage.getActiveCompetitions();
      res.json(competitions);
    } catch (error) {
      console.error("Error fetching competitions:", error);
      res.status(500).json({ message: "Failed to fetch competitions" });
    }
  });

  app.post('/api/competitions/:id/entries', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const competitionId = parseInt(req.params.id);
      const entryData = insertCompetitionEntrySchema.parse({
        ...req.body,
        competitionId,
        ownerId: userId,
      });
      
      // Verify user owns the animal
      const animal = await storage.getAnimal(entryData.animalId);
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      
      if (animal.ownerId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const entry = await storage.createCompetitionEntry(entryData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid entry data", errors: error.errors });
      }
      console.error("Error creating competition entry:", error);
      res.status(500).json({ message: "Failed to create competition entry" });
    }
  });

  // Stats routes
  app.get('/api/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
