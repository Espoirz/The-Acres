import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import session from "express-session";
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
  type AnimalType,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware - only in production
  if (process.env.NODE_ENV === "production") {
    await setupAuth(app);
  } else {
    // Development mode - mock authentication
    app.use(
      session({
        secret: "dev-secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
      }),
    );

    // Mock authenticated user for development
    app.use("/api", (req: any, res, next) => {
      req.user = {
        claims: {
          sub: "dev-user-1",
          name: "Alex Trainer",
          email: "alex@victoryacres.dev",
        },
      };
      next();
    });
  }

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;

      // Development mode - return mock user data
      if (process.env.NODE_ENV === "development") {
        res.json({
          id: userId,
          name: req.user.claims.name,
          email: req.user.claims.email,
          level: 15,
          experience: 2450,
          coins: 15000,
          createdAt: new Date().toISOString(),
        });
        return;
      }

      // Production mode - fetch from database
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Animal routes
  app.get("/api/animals", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const animals = await storage.getAnimalsByOwner(userId);
      res.json(animals);
    } catch (error) {
      console.error("Error fetching animals:", error);
      res.status(500).json({ message: "Failed to fetch animals" });
    }
  });

  app.get("/api/animals/:id", isAuthenticated, async (req: any, res) => {
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

  app.post("/api/animals", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid animal data", errors: error.errors });
      }
      console.error("Error creating animal:", error);
      res.status(500).json({ message: "Failed to create animal" });
    }
  });

  app.patch("/api/animals/:id", isAuthenticated, async (req: any, res) => {
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

  app.delete("/api/animals/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/breeding", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const breedings = await storage.getBreedingsByOwner(userId);
      res.json(breedings);
    } catch (error) {
      console.error("Error fetching breedings:", error);
      res.status(500).json({ message: "Failed to fetch breedings" });
    }
  });

  app.post("/api/breeding", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const breedingData = insertBreedingSchema.parse(req.body);

      // Verify user owns both animals
      const mother = await storage.getAnimal(breedingData.motherId);
      const father = await storage.getAnimal(breedingData.fatherId);

      if (!mother || !father) {
        return res
          .status(404)
          .json({ message: "One or both animals not found" });
      }

      if (mother.ownerId !== userId || father.ownerId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const breeding = await storage.createBreeding(breedingData);
      res.status(201).json(breeding);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid breeding data", errors: error.errors });
      }
      console.error("Error creating breeding:", error);
      res.status(500).json({ message: "Failed to create breeding" });
    }
  });

  // Training routes
  app.get("/api/training/active", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const activeSessions = await storage.getActiveTrainingsByOwner(userId);
      res.json(activeSessions);
    } catch (error) {
      console.error("Error fetching active training:", error);
      res.status(500).json({ message: "Failed to fetch active training" });
    }
  });

  app.post("/api/training", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid training data", errors: error.errors });
      }
      console.error("Error creating training session:", error);
      res.status(500).json({ message: "Failed to create training session" });
    }
  });

  // Marketplace routes
  app.get("/api/marketplace", async (req, res) => {
    try {
      const filters = {
        animalType: req.query.animalType as string,
        breed: req.query.breed as string,
        minPrice: req.query.minPrice
          ? parseInt(req.query.minPrice as string)
          : undefined,
        maxPrice: req.query.maxPrice
          ? parseInt(req.query.maxPrice as string)
          : undefined,
        sortBy: req.query.sortBy as string,
      };

      const listings = await storage.getMarketplaceListings(filters);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching marketplace listings:", error);
      res.status(500).json({ message: "Failed to fetch marketplace listings" });
    }
  });

  app.post("/api/marketplace", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid listing data", errors: error.errors });
      }
      console.error("Error creating marketplace listing:", error);
      res.status(500).json({ message: "Failed to create marketplace listing" });
    }
  });

  // Facilities routes
  app.get("/api/facilities", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const facilities = await storage.getFacilitiesByOwner(userId);
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.post("/api/facilities", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid facility data", errors: error.errors });
      }
      console.error("Error creating facility:", error);
      res.status(500).json({ message: "Failed to create facility" });
    }
  });

  // Competition routes
  app.get("/api/competitions", async (req, res) => {
    try {
      const competitions = await storage.getActiveCompetitions();
      res.json(competitions);
    } catch (error) {
      console.error("Error fetching competitions:", error);
      res.status(500).json({ message: "Failed to fetch competitions" });
    }
  });

  app.post(
    "/api/competitions/:id/entries",
    isAuthenticated,
    async (req: any, res) => {
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
          return res
            .status(400)
            .json({ message: "Invalid entry data", errors: error.errors });
        }
        console.error("Error creating competition entry:", error);
        res.status(500).json({ message: "Failed to create competition entry" });
      }
    },
  );

  // Stats routes
  app.get("/api/stats", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/care/:animalId", isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.animalId);
      const care = await storage.getDailyCareByAnimal(animalId);
      res.json(care);
    } catch (error) {
      console.error("Error fetching daily care:", error);
      res.status(500).json({ message: "Failed to fetch daily care" });
    }
  });

  app.post("/api/care", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid care data", errors: error.errors });
      }
      console.error("Error creating daily care:", error);
      res.status(500).json({ message: "Failed to create daily care" });
    }
  });

  app.get("/api/care/owner/:date?", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/vet/:animalId", isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.animalId);
      const records = await storage.getVetRecordsByAnimal(animalId);
      res.json(records);
    } catch (error) {
      console.error("Error fetching vet records:", error);
      res.status(500).json({ message: "Failed to fetch vet records" });
    }
  });

  app.post("/api/vet", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid vet record data", errors: error.errors });
      }
      console.error("Error creating vet record:", error);
      res.status(500).json({ message: "Failed to create vet record" });
    }
  });

  app.patch("/api/vet/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get("/api/achievements/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching user achievements:", error);
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });

  app.post(
    "/api/achievements/progress",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const { achievementId, progress } = req.body;
        const achievement = await storage.updateUserAchievement(
          userId,
          achievementId,
          progress,
        );
        res.json(achievement);
      } catch (error) {
        console.error("Error updating achievement progress:", error);
        res
          .status(500)
          .json({ message: "Failed to update achievement progress" });
      }
    },
  );

  // Quest routes
  app.get("/api/quests", async (req, res) => {
    try {
      const quests = await storage.getActiveQuests();
      res.json(quests);
    } catch (error) {
      console.error("Error fetching quests:", error);
      res.status(500).json({ message: "Failed to fetch quests" });
    }
  });

  app.get("/api/quests/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const quests = await storage.getUserQuests(userId);
      res.json(quests);
    } catch (error) {
      console.error("Error fetching user quests:", error);
      res.status(500).json({ message: "Failed to fetch user quests" });
    }
  });

  app.post("/api/quests/accept", isAuthenticated, async (req: any, res) => {
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

  app.patch("/api/quests/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/friends", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const friends = await storage.getFriendships(userId);
      res.json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ message: "Failed to fetch friends" });
    }
  });

  app.post("/api/friends/request", isAuthenticated, async (req: any, res) => {
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

  app.patch("/api/friends/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/guilds", async (req, res) => {
    try {
      const guilds = await storage.getGuilds();
      res.json(guilds);
    } catch (error) {
      console.error("Error fetching guilds:", error);
      res.status(500).json({ message: "Failed to fetch guilds" });
    }
  });

  app.get("/api/guilds/:id", async (req, res) => {
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

  app.post("/api/guilds", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid guild data", errors: error.errors });
      }
      console.error("Error creating guild:", error);
      res.status(500).json({ message: "Failed to create guild" });
    }
  });

  app.post("/api/guilds/:id/join", isAuthenticated, async (req: any, res) => {
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

  app.get("/api/guilds/:id/members", async (req, res) => {
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
  app.get("/api/equipment", async (req, res) => {
    try {
      const equipment = await storage.getEquipment();
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      res.status(500).json({ message: "Failed to fetch equipment" });
    }
  });

  app.get("/api/equipment/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const equipment = await storage.getUserEquipment(userId);
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching user equipment:", error);
      res.status(500).json({ message: "Failed to fetch user equipment" });
    }
  });

  app.post(
    "/api/equipment/purchase",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const { equipmentId, quantity } = req.body;
        const userEquipment = await storage.createUserEquipment({
          userId,
          equipmentId,
          quantity,
        });
        res.status(201).json(userEquipment);
      } catch (error) {
        console.error("Error purchasing equipment:", error);
        res.status(500).json({ message: "Failed to purchase equipment" });
      }
    },
  );

  app.patch("/api/equipment/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/auctions", async (req, res) => {
    try {
      const auctions = await storage.getActiveAuctions();
      res.json(auctions);
    } catch (error) {
      console.error("Error fetching auctions:", error);
      res.status(500).json({ message: "Failed to fetch auctions" });
    }
  });

  app.post("/api/auctions", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid auction data", errors: error.errors });
      }
      console.error("Error creating auction:", error);
      res.status(500).json({ message: "Failed to create auction" });
    }
  });

  app.post("/api/auctions/:id/bid", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const auctionId = parseInt(req.params.id);
      const { bidAmount } = req.body;
      const bid = await storage.createAuctionBid({
        auctionId,
        bidderId: userId,
        bidAmount,
      });
      res.status(201).json(bid);
    } catch (error) {
      console.error("Error placing bid:", error);
      res.status(500).json({ message: "Failed to place bid" });
    }
  });

  app.get("/api/auctions/:id/bids", async (req, res) => {
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
  app.get("/api/staff", async (req, res) => {
    try {
      const staff = await storage.getAvailableStaff();
      res.json(staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
      res.status(500).json({ message: "Failed to fetch staff" });
    }
  });

  app.get("/api/staff/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const staff = await storage.getUserStaff(userId);
      res.json(staff);
    } catch (error) {
      console.error("Error fetching user staff:", error);
      res.status(500).json({ message: "Failed to fetch user staff" });
    }
  });

  app.post("/api/staff/hire", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { staffId, facilityId, contractLength } = req.body;
      const userStaff = await storage.hireStaff({
        userId,
        staffId,
        facilityId,
        contractLength,
        contractExpires: new Date(
          Date.now() + contractLength * 24 * 60 * 60 * 1000,
        ),
      });
      res.status(201).json(userStaff);
    } catch (error) {
      console.error("Error hiring staff:", error);
      res.status(500).json({ message: "Failed to hire staff" });
    }
  });

  app.patch("/api/staff/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/notifications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications", isAuthenticated, async (req: any, res) => {
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
        return res
          .status(400)
          .json({ message: "Invalid notification data", errors: error.errors });
      }
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  app.patch(
    "/api/notifications/:id/read",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const id = parseInt(req.params.id);
        const notification = await storage.markNotificationRead(id);
        res.json(notification);
      } catch (error) {
        console.error("Error marking notification read:", error);
        res.status(500).json({ message: "Failed to mark notification read" });
      }
    },
  );

  // Research routes
  app.get("/api/research", async (req, res) => {
    try {
      const research = await storage.getAvailableResearch();
      res.json(research);
    } catch (error) {
      console.error("Error fetching research:", error);
      res.status(500).json({ message: "Failed to fetch research" });
    }
  });

  app.get("/api/research/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const research = await storage.getUserResearch(userId);
      res.json(research);
    } catch (error) {
      console.error("Error fetching user research:", error);
      res.status(500).json({ message: "Failed to fetch user research" });
    }
  });

  app.post("/api/research/start", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { researchId } = req.body;
      const userResearch = await storage.startResearch({
        userId,
        researchId,
        startedAt: new Date(),
      });
      res.status(201).json(userResearch);
    } catch (error) {
      console.error("Error starting research:", error);
      res.status(500).json({ message: "Failed to start research" });
    }
  });

  app.patch(
    "/api/research/:id/complete",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const id = parseInt(req.params.id);
        const research = await storage.completeResearch(id);
        res.json(research);
      } catch (error) {
        console.error("Error completing research:", error);
        res.status(500).json({ message: "Failed to complete research" });
      }
    },
  );

  // Weather routes
  app.get("/api/weather", async (req, res) => {
    try {
      const weather = await storage.getCurrentWeather();
      res.json(weather);
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(500).json({ message: "Failed to fetch weather" });
    }
  });

  app.get("/api/weather/history", async (req, res) => {
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
  app.get("/api/wilderness/biomes", async (req, res) => {
    try {
      const biomes = await storage.getBiomes();
      res.json(biomes);
    } catch (error) {
      console.error("Error fetching biomes:", error);
      res.status(500).json({ message: "Failed to fetch biomes" });
    }
  });

  app.get(
    "/api/wilderness/captures",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const captures = await storage.getWildCaptures(userId);
        res.json(captures);
      } catch (error) {
        console.error("Error fetching wild captures:", error);
        res.status(500).json({ message: "Failed to fetch wild captures" });
      }
    },
  );

  app.post(
    "/api/wilderness/capture",
    isAuthenticated,
    async (req: any, res) => {
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
    },
  );

  app.patch(
    "/api/wilderness/captures/:id",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const id = parseInt(req.params.id);
        const capture = await storage.updateWildCapture(id, req.body);
        res.json(capture);
      } catch (error) {
        console.error("Error updating wild capture:", error);
        res.status(500).json({ message: "Failed to update wild capture" });
      }
    },
  );

  // Career routes
  app.get("/api/careers", async (req, res) => {
    try {
      const careers = await storage.getCareers();
      res.json(careers);
    } catch (error) {
      console.error("Error fetching careers:", error);
      res.status(500).json({ message: "Failed to fetch careers" });
    }
  });

  app.get("/api/careers/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const careers = await storage.getUserCareers(userId);
      res.json(careers);
    } catch (error) {
      console.error("Error fetching user careers:", error);
      res.status(500).json({ message: "Failed to fetch user careers" });
    }
  });

  app.patch("/api/careers/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/skills", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const skills = await storage.getPlayerSkills(userId);
      res.json(skills);
    } catch (error) {
      console.error("Error fetching player skills:", error);
      res.status(500).json({ message: "Failed to fetch player skills" });
    }
  });

  app.post("/api/skills/experience", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { skillType, experience } = req.body;
      const skill = await storage.updatePlayerSkill(
        userId,
        skillType,
        experience,
      );
      res.json(skill);
    } catch (error) {
      console.error("Error updating skill experience:", error);
      res.status(500).json({ message: "Failed to update skill experience" });
    }
  });

  // Breeding Lab routes
  app.get("/api/breeding-lab", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lab = await storage.getBreedingLab(userId);
      res.json(lab);
    } catch (error) {
      console.error("Error fetching breeding lab:", error);
      res.status(500).json({ message: "Failed to fetch breeding lab" });
    }
  });

  app.patch("/api/breeding-lab", isAuthenticated, async (req: any, res) => {
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
  app.get(
    "/api/genetics/tests/:animalId",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const animalId = parseInt(req.params.animalId);
        const tests = await storage.getGeneticTests(animalId);
        res.json(tests);
      } catch (error) {
        console.error("Error fetching genetic tests:", error);
        res.status(500).json({ message: "Failed to fetch genetic tests" });
      }
    },
  );

  app.post("/api/genetics/tests", isAuthenticated, async (req: any, res) => {
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

  app.patch(
    "/api/genetics/tests/:id/complete",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const id = parseInt(req.params.id);
        const { results } = req.body;
        const test = await storage.completeGeneticTest(id, results);
        res.json(test);
      } catch (error) {
        console.error("Error completing genetic test:", error);
        res.status(500).json({ message: "Failed to complete genetic test" });
      }
    },
  );

  // Medical Procedures routes
  app.get("/api/medical/:animalId", isAuthenticated, async (req: any, res) => {
    try {
      const animalId = parseInt(req.params.animalId);
      const procedures = await storage.getMedicalProcedures(animalId);
      res.json(procedures);
    } catch (error) {
      console.error("Error fetching medical procedures:", error);
      res.status(500).json({ message: "Failed to fetch medical procedures" });
    }
  });

  app.post("/api/medical", isAuthenticated, async (req: any, res) => {
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

  app.patch("/api/medical/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/crafting/recipes", async (req, res) => {
    try {
      const recipes = await storage.getCraftingRecipes();
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching crafting recipes:", error);
      res.status(500).json({ message: "Failed to fetch crafting recipes" });
    }
  });

  app.get("/api/crafting/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const crafting = await storage.getUserCrafting(userId);
      res.json(crafting);
    } catch (error) {
      console.error("Error fetching user crafting:", error);
      res.status(500).json({ message: "Failed to fetch user crafting" });
    }
  });

  app.post("/api/crafting/start", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { recipeId } = req.body;
      const crafting = await storage.startCrafting({
        userId,
        recipeId,
        startedAt: new Date(),
      });
      res.status(201).json(crafting);
    } catch (error) {
      console.error("Error starting crafting:", error);
      res.status(500).json({ message: "Failed to start crafting" });
    }
  });

  app.patch(
    "/api/crafting/:id/complete",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const id = parseInt(req.params.id);
        const crafting = await storage.completeCrafting(id);
        res.json(crafting);
      } catch (error) {
        console.error("Error completing crafting:", error);
        res.status(500).json({ message: "Failed to complete crafting" });
      }
    },
  );

  // Inventory routes
  app.get("/api/inventory/resources", async (req, res) => {
    try {
      const resources = await storage.getResources();
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/inventory/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const inventory = await storage.getUserInventory(userId);
      res.json(inventory);
    } catch (error) {
      console.error("Error fetching user inventory:", error);
      res.status(500).json({ message: "Failed to fetch user inventory" });
    }
  });

  app.post("/api/inventory/update", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { resourceId, quantity } = req.body;
      const inventory = await storage.updateUserInventory(
        userId,
        resourceId,
        quantity,
      );
      res.json(inventory);
    } catch (error) {
      console.error("Error updating inventory:", error);
      res.status(500).json({ message: "Failed to update inventory" });
    }
  });

  // Seasonal Events routes
  app.get("/api/events/seasonal", async (req, res) => {
    try {
      const events = await storage.getActiveSeasonalEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching seasonal events:", error);
      res.status(500).json({ message: "Failed to fetch seasonal events" });
    }
  });

  app.post("/api/events/seasonal", isAuthenticated, async (req: any, res) => {
    try {
      const event = await storage.createSeasonalEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating seasonal event:", error);
      res.status(500).json({ message: "Failed to create seasonal event" });
    }
  });

  // Facility Layout routes
  app.get(
    "/api/facilities/:id/layout",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const facilityId = parseInt(req.params.id);
        const layout = await storage.getFacilityLayout(facilityId);
        res.json(layout);
      } catch (error) {
        console.error("Error fetching facility layout:", error);
        res.status(500).json({ message: "Failed to fetch facility layout" });
      }
    },
  );

  app.patch(
    "/api/facilities/:id/layout",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const facilityId = parseInt(req.params.id);
        const { layoutData } = req.body;
        const layout = await storage.updateFacilityLayout(
          facilityId,
          layoutData,
        );
        res.json(layout);
      } catch (error) {
        console.error("Error updating facility layout:", error);
        res.status(500).json({ message: "Failed to update facility layout" });
      }
    },
  );

  // Tournament routes
  app.get("/api/tournaments", async (req, res) => {
    try {
      const tournaments = await storage.getTournaments();
      res.json(tournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ message: "Failed to fetch tournaments" });
    }
  });

  app.post("/api/tournaments", isAuthenticated, async (req: any, res) => {
    try {
      const tournament = await storage.createTournament(req.body);
      res.status(201).json(tournament);
    } catch (error) {
      console.error("Error creating tournament:", error);
      res.status(500).json({ message: "Failed to create tournament" });
    }
  });

  app.patch("/api/tournaments/:id", isAuthenticated, async (req: any, res) => {
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
  app.get("/api/community/designs", async (req, res) => {
    try {
      const category = req.query.category as string;
      const designs = await storage.getDesignShares(category);
      res.json(designs);
    } catch (error) {
      console.error("Error fetching design shares:", error);
      res.status(500).json({ message: "Failed to fetch design shares" });
    }
  });

  app.post("/api/community/designs", isAuthenticated, async (req: any, res) => {
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

  app.patch(
    "/api/community/designs/:id",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const id = parseInt(req.params.id);
        const design = await storage.updateDesignShare(id, req.body);
        res.json(design);
      } catch (error) {
        console.error("Error updating design share:", error);
        res.status(500).json({ message: "Failed to update design share" });
      }
    },
  );

  // Reputation routes
  app.get("/api/reputation/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const reputation = await storage.getReputationHistory(userId);
      res.json(reputation);
    } catch (error) {
      console.error("Error fetching reputation:", error);
      res.status(500).json({ message: "Failed to fetch reputation" });
    }
  });

  app.post("/api/reputation/add", isAuthenticated, async (req: any, res) => {
    try {
      const fromUserId = req.user.claims.sub;
      const { userId, category, points, reason } = req.body;
      const reputation = await storage.addReputationPoint(
        userId,
        fromUserId,
        category,
        points,
        reason,
      );
      res.status(201).json(reputation);
    } catch (error) {
      console.error("Error adding reputation point:", error);
      res.status(500).json({ message: "Failed to add reputation point" });
    }
  });

  // Insurance routes
  app.get("/api/insurance", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const policies = await storage.getInsurancePolicies(userId);
      res.json(policies);
    } catch (error) {
      console.error("Error fetching insurance policies:", error);
      res.status(500).json({ message: "Failed to fetch insurance policies" });
    }
  });

  app.post("/api/insurance", isAuthenticated, async (req: any, res) => {
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
        return res.status(400).json({
          message: "Invalid insurance policy data",
          errors: error.errors,
        });
      }
      console.error("Error creating insurance policy:", error);
      res.status(500).json({ message: "Failed to create insurance policy" });
    }
  });

  app.patch("/api/insurance/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const policy = await storage.updateInsurancePolicy(id, req.body);
      res.json(policy);
    } catch (error) {
      console.error("Error updating insurance policy:", error);
      res.status(500).json({ message: "Failed to update insurance policy" });
    }
  });

  // Advanced Genetics & Breeding System routes
  app.post(
    "/api/genetics/breeding-analysis",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const { motherAnimalId, fatherAnimalId } = req.body;
        const userId = req.user.claims.sub;

        const mother = await storage.getAnimal(motherAnimalId);
        const father = await storage.getAnimal(fatherAnimalId);

        if (!mother || !father) {
          return res.status(404).json({ message: "Animals not found" });
        }

        // Ensure user has access to at least one animal
        if (mother.ownerId !== userId && father.ownerId !== userId) {
          return res.status(403).json({ message: "Access denied" });
        }

        // Generate genetic strings if missing
        if (!mother.geneticString) {
          const { AdvancedGeneticsEngine } = await import("./advancedGenetics");
          mother.geneticString = AdvancedGeneticsEngine.generateGeneticString(
            mother.type === "horse" ? "horse" : "dog",
          );
          await storage.updateAnimal(mother.id, {
            geneticString: mother.geneticString,
          });
        }

        if (!father.geneticString) {
          const { AdvancedGeneticsEngine } = await import("./advancedGenetics");
          father.geneticString = AdvancedGeneticsEngine.generateGeneticString(
            father.type === "horse" ? "horse" : "dog",
          );
          await storage.updateAnimal(father.id, {
            geneticString: father.geneticString,
          });
        }

        const { AdvancedGeneticsEngine } = await import("./advancedGenetics");
        const analysis = AdvancedGeneticsEngine.calculateBreedingCompatibility(
          mother,
          father,
        );

        res.json(analysis);
      } catch (error) {
        console.error("Error analyzing breeding compatibility:", error);
        res
          .status(500)
          .json({ message: "Failed to analyze breeding compatibility" });
      }
    },
  );

  app.post(
    "/api/genetics/color-prediction",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const { motherAnimalId, fatherAnimalId } = req.body;
        const userId = req.user.claims.sub;

        const mother = await storage.getAnimal(motherAnimalId);
        const father = await storage.getAnimal(fatherAnimalId);

        if (!mother || !father) {
          return res.status(404).json({ message: "Animals not found" });
        }

        if (mother.ownerId !== userId && father.ownerId !== userId) {
          return res.status(403).json({ message: "Access denied" });
        }

        const { AdvancedGeneticsEngine } = await import("./advancedGenetics");

        // Generate genetic strings if missing
        if (!mother.geneticString) {
          mother.geneticString = AdvancedGeneticsEngine.generateGeneticString(
            mother.type === "horse" ? "horse" : "dog",
          );
        }

        if (!father.geneticString) {
          father.geneticString = AdvancedGeneticsEngine.generateGeneticString(
            father.type === "horse" ? "horse" : "dog",
          );
        }

        const colorPredictions = AdvancedGeneticsEngine.predictOffspringColors(
          mother,
          father,
        );
        res.json(colorPredictions);
      } catch (error) {
        console.error("Error predicting colors:", error);
        res.status(500).json({ message: "Failed to predict offspring colors" });
      }
    },
  );

  app.get(
    "/api/genetics/animal/:id",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const animalId = parseInt(req.params.id);
        const animal = await storage.getAnimal(animalId);

        if (!animal) {
          return res.status(404).json({ message: "Animal not found" });
        }

        // Generate genetic string if missing
        if (!animal.geneticString) {
          const { AdvancedGeneticsEngine } = await import("./advancedGenetics");
          animal.geneticString = AdvancedGeneticsEngine.generateGeneticString(
            animal.type === "horse" ? "horse" : "dog",
          );
          await storage.updateAnimal(animal.id, {
            geneticString: animal.geneticString,
          });
        }

        const { AdvancedGeneticsEngine } = await import("./advancedGenetics");
        const colorInfo = AdvancedGeneticsEngine.calculateCoatColor(
          animal.geneticString,
          animal.type === "horse" ? "horse" : "dog",
        );

        res.json({
          animal: animal,
          genetic_string: animal.geneticString,
          color_info: colorInfo,
          genetic_tests: await storage.getGeneticTests(animalId),
        });
      } catch (error) {
        console.error("Error fetching genetic data:", error);
        res.status(500).json({ message: "Failed to fetch genetic data" });
      }
    },
  );

  app.post("/api/genetics/test", isAuthenticated, async (req: any, res) => {
    try {
      const { animalId, testPanel } = req.body;
      const userId = req.user.claims.sub;

      const animal = await storage.getAnimal(animalId);
      if (!animal || animal.ownerId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const testPanels: any = {
        horse_health: {
          name: "Horse Health Panel",
          cost: 150,
          tests: ["HERDA", "SCID", "PSSM1", "HYPP"],
        },
        horse_color: {
          name: "Horse Color Panel",
          cost: 120,
          tests: ["EXTENSION", "AGOUTI", "CREAM", "DUN"],
        },
        dog_health: {
          name: "Dog Health Panel",
          cost: 180,
          tests: ["HIP_DYSPLASIA", "PRA", "MDR1", "EIC"],
        },
        dog_color: {
          name: "Dog Color Panel",
          cost: 100,
          tests: ["DOG_EXTENSION", "DOG_K_LOCUS", "DOG_MERLE"],
        },
      };

      const panel = testPanels[testPanel];
      if (!panel) {
        return res.status(400).json({ message: "Invalid test panel" });
      }

      const testData = {
        animalId,
        testType: "DNA",
        results: {},
        cost: panel.cost,
        requestedAt: new Date(),
        isCompleted: false,
      };

      const test = await storage.createGeneticTest(testData);

      // Simulate test completion (in real app, this would be delayed)
      setTimeout(async () => {
        try {
          const { AdvancedGeneticsEngine, GENETIC_CONDITIONS } = await import(
            "./advancedGenetics"
          );

          if (!animal.geneticString) {
            animal.geneticString = AdvancedGeneticsEngine.generateGeneticString(
              animal.type === "horse" ? "horse" : "dog",
            );
            await storage.updateAnimal(animal.id, {
              geneticString: animal.geneticString,
            });
          }

          const results = {
            panel_name: panel.name,
            completed_at: new Date(),
            findings: {} as any,
            summary: {
              total_tests: panel.tests.length,
              normal: 0,
              carriers: 0,
              affected: 0,
              high_risk: 0,
            },
            recommendations: [] as string[],
          };

          // Generate test results for each condition
          panel.tests.forEach((conditionName: string) => {
            const condition = GENETIC_CONDITIONS[conditionName];
            if (condition) {
              const status = AdvancedGeneticsEngine.getGeneticStatus(
                animal,
                condition,
              );
              results.findings[conditionName] = {
                condition: condition.name,
                status: status,
                description: condition.description,
                breeds_affected: condition.breeds || [],
                risk_level:
                  status === "affected"
                    ? "high"
                    : status === "carrier"
                      ? "moderate"
                      : "low",
              };

              // Update summary
              if (status === "normal") results.summary.normal++;
              else if (status === "carrier") results.summary.carriers++;
              else if (status === "affected") {
                results.summary.affected++;
                results.summary.high_risk++;
              }
            }
          });

          // Generate recommendations
          if (results.summary.affected > 0) {
            results.recommendations.push(
              "⚠️ Genetic conditions detected - veterinary consultation recommended",
            );
          }
          if (results.summary.carriers > 0) {
            results.recommendations.push(
              "🧬 Carrier status detected - genetic counseling for breeding",
            );
          }
          if (results.summary.high_risk === 0) {
            results.recommendations.push(
              "✅ No high-risk genetic conditions detected",
            );
          }
          results.recommendations.push(
            "📋 Share results with veterinarian and breeding advisor",
          );

          await storage.completeGeneticTest(test.id, results);

          // Send notification
          await storage.createNotification({
            userId: animal.ownerId,
            type: "genetic_test_complete",
            title: "Genetic Test Complete",
            message: `${panel.name} results are available for ${animal.name}`,
            data: { animalId, testId: test.id },
          });
        } catch (error) {
          console.error("Error completing genetic test:", error);
        }
      }, 2000); // 2 second delay for demo

      res.status(201).json(test);
    } catch (error) {
      console.error("Error creating genetic test:", error);
      res.status(500).json({ message: "Failed to create genetic test" });
    }
  });

  app.get("/api/breeding/services", isAuthenticated, async (req: any, res) => {
    try {
      const { BREEDING_SERVICES } = await import("./advancedGenetics");
      res.json(BREEDING_SERVICES);
    } catch (error) {
      console.error("Error fetching breeding services:", error);
      res.status(500).json({ message: "Failed to fetch breeding services" });
    }
  });

  app.post("/api/breeding/initiate", isAuthenticated, async (req: any, res) => {
    try {
      const { motherAnimalId, fatherAnimalId, serviceType, studFee } = req.body;
      const userId = req.user.claims.sub;

      const mother = await storage.getAnimal(motherAnimalId);
      const father = await storage.getAnimal(fatherAnimalId);

      if (!mother || !father) {
        return res.status(404).json({ message: "Animals not found" });
      }

      if (mother.ownerId !== userId) {
        return res
          .status(403)
          .json({ message: "Access denied - you must own the mother" });
      }

      const { BREEDING_SERVICES, AdvancedGeneticsEngine } = await import(
        "./advancedGenetics"
      );
      const service =
        BREEDING_SERVICES[serviceType as keyof typeof BREEDING_SERVICES];

      if (!service) {
        return res.status(400).json({ message: "Invalid breeding service" });
      }

      // Check if it's dog breeding (premium only)
      if (mother.type === "dog" && !req.user.premium) {
        return res
          .status(403)
          .json({ message: "Dog breeding requires premium membership" });
      }

      // Calculate compatibility
      const compatibility =
        AdvancedGeneticsEngine.calculateBreedingCompatibility(mother, father);

      // Check for lethal combinations
      if (compatibility.health_risks.lethal_combinations.length > 0) {
        return res.status(400).json({
          message: "Breeding not permitted due to lethal genetic combinations",
          risks: compatibility.health_risks.lethal_combinations,
        });
      }

      const breedingData = {
        motherAnimalId,
        fatherAnimalId,
        serviceType,
        cost: service.cost + (studFee || 0),
        expectedDate: new Date(
          Date.now() + service.cooldown_hours * 60 * 60 * 1000,
        ),
        status: "in_progress",
        compatibility: compatibility,
        successRate: service.success_rate,
      };

      const breeding = await storage.createBreeding(breedingData);

      // Schedule breeding completion
      setTimeout(async () => {
        try {
          const success = Math.random() < service.success_rate;

          if (success) {
            // Generate offspring
            const species = mother.type === "horse" ? "horse" : "dog";
            const litterSize =
              species === "dog" ? Math.floor(Math.random() * 6) + 1 : 1;

            for (let i = 0; i < litterSize; i++) {
              const offspringGenetics =
                AdvancedGeneticsEngine.generateGeneticString(
                  species,
                  mother,
                  father,
                );
              const colorInfo = AdvancedGeneticsEngine.calculateCoatColor(
                offspringGenetics,
                species,
              );
              const statPredictions =
                AdvancedGeneticsEngine.predictOffspringStats(mother, father);

              const offspring = {
                name: `${mother.name} x ${father.name} Offspring ${i + 1}`,
                type: mother.type,
                breed: mother.breed,
                gender: Math.random() < 0.5 ? "male" : "female",
                dateOfBirth: new Date(),
                ownerId: mother.ownerId,
                motherId: mother.id,
                fatherId: father.id,
                geneticString: offspringGenetics,
                color: colorInfo.description,
                // Apply predicted stats with some random variation
                strength: Math.max(
                  0,
                  Math.min(
                    100,
                    statPredictions.predicted_stats.strength +
                      (Math.random() - 0.5) * 10,
                  ),
                ),
                speed: Math.max(
                  0,
                  Math.min(
                    100,
                    statPredictions.predicted_stats.speed +
                      (Math.random() - 0.5) * 10,
                  ),
                ),
                agility: Math.max(
                  0,
                  Math.min(
                    100,
                    statPredictions.predicted_stats.agility +
                      (Math.random() - 0.5) * 10,
                  ),
                ),
                endurance: Math.max(
                  0,
                  Math.min(
                    100,
                    statPredictions.predicted_stats.endurance +
                      (Math.random() - 0.5) * 10,
                  ),
                ),
                showAptitude: Math.max(
                  0,
                  Math.min(
                    100,
                    statPredictions.predicted_stats.show_aptitude +
                      (Math.random() - 0.5) * 10,
                  ),
                ),
                health: 100,
                mood: 80,
                energy: 100,
              };

              await storage.createAnimal(offspring);
            }

            await storage.updateBreeding(breeding.id, {
              status: "completed",
              successful: true,
            });

            await storage.createNotification({
              userId: mother.ownerId,
              type: "breeding_success",
              title: "Breeding Successful!",
              message: `${mother.name} has given birth to ${litterSize} healthy ${species === "dog" ? "puppi" + (litterSize === 1 ? "y" : "es") : "foal" + (litterSize === 1 ? "" : "s")}!`,
              data: { breedingId: breeding.id, litterSize },
            });
          } else {
            await storage.updateBreeding(breeding.id, {
              status: "failed",
              successful: false,
            });

            await storage.createNotification({
              userId: mother.ownerId,
              type: "breeding_failed",
              title: "Breeding Unsuccessful",
              message: `The breeding between ${mother.name} and ${father.name} was unsuccessful.`,
              data: { breedingId: breeding.id },
            });
          }
        } catch (error) {
          console.error("Error completing breeding:", error);
        }
      }, 5000); // 5 second delay for demo

      res.status(201).json(breeding);
    } catch (error) {
      console.error("Error initiating breeding:", error);
      res.status(500).json({ message: "Failed to initiate breeding" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
