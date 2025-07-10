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
  insertDailyCareSchema,
  insertVetRecordSchema,
  insertAchievementSchema,
  insertQuestSchema,
  insertFriendshipSchema,
  insertGuildSchema,
  insertEquipmentSchema,
  insertAuctionSchema,
  insertStaffSchema,
  insertNotificationSchema,
  insertResearchSchema,
  insertInsurancePolicySchema,
  insertWeatherSchema,
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

  // Daily Care routes
  app.get('/api/care/:animalId', isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.animalId);
      const care = await storage.getDailyCareByAnimal(animalId);
      res.json(care);
    } catch (error) {
      console.error("Error fetching daily care:", error);
      res.status(500).json({ message: "Failed to fetch daily care" });
    }
  });

  app.post('/api/care', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const careData = insertDailyCareSchema.parse({
        ...req.body,
        ownerId: userId,
        completedAt: new Date(),
      });
      const care = await storage.createDailyCare(careData);
      res.status(201).json(care);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid care data", errors: error.errors });
      }
      console.error("Error creating daily care:", error);
      res.status(500).json({ message: "Failed to create daily care" });
    }
  });

  app.get('/api/care/owner/:date?', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const date = req.params.date ? new Date(req.params.date) : undefined;
      const care = await storage.getDailyCareByOwner(userId, date);
      res.json(care);
    } catch (error) {
      console.error("Error fetching owner care:", error);
      res.status(500).json({ message: "Failed to fetch owner care" });
    }
  });

  // Veterinary routes
  app.get('/api/vet/:animalId', isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.animalId);
      const records = await storage.getVetRecordsByAnimal(animalId);
      res.json(records);
    } catch (error) {
      console.error("Error fetching vet records:", error);
      res.status(500).json({ message: "Failed to fetch vet records" });
    }
  });

  app.post('/api/vet', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recordData = insertVetRecordSchema.parse({
        ...req.body,
        ownerId: userId,
      });
      const record = await storage.createVetRecord(recordData);
      res.status(201).json(record);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vet record data", errors: error.errors });
      }
      console.error("Error creating vet record:", error);
      res.status(500).json({ message: "Failed to create vet record" });
    }
  });

  app.patch('/api/vet/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const record = await storage.updateVetRecord(id, req.body);
      res.json(record);
    } catch (error) {
      console.error("Error updating vet record:", error);
      res.status(500).json({ message: "Failed to update vet record" });
    }
  });

  // Achievement routes
  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get('/api/achievements/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching user achievements:", error);
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });

  app.post('/api/achievements/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { achievementId, progress } = req.body;
      const achievement = await storage.updateUserAchievement(userId, achievementId, progress);
      res.json(achievement);
    } catch (error) {
      console.error("Error updating achievement progress:", error);
      res.status(500).json({ message: "Failed to update achievement progress" });
    }
  });

  // Quest routes
  app.get('/api/quests', async (req, res) => {
    try {
      const quests = await storage.getActiveQuests();
      res.json(quests);
    } catch (error) {
      console.error("Error fetching quests:", error);
      res.status(500).json({ message: "Failed to fetch quests" });
    }
  });

  app.get('/api/quests/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const quests = await storage.getUserQuests(userId);
      res.json(quests);
    } catch (error) {
      console.error("Error fetching user quests:", error);
      res.status(500).json({ message: "Failed to fetch user quests" });
    }
  });

  app.post('/api/quests/accept', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { questId } = req.body;
      const userQuest = await storage.createUserQuest({ userId, questId });
      res.status(201).json(userQuest);
    } catch (error) {
      console.error("Error accepting quest:", error);
      res.status(500).json({ message: "Failed to accept quest" });
    }
  });

  app.patch('/api/quests/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const quest = await storage.updateUserQuest(id, req.body);
      res.json(quest);
    } catch (error) {
      console.error("Error updating quest:", error);
      res.status(500).json({ message: "Failed to update quest" });
    }
  });

  // Social routes - Friends
  app.get('/api/friends', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const friends = await storage.getFriendships(userId);
      res.json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ message: "Failed to fetch friends" });
    }
  });

  app.post('/api/friends/request', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { friendId } = req.body;
      const friendship = await storage.createFriendship({ userId, friendId });
      res.status(201).json(friendship);
    } catch (error) {
      console.error("Error creating friend request:", error);
      res.status(500).json({ message: "Failed to create friend request" });
    }
  });

  app.patch('/api/friends/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const friendship = await storage.updateFriendship(id, status);
      res.json(friendship);
    } catch (error) {
      console.error("Error updating friendship:", error);
      res.status(500).json({ message: "Failed to update friendship" });
    }
  });

  // Guild routes
  app.get('/api/guilds', async (req, res) => {
    try {
      const guilds = await storage.getGuilds();
      res.json(guilds);
    } catch (error) {
      console.error("Error fetching guilds:", error);
      res.status(500).json({ message: "Failed to fetch guilds" });
    }
  });

  app.get('/api/guilds/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const guild = await storage.getGuild(id);
      if (!guild) {
        return res.status(404).json({ message: "Guild not found" });
      }
      res.json(guild);
    } catch (error) {
      console.error("Error fetching guild:", error);
      res.status(500).json({ message: "Failed to fetch guild" });
    }
  });

  app.post('/api/guilds', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const guildData = insertGuildSchema.parse({
        ...req.body,
        ownerId: userId,
      });
      const guild = await storage.createGuild(guildData);
      res.status(201).json(guild);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid guild data", errors: error.errors });
      }
      console.error("Error creating guild:", error);
      res.status(500).json({ message: "Failed to create guild" });
    }
  });

  app.post('/api/guilds/:id/join', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const guildId = parseInt(req.params.id);
      const member = await storage.joinGuild(userId, guildId);
      res.status(201).json(member);
    } catch (error) {
      console.error("Error joining guild:", error);
      res.status(500).json({ message: "Failed to join guild" });
    }
  });

  app.get('/api/guilds/:id/members', async (req, res) => {
    try {
      const guildId = parseInt(req.params.id);
      const members = await storage.getGuildMembers(guildId);
      res.json(members);
    } catch (error) {
      console.error("Error fetching guild members:", error);
      res.status(500).json({ message: "Failed to fetch guild members" });
    }
  });

  // Equipment routes
  app.get('/api/equipment', async (req, res) => {
    try {
      const equipment = await storage.getEquipment();
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      res.status(500).json({ message: "Failed to fetch equipment" });
    }
  });

  app.get('/api/equipment/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const equipment = await storage.getUserEquipment(userId);
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching user equipment:", error);
      res.status(500).json({ message: "Failed to fetch user equipment" });
    }
  });

  app.post('/api/equipment/purchase', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { equipmentId, quantity } = req.body;
      const userEquipment = await storage.createUserEquipment({ userId, equipmentId, quantity });
      res.status(201).json(userEquipment);
    } catch (error) {
      console.error("Error purchasing equipment:", error);
      res.status(500).json({ message: "Failed to purchase equipment" });
    }
  });

  app.patch('/api/equipment/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const equipment = await storage.updateUserEquipment(id, req.body);
      res.json(equipment);
    } catch (error) {
      console.error("Error updating equipment:", error);
      res.status(500).json({ message: "Failed to update equipment" });
    }
  });

  // Auction routes
  app.get('/api/auctions', async (req, res) => {
    try {
      const auctions = await storage.getActiveAuctions();
      res.json(auctions);
    } catch (error) {
      console.error("Error fetching auctions:", error);
      res.status(500).json({ message: "Failed to fetch auctions" });
    }
  });

  app.post('/api/auctions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const auctionData = insertAuctionSchema.parse({
        ...req.body,
        sellerId: userId,
      });
      const auction = await storage.createAuction(auctionData);
      res.status(201).json(auction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid auction data", errors: error.errors });
      }
      console.error("Error creating auction:", error);
      res.status(500).json({ message: "Failed to create auction" });
    }
  });

  app.post('/api/auctions/:id/bid', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const auctionId = parseInt(req.params.id);
      const { bidAmount } = req.body;
      const bid = await storage.createAuctionBid({ auctionId, bidderId: userId, bidAmount });
      res.status(201).json(bid);
    } catch (error) {
      console.error("Error placing bid:", error);
      res.status(500).json({ message: "Failed to place bid" });
    }
  });

  app.get('/api/auctions/:id/bids', async (req, res) => {
    try {
      const auctionId = parseInt(req.params.id);
      const bids = await storage.getAuctionBids(auctionId);
      res.json(bids);
    } catch (error) {
      console.error("Error fetching auction bids:", error);
      res.status(500).json({ message: "Failed to fetch auction bids" });
    }
  });

  // Staff routes
  app.get('/api/staff', async (req, res) => {
    try {
      const staff = await storage.getAvailableStaff();
      res.json(staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
      res.status(500).json({ message: "Failed to fetch staff" });
    }
  });

  app.get('/api/staff/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const staff = await storage.getUserStaff(userId);
      res.json(staff);
    } catch (error) {
      console.error("Error fetching user staff:", error);
      res.status(500).json({ message: "Failed to fetch user staff" });
    }
  });

  app.post('/api/staff/hire', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { staffId, facilityId, contractLength } = req.body;
      const userStaff = await storage.hireStaff({ 
        userId, 
        staffId, 
        facilityId, 
        contractLength,
        contractExpires: new Date(Date.now() + contractLength * 24 * 60 * 60 * 1000)
      });
      res.status(201).json(userStaff);
    } catch (error) {
      console.error("Error hiring staff:", error);
      res.status(500).json({ message: "Failed to hire staff" });
    }
  });

  app.patch('/api/staff/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const staff = await storage.updateUserStaff(id, req.body);
      res.json(staff);
    } catch (error) {
      console.error("Error updating staff:", error);
      res.status(500).json({ message: "Failed to update staff" });
    }
  });

  // Notification routes
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notificationData = insertNotificationSchema.parse({
        ...req.body,
        userId,
      });
      const notification = await storage.createNotification(notificationData);
      res.status(201).json(notification);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid notification data", errors: error.errors });
      }
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  app.patch('/api/notifications/:id/read', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const notification = await storage.markNotificationRead(id);
      res.json(notification);
    } catch (error) {
      console.error("Error marking notification read:", error);
      res.status(500).json({ message: "Failed to mark notification read" });
    }
  });

  // Research routes
  app.get('/api/research', async (req, res) => {
    try {
      const research = await storage.getAvailableResearch();
      res.json(research);
    } catch (error) {
      console.error("Error fetching research:", error);
      res.status(500).json({ message: "Failed to fetch research" });
    }
  });

  app.get('/api/research/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const research = await storage.getUserResearch(userId);
      res.json(research);
    } catch (error) {
      console.error("Error fetching user research:", error);
      res.status(500).json({ message: "Failed to fetch user research" });
    }
  });

  app.post('/api/research/start', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { researchId } = req.body;
      const userResearch = await storage.startResearch({ 
        userId, 
        researchId, 
        startedAt: new Date() 
      });
      res.status(201).json(userResearch);
    } catch (error) {
      console.error("Error starting research:", error);
      res.status(500).json({ message: "Failed to start research" });
    }
  });

  app.patch('/api/research/:id/complete', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const research = await storage.completeResearch(id);
      res.json(research);
    } catch (error) {
      console.error("Error completing research:", error);
      res.status(500).json({ message: "Failed to complete research" });
    }
  });

  // Weather routes
  app.get('/api/weather', async (req, res) => {
    try {
      const weather = await storage.getCurrentWeather();
      res.json(weather);
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(500).json({ message: "Failed to fetch weather" });
    }
  });

  app.get('/api/weather/history', async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const weather = await storage.getWeatherHistory(days);
      res.json(weather);
    } catch (error) {
      console.error("Error fetching weather history:", error);
      res.status(500).json({ message: "Failed to fetch weather history" });
    }
  });

  // Wilderness and Biome routes
  app.get('/api/wilderness/biomes', async (req, res) => {
    try {
      const biomes = await storage.getBiomes();
      res.json(biomes);
    } catch (error) {
      console.error("Error fetching biomes:", error);
      res.status(500).json({ message: "Failed to fetch biomes" });
    }
  });

  app.get('/api/wilderness/captures', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const captures = await storage.getWildCaptures(userId);
      res.json(captures);
    } catch (error) {
      console.error("Error fetching wild captures:", error);
      res.status(500).json({ message: "Failed to fetch wild captures" });
    }
  });

  app.post('/api/wilderness/capture', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const captureData = {
        ...req.body,
        userId,
        captureDate: new Date(),
      };
      const capture = await storage.createWildCapture(captureData);
      res.status(201).json(capture);
    } catch (error) {
      console.error("Error creating wild capture:", error);
      res.status(500).json({ message: "Failed to create wild capture" });
    }
  });

  app.patch('/api/wilderness/captures/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const capture = await storage.updateWildCapture(id, req.body);
      res.json(capture);
    } catch (error) {
      console.error("Error updating wild capture:", error);
      res.status(500).json({ message: "Failed to update wild capture" });
    }
  });

  // Career routes
  app.get('/api/careers', async (req, res) => {
    try {
      const careers = await storage.getCareers();
      res.json(careers);
    } catch (error) {
      console.error("Error fetching careers:", error);
      res.status(500).json({ message: "Failed to fetch careers" });
    }
  });

  app.get('/api/careers/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const careers = await storage.getUserCareers(userId);
      res.json(careers);
    } catch (error) {
      console.error("Error fetching user careers:", error);
      res.status(500).json({ message: "Failed to fetch user careers" });
    }
  });

  app.patch('/api/careers/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const career = await storage.updateUserCareer(id, req.body);
      res.json(career);
    } catch (error) {
      console.error("Error updating career:", error);
      res.status(500).json({ message: "Failed to update career" });
    }
  });

  // Player Skills routes
  app.get('/api/skills', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const skills = await storage.getPlayerSkills(userId);
      res.json(skills);
    } catch (error) {
      console.error("Error fetching player skills:", error);
      res.status(500).json({ message: "Failed to fetch player skills" });
    }
  });

  app.post('/api/skills/experience', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { skillType, experience } = req.body;
      const skill = await storage.updatePlayerSkill(userId, skillType, experience);
      res.json(skill);
    } catch (error) {
      console.error("Error updating skill experience:", error);
      res.status(500).json({ message: "Failed to update skill experience" });
    }
  });

  // Breeding Lab routes
  app.get('/api/breeding-lab', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lab = await storage.getBreedingLab(userId);
      res.json(lab);
    } catch (error) {
      console.error("Error fetching breeding lab:", error);
      res.status(500).json({ message: "Failed to fetch breeding lab" });
    }
  });

  app.patch('/api/breeding-lab', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lab = await storage.updateBreedingLab(userId, req.body);
      res.json(lab);
    } catch (error) {
      console.error("Error updating breeding lab:", error);
      res.status(500).json({ message: "Failed to update breeding lab" });
    }
  });

  // Genetic Testing routes
  app.get('/api/genetics/tests/:animalId', isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.animalId);
      const tests = await storage.getGeneticTests(animalId);
      res.json(tests);
    } catch (error) {
      console.error("Error fetching genetic tests:", error);
      res.status(500).json({ message: "Failed to fetch genetic tests" });
    }
  });

  app.post('/api/genetics/tests', isAuthenticated, async (req: any, res) => {
    try {
      const testData = {
        ...req.body,
        requestedAt: new Date(),
      };
      const test = await storage.createGeneticTest(testData);
      res.status(201).json(test);
    } catch (error) {
      console.error("Error creating genetic test:", error);
      res.status(500).json({ message: "Failed to create genetic test" });
    }
  });

  app.patch('/api/genetics/tests/:id/complete', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const { results } = req.body;
      const test = await storage.completeGeneticTest(id, results);
      res.json(test);
    } catch (error) {
      console.error("Error completing genetic test:", error);
      res.status(500).json({ message: "Failed to complete genetic test" });
    }
  });

  // Medical Procedures routes
  app.get('/api/medical/:animalId', isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.animalId);
      const procedures = await storage.getMedicalProcedures(animalId);
      res.json(procedures);
    } catch (error) {
      console.error("Error fetching medical procedures:", error);
      res.status(500).json({ message: "Failed to fetch medical procedures" });
    }
  });

  app.post('/api/medical', isAuthenticated, async (req: any, res) => {
    try {
      const procedureData = {
        ...req.body,
        scheduledAt: req.body.scheduledAt || new Date(),
      };
      const procedure = await storage.createMedicalProcedure(procedureData);
      res.status(201).json(procedure);
    } catch (error) {
      console.error("Error creating medical procedure:", error);
      res.status(500).json({ message: "Failed to create medical procedure" });
    }
  });

  app.patch('/api/medical/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const procedure = await storage.updateMedicalProcedure(id, req.body);
      res.json(procedure);
    } catch (error) {
      console.error("Error updating medical procedure:", error);
      res.status(500).json({ message: "Failed to update medical procedure" });
    }
  });

  // Crafting routes
  app.get('/api/crafting/recipes', async (req, res) => {
    try {
      const recipes = await storage.getCraftingRecipes();
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching crafting recipes:", error);
      res.status(500).json({ message: "Failed to fetch crafting recipes" });
    }
  });

  app.get('/api/crafting/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const crafting = await storage.getUserCrafting(userId);
      res.json(crafting);
    } catch (error) {
      console.error("Error fetching user crafting:", error);
      res.status(500).json({ message: "Failed to fetch user crafting" });
    }
  });

  app.post('/api/crafting/start', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { recipeId } = req.body;
      const crafting = await storage.startCrafting({ 
        userId, 
        recipeId, 
        startedAt: new Date() 
      });
      res.status(201).json(crafting);
    } catch (error) {
      console.error("Error starting crafting:", error);
      res.status(500).json({ message: "Failed to start crafting" });
    }
  });

  app.patch('/api/crafting/:id/complete', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const crafting = await storage.completeCrafting(id);
      res.json(crafting);
    } catch (error) {
      console.error("Error completing crafting:", error);
      res.status(500).json({ message: "Failed to complete crafting" });
    }
  });

  // Inventory routes
  app.get('/api/inventory/resources', async (req, res) => {
    try {
      const resources = await storage.getResources();
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get('/api/inventory/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const inventory = await storage.getUserInventory(userId);
      res.json(inventory);
    } catch (error) {
      console.error("Error fetching user inventory:", error);
      res.status(500).json({ message: "Failed to fetch user inventory" });
    }
  });

  app.post('/api/inventory/update', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { resourceId, quantity } = req.body;
      const inventory = await storage.updateUserInventory(userId, resourceId, quantity);
      res.json(inventory);
    } catch (error) {
      console.error("Error updating inventory:", error);
      res.status(500).json({ message: "Failed to update inventory" });
    }
  });

  // Seasonal Events routes
  app.get('/api/events/seasonal', async (req, res) => {
    try {
      const events = await storage.getActiveSeasonalEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching seasonal events:", error);
      res.status(500).json({ message: "Failed to fetch seasonal events" });
    }
  });

  app.post('/api/events/seasonal', isAuthenticated, async (req: any, res) => {
    try {
      const event = await storage.createSeasonalEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating seasonal event:", error);
      res.status(500).json({ message: "Failed to create seasonal event" });
    }
  });

  // Facility Layout routes
  app.get('/api/facilities/:id/layout', isAuthenticated, async (req: any, res) => {
    try {
      const facilityId = parseInt(req.params.id);
      const layout = await storage.getFacilityLayout(facilityId);
      res.json(layout);
    } catch (error) {
      console.error("Error fetching facility layout:", error);
      res.status(500).json({ message: "Failed to fetch facility layout" });
    }
  });

  app.patch('/api/facilities/:id/layout', isAuthenticated, async (req: any, res) => {
    try {
      const facilityId = parseInt(req.params.id);
      const { layoutData } = req.body;
      const layout = await storage.updateFacilityLayout(facilityId, layoutData);
      res.json(layout);
    } catch (error) {
      console.error("Error updating facility layout:", error);
      res.status(500).json({ message: "Failed to update facility layout" });
    }
  });

  // Tournament routes
  app.get('/api/tournaments', async (req, res) => {
    try {
      const tournaments = await storage.getTournaments();
      res.json(tournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ message: "Failed to fetch tournaments" });
    }
  });

  app.post('/api/tournaments', isAuthenticated, async (req: any, res) => {
    try {
      const tournament = await storage.createTournament(req.body);
      res.status(201).json(tournament);
    } catch (error) {
      console.error("Error creating tournament:", error);
      res.status(500).json({ message: "Failed to create tournament" });
    }
  });

  app.patch('/api/tournaments/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const tournament = await storage.updateTournament(id, req.body);
      res.json(tournament);
    } catch (error) {
      console.error("Error updating tournament:", error);
      res.status(500).json({ message: "Failed to update tournament" });
    }
  });

  // Community Design Sharing routes
  app.get('/api/community/designs', async (req, res) => {
    try {
      const category = req.query.category as string;
      const designs = await storage.getDesignShares(category);
      res.json(designs);
    } catch (error) {
      console.error("Error fetching design shares:", error);
      res.status(500).json({ message: "Failed to fetch design shares" });
    }
  });

  app.post('/api/community/designs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const designData = {
        ...req.body,
        creatorId: userId,
      };
      const design = await storage.createDesignShare(designData);
      res.status(201).json(design);
    } catch (error) {
      console.error("Error creating design share:", error);
      res.status(500).json({ message: "Failed to create design share" });
    }
  });

  app.patch('/api/community/designs/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const design = await storage.updateDesignShare(id, req.body);
      res.json(design);
    } catch (error) {
      console.error("Error updating design share:", error);
      res.status(500).json({ message: "Failed to update design share" });
    }
  });

  // Reputation routes
  app.get('/api/reputation/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const reputation = await storage.getReputationHistory(userId);
      res.json(reputation);
    } catch (error) {
      console.error("Error fetching reputation:", error);
      res.status(500).json({ message: "Failed to fetch reputation" });
    }
  });

  app.post('/api/reputation/add', isAuthenticated, async (req: any, res) => {
    try {
      const fromUserId = req.user.claims.sub;
      const { userId, category, points, reason } = req.body;
      const reputation = await storage.addReputationPoint(userId, fromUserId, category, points, reason);
      res.status(201).json(reputation);
    } catch (error) {
      console.error("Error adding reputation point:", error);
      res.status(500).json({ message: "Failed to add reputation point" });
    }
  });

  // Insurance routes
  app.get('/api/insurance', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const policies = await storage.getInsurancePolicies(userId);
      res.json(policies);
    } catch (error) {
      console.error("Error fetching insurance policies:", error);
      res.status(500).json({ message: "Failed to fetch insurance policies" });
    }
  });

  app.post('/api/insurance', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const policyData = insertInsurancePolicySchema.parse({
        ...req.body,
        userId,
      });
      const policy = await storage.createInsurancePolicy(policyData);
      res.status(201).json(policy);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid insurance policy data", errors: error.errors });
      }
      console.error("Error creating insurance policy:", error);
      res.status(500).json({ message: "Failed to create insurance policy" });
    }
  });

  app.patch('/api/insurance/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const policy = await storage.updateInsurancePolicy(id, req.body);
      res.json(policy);
    } catch (error) {
      console.error("Error updating insurance policy:", error);
      res.status(500).json({ message: "Failed to update insurance policy" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
