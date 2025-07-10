import {
  users,
  animals,
  breedings,
  trainingSessions,
  marketplaceListings,
  facilities,
  competitions,
  competitionEntries,
  dailyCare,
  vetRecords,
  achievements,
  userAchievements,
  quests,
  userQuests,
  friendships,
  guilds,
  guildMembers,
  equipment,
  userEquipment,
  auctions,
  auctionBids,
  staff,
  userStaff,
  gameEvents,
  notifications,
  research,
  userResearch,
  insurancePolicies,
  weather,
  biomes,
  wildCaptures,
  careers,
  userCareers,
  playerSkills,
  breedingLab,
  geneticTests,
  medicalProcedures,
  craftingRecipes,
  userCrafting,
  resources,
  userInventory,
  seasonalEvents,
  facilityLayouts,
  tournaments,
  designShares,
  reputationHistory,
  type User,
  type UpsertUser,
  type Animal,
  type InsertAnimal,
  type Breeding,
  type InsertBreeding,
  type TrainingSession,
  type InsertTrainingSession,
  type MarketplaceListing,
  type InsertMarketplaceListing,
  type Facility,
  type InsertFacility,
  type Competition,
  type InsertCompetition,
  type CompetitionEntry,
  type InsertCompetitionEntry,
  type DailyCare,
  type InsertDailyCare,
  type VetRecord,
  type InsertVetRecord,
  type Achievement,
  type UserAchievement,
  type Quest,
  type UserQuest,
  type Friendship,
  type Guild,
  type GuildMember,
  type Equipment,
  type UserEquipment,
  type Auction,
  type AuctionBid,
  type Staff,
  type UserStaff,
  type GameEvent,
  type Notification,
  type Research,
  type UserResearch,
  type InsurancePolicy,
  type Weather,
  type Biome,
  type WildCapture,
  type Career,
  type UserCareer,
  type PlayerSkill,
  type BreedingLab,
  type GeneticTest,
  type MedicalProcedure,
  type CraftingRecipe,
  type UserCrafting,
  type Resource,
  type UserInventory,
  type SeasonalEvent,
  type FacilityLayout,
  type Tournament,
  type DesignShare,
  type ReputationHistory,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, or, gte, lte, count } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Animal operations
  getAnimalsByOwner(ownerId: string): Promise<Animal[]>;
  getAnimal(id: number): Promise<Animal | undefined>;
  createAnimal(animal: InsertAnimal): Promise<Animal>;
  updateAnimal(id: number, updates: Partial<Animal>): Promise<Animal>;
  deleteAnimal(id: number): Promise<void>;
  
  // Breeding operations
  getBreedingsByOwner(ownerId: string): Promise<Breeding[]>;
  createBreeding(breeding: InsertBreeding): Promise<Breeding>;
  updateBreeding(id: number, updates: Partial<Breeding>): Promise<Breeding>;
  getActiveBreedings(): Promise<Breeding[]>;
  
  // Training operations
  getTrainingSessionsByAnimal(animalId: number): Promise<TrainingSession[]>;
  getActiveTrainingsByOwner(ownerId: string): Promise<TrainingSession[]>;
  createTrainingSession(session: InsertTrainingSession): Promise<TrainingSession>;
  updateTrainingSession(id: number, updates: Partial<TrainingSession>): Promise<TrainingSession>;
  
  // Marketplace operations
  getMarketplaceListings(filters?: {
    animalType?: string;
    breed?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }): Promise<MarketplaceListing[]>;
  createMarketplaceListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing>;
  updateMarketplaceListing(id: number, updates: Partial<MarketplaceListing>): Promise<MarketplaceListing>;
  deleteMarketplaceListing(id: number): Promise<void>;
  
  // Facility operations
  getFacilitiesByOwner(ownerId: string): Promise<Facility[]>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  updateFacility(id: number, updates: Partial<Facility>): Promise<Facility>;
  
  // Competition operations
  getActiveCompetitions(): Promise<Competition[]>;
  getCompetitionEntries(competitionId: number): Promise<CompetitionEntry[]>;
  createCompetitionEntry(entry: InsertCompetitionEntry): Promise<CompetitionEntry>;
  
  // Daily Care operations
  getDailyCareByAnimal(animalId: number): Promise<DailyCare[]>;
  createDailyCare(care: InsertDailyCare): Promise<DailyCare>;
  getDailyCareByOwner(ownerId: string, date?: Date): Promise<DailyCare[]>;
  
  // Veterinary operations
  getVetRecordsByAnimal(animalId: number): Promise<VetRecord[]>;
  createVetRecord(record: InsertVetRecord): Promise<VetRecord>;
  updateVetRecord(id: number, updates: Partial<VetRecord>): Promise<VetRecord>;
  
  // Achievement operations
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  updateUserAchievement(userId: string, achievementId: number, progress: number): Promise<UserAchievement>;
  
  // Quest operations
  getActiveQuests(): Promise<Quest[]>;
  getUserQuests(userId: string): Promise<UserQuest[]>;
  createUserQuest(userQuest: any): Promise<UserQuest>;
  updateUserQuest(id: number, updates: Partial<UserQuest>): Promise<UserQuest>;
  
  // Social operations
  getFriendships(userId: string): Promise<Friendship[]>;
  createFriendship(friendship: any): Promise<Friendship>;
  updateFriendship(id: number, status: string): Promise<Friendship>;
  
  // Guild operations
  getGuilds(): Promise<Guild[]>;
  getGuild(id: number): Promise<Guild | undefined>;
  createGuild(guild: any): Promise<Guild>;
  joinGuild(userId: string, guildId: number): Promise<GuildMember>;
  getGuildMembers(guildId: number): Promise<GuildMember[]>;
  
  // Equipment operations
  getEquipment(): Promise<Equipment[]>;
  getUserEquipment(userId: string): Promise<UserEquipment[]>;
  createUserEquipment(userEquipment: any): Promise<UserEquipment>;
  updateUserEquipment(id: number, updates: Partial<UserEquipment>): Promise<UserEquipment>;
  
  // Auction operations
  getActiveAuctions(): Promise<Auction[]>;
  createAuction(auction: any): Promise<Auction>;
  createAuctionBid(bid: any): Promise<AuctionBid>;
  getAuctionBids(auctionId: number): Promise<AuctionBid[]>;
  
  // Staff operations
  getAvailableStaff(): Promise<Staff[]>;
  getUserStaff(userId: string): Promise<UserStaff[]>;
  hireStaff(userStaff: any): Promise<UserStaff>;
  updateUserStaff(id: number, updates: Partial<UserStaff>): Promise<UserStaff>;
  
  // Notification operations
  getNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: any): Promise<Notification>;
  markNotificationRead(id: number): Promise<Notification>;
  
  // Research operations
  getAvailableResearch(): Promise<Research[]>;
  getUserResearch(userId: string): Promise<UserResearch[]>;
  startResearch(userResearch: any): Promise<UserResearch>;
  completeResearch(id: number): Promise<UserResearch>;
  
  // Insurance operations
  getInsurancePolicies(userId: string): Promise<InsurancePolicy[]>;
  createInsurancePolicy(policy: any): Promise<InsurancePolicy>;
  updateInsurancePolicy(id: number, updates: Partial<InsurancePolicy>): Promise<InsurancePolicy>;
  
  // Weather operations
  getCurrentWeather(): Promise<Weather | undefined>;
  getWeatherHistory(days: number): Promise<Weather[]>;
  createWeather(weather: any): Promise<Weather>;
  
  // Wilderness operations
  getBiomes(): Promise<Biome[]>;
  getWildCaptures(userId: string): Promise<WildCapture[]>;
  createWildCapture(capture: any): Promise<WildCapture>;
  updateWildCapture(id: number, updates: Partial<WildCapture>): Promise<WildCapture>;
  
  // Career operations
  getCareers(): Promise<Career[]>;
  getUserCareers(userId: string): Promise<UserCareer[]>;
  updateUserCareer(id: number, updates: Partial<UserCareer>): Promise<UserCareer>;
  
  // Skill operations
  getPlayerSkills(userId: string): Promise<PlayerSkill[]>;
  updatePlayerSkill(userId: string, skillType: string, experience: number): Promise<PlayerSkill>;
  
  // Breeding Lab operations
  getBreedingLab(userId: string): Promise<BreedingLab | undefined>;
  updateBreedingLab(userId: string, updates: Partial<BreedingLab>): Promise<BreedingLab>;
  
  // Genetic Testing operations
  getGeneticTests(animalId: number): Promise<GeneticTest[]>;
  createGeneticTest(test: any): Promise<GeneticTest>;
  completeGeneticTest(id: number, results: any): Promise<GeneticTest>;
  
  // Medical Procedures operations
  getMedicalProcedures(animalId: number): Promise<MedicalProcedure[]>;
  createMedicalProcedure(procedure: any): Promise<MedicalProcedure>;
  updateMedicalProcedure(id: number, updates: Partial<MedicalProcedure>): Promise<MedicalProcedure>;
  
  // Crafting operations
  getCraftingRecipes(): Promise<CraftingRecipe[]>;
  getUserCrafting(userId: string): Promise<UserCrafting[]>;
  startCrafting(userCrafting: any): Promise<UserCrafting>;
  completeCrafting(id: number): Promise<UserCrafting>;
  
  // Inventory operations
  getResources(): Promise<Resource[]>;
  getUserInventory(userId: string): Promise<UserInventory[]>;
  updateUserInventory(userId: string, resourceId: number, quantity: number): Promise<UserInventory>;
  
  // Seasonal operations
  getActiveSeasonalEvents(): Promise<SeasonalEvent[]>;
  createSeasonalEvent(event: any): Promise<SeasonalEvent>;
  
  // Facility Layout operations
  getFacilityLayout(facilityId: number): Promise<FacilityLayout | undefined>;
  updateFacilityLayout(facilityId: number, layoutData: any): Promise<FacilityLayout>;
  
  // Tournament operations
  getTournaments(): Promise<Tournament[]>;
  createTournament(tournament: any): Promise<Tournament>;
  updateTournament(id: number, updates: Partial<Tournament>): Promise<Tournament>;
  
  // Community operations
  getDesignShares(category?: string): Promise<DesignShare[]>;
  createDesignShare(design: any): Promise<DesignShare>;
  updateDesignShare(id: number, updates: Partial<DesignShare>): Promise<DesignShare>;
  
  // Reputation operations
  getReputationHistory(userId: string): Promise<ReputationHistory[]>;
  addReputationPoint(userId: string, fromUserId: string, category: string, points: number, reason: string): Promise<ReputationHistory>;
  
  // Stats operations
  getUserStats(userId: string): Promise<{
    totalAnimals: number;
    totalHorses: number;
    totalDogs: number;
    competitionsWon: number;
    offspringBred: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Animal operations
  async getAnimalsByOwner(ownerId: string): Promise<Animal[]> {
    return await db
      .select()
      .from(animals)
      .where(eq(animals.ownerId, ownerId))
      .orderBy(desc(animals.createdAt));
  }

  async getAnimal(id: number): Promise<Animal | undefined> {
    const [animal] = await db.select().from(animals).where(eq(animals.id, id));
    return animal;
  }

  async createAnimal(animal: InsertAnimal): Promise<Animal> {
    const [newAnimal] = await db.insert(animals).values([animal]).returning();
    return newAnimal;
  }

  async updateAnimal(id: number, updates: Partial<Animal>): Promise<Animal> {
    const [updatedAnimal] = await db
      .update(animals)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(animals.id, id))
      .returning();
    return updatedAnimal;
  }

  async deleteAnimal(id: number): Promise<void> {
    await db.delete(animals).where(eq(animals.id, id));
  }

  // Breeding operations
  async getBreedingsByOwner(ownerId: string): Promise<Breeding[]> {
    const results = await db
      .select({
        id: breedings.id,
        createdAt: breedings.createdAt,
        motherId: breedings.motherId,
        fatherId: breedings.fatherId,
        offspringId: breedings.offspringId,
        breedingDate: breedings.breedingDate,
        expectedDueDate: breedings.expectedDueDate,
        actualBirthDate: breedings.actualBirthDate,
        geneticPredictions: breedings.geneticPredictions,
        isCompleted: breedings.isCompleted,
      })
      .from(breedings)
      .leftJoin(animals, eq(breedings.motherId, animals.id))
      .where(eq(animals.ownerId, ownerId))
      .orderBy(desc(breedings.createdAt));
    return results;
  }

  async createBreeding(breeding: InsertBreeding): Promise<Breeding> {
    const [newBreeding] = await db.insert(breedings).values(breeding).returning();
    return newBreeding;
  }

  async updateBreeding(id: number, updates: Partial<Breeding>): Promise<Breeding> {
    const [updatedBreeding] = await db
      .update(breedings)
      .set(updates)
      .where(eq(breedings.id, id))
      .returning();
    return updatedBreeding;
  }

  async getActiveBreedings(): Promise<Breeding[]> {
    return await db
      .select()
      .from(breedings)
      .where(
        and(
          eq(breedings.isCompleted, false),
          lte(breedings.expectedDueDate, new Date())
        )
      );
  }

  // Training operations
  async getTrainingSessionsByAnimal(animalId: number): Promise<TrainingSession[]> {
    return await db
      .select()
      .from(trainingSessions)
      .where(eq(trainingSessions.animalId, animalId))
      .orderBy(desc(trainingSessions.createdAt));
  }

  async getActiveTrainingsByOwner(ownerId: string): Promise<TrainingSession[]> {
    const results = await db
      .select({
        id: trainingSessions.id,
        animalId: trainingSessions.animalId,
        trainingType: trainingSessions.trainingType,
        cost: trainingSessions.cost,
        duration: trainingSessions.duration,
        startTime: trainingSessions.startTime,
        endTime: trainingSessions.endTime,
        statImprovement: trainingSessions.statImprovement,
        isCompleted: trainingSessions.isCompleted,
        createdAt: trainingSessions.createdAt,
      })
      .from(trainingSessions)
      .leftJoin(animals, eq(trainingSessions.animalId, animals.id))
      .where(
        and(
          eq(animals.ownerId, ownerId),
          eq(trainingSessions.isCompleted, false)
        )
      )
      .orderBy(asc(trainingSessions.endTime));
    return results;
  }

  async createTrainingSession(session: InsertTrainingSession): Promise<TrainingSession> {
    const [newSession] = await db.insert(trainingSessions).values(session).returning();
    return newSession;
  }

  async updateTrainingSession(id: number, updates: Partial<TrainingSession>): Promise<TrainingSession> {
    const [updatedSession] = await db
      .update(trainingSessions)
      .set(updates)
      .where(eq(trainingSessions.id, id))
      .returning();
    return updatedSession;
  }

  // Marketplace operations
  async getMarketplaceListings(filters?: {
    animalType?: string;
    breed?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }): Promise<MarketplaceListing[]> {
    const conditions = [eq(marketplaceListings.isActive, true)];

    if (filters?.animalType) {
      conditions.push(eq(animals.type, filters.animalType as "horse" | "dog"));
    }
    if (filters?.breed) {
      conditions.push(eq(animals.breed, filters.breed));
    }
    if (filters?.minPrice) {
      conditions.push(gte(marketplaceListings.price, filters.minPrice));
    }
    if (filters?.maxPrice) {
      conditions.push(lte(marketplaceListings.price, filters.maxPrice));
    }

    const orderBy = filters?.sortBy === "price_desc" ? desc(marketplaceListings.price) :
                   filters?.sortBy === "price_asc" ? asc(marketplaceListings.price) :
                   desc(marketplaceListings.createdAt);

    const results = await db
      .select({
        id: marketplaceListings.id,
        animalId: marketplaceListings.animalId,
        sellerId: marketplaceListings.sellerId,
        price: marketplaceListings.price,
        description: marketplaceListings.description,
        isActive: marketplaceListings.isActive,
        createdAt: marketplaceListings.createdAt,
        updatedAt: marketplaceListings.updatedAt,
      })
      .from(marketplaceListings)
      .leftJoin(animals, eq(marketplaceListings.animalId, animals.id))
      .leftJoin(users, eq(marketplaceListings.sellerId, users.id))
      .where(and(...conditions))
      .orderBy(orderBy);

    return results;
  }

  async createMarketplaceListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing> {
    const [newListing] = await db.insert(marketplaceListings).values(listing).returning();
    return newListing;
  }

  async updateMarketplaceListing(id: number, updates: Partial<MarketplaceListing>): Promise<MarketplaceListing> {
    const [updatedListing] = await db
      .update(marketplaceListings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(marketplaceListings.id, id))
      .returning();
    return updatedListing;
  }

  async deleteMarketplaceListing(id: number): Promise<void> {
    await db.delete(marketplaceListings).where(eq(marketplaceListings.id, id));
  }

  // Facility operations
  async getFacilitiesByOwner(ownerId: string): Promise<Facility[]> {
    return await db
      .select()
      .from(facilities)
      .where(eq(facilities.ownerId, ownerId))
      .orderBy(desc(facilities.createdAt));
  }

  async createFacility(facility: InsertFacility): Promise<Facility> {
    const [newFacility] = await db.insert(facilities).values(facility).returning();
    return newFacility;
  }

  async updateFacility(id: number, updates: Partial<Facility>): Promise<Facility> {
    const [updatedFacility] = await db
      .update(facilities)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(facilities.id, id))
      .returning();
    return updatedFacility;
  }

  // Competition operations
  async getActiveCompetitions(): Promise<Competition[]> {
    return await db
      .select()
      .from(competitions)
      .where(
        and(
          eq(competitions.isActive, true),
          gte(competitions.endDate, new Date())
        )
      )
      .orderBy(asc(competitions.startDate));
  }

  async getCompetitionEntries(competitionId: number): Promise<CompetitionEntry[]> {
    return await db
      .select()
      .from(competitionEntries)
      .where(eq(competitionEntries.competitionId, competitionId))
      .orderBy(desc(competitionEntries.score));
  }

  async createCompetitionEntry(entry: InsertCompetitionEntry): Promise<CompetitionEntry> {
    const [newEntry] = await db.insert(competitionEntries).values(entry).returning();
    return newEntry;
  }

  // Daily Care operations
  async getDailyCareByAnimal(animalId: number): Promise<DailyCare[]> {
    return await db
      .select()
      .from(dailyCare)
      .where(eq(dailyCare.animalId, animalId))
      .orderBy(desc(dailyCare.completedAt));
  }

  async createDailyCare(care: InsertDailyCare): Promise<DailyCare> {
    const [newCare] = await db.insert(dailyCare).values(care).returning();
    return newCare;
  }

  async getDailyCareByOwner(ownerId: string, date?: Date): Promise<DailyCare[]> {
    const conditions = [eq(dailyCare.ownerId, ownerId)];
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      conditions.push(
        and(
          gte(dailyCare.completedAt, startOfDay),
          lte(dailyCare.completedAt, endOfDay)
        )!
      );
    }
    return await db
      .select()
      .from(dailyCare)
      .where(and(...conditions))
      .orderBy(desc(dailyCare.completedAt));
  }

  // Veterinary operations
  async getVetRecordsByAnimal(animalId: number): Promise<VetRecord[]> {
    return await db
      .select()
      .from(vetRecords)
      .where(eq(vetRecords.animalId, animalId))
      .orderBy(desc(vetRecords.createdAt));
  }

  async createVetRecord(record: InsertVetRecord): Promise<VetRecord> {
    const [newRecord] = await db.insert(vetRecords).values(record).returning();
    return newRecord;
  }

  async updateVetRecord(id: number, updates: Partial<VetRecord>): Promise<VetRecord> {
    const [updatedRecord] = await db
      .update(vetRecords)
      .set(updates)
      .where(eq(vetRecords.id, id))
      .returning();
    return updatedRecord;
  }

  // Achievement operations
  async getAllAchievements(): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.isHidden, false))
      .orderBy(achievements.category, achievements.rarity);
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.completedAt));
  }

  async updateUserAchievement(userId: string, achievementId: number, progress: number): Promise<UserAchievement> {
    const [existing] = await db
      .select()
      .from(userAchievements)
      .where(and(eq(userAchievements.userId, userId), eq(userAchievements.achievementId, achievementId)));

    if (existing) {
      const [updated] = await db
        .update(userAchievements)
        .set({ 
          progress, 
          isCompleted: progress >= existing.maxProgress,
          completedAt: progress >= existing.maxProgress ? new Date() : null 
        })
        .where(eq(userAchievements.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newAchievement] = await db
        .insert(userAchievements)
        .values({ userId, achievementId, progress, maxProgress: 1 })
        .returning();
      return newAchievement;
    }
  }

  // Quest operations
  async getActiveQuests(): Promise<Quest[]> {
    return await db
      .select()
      .from(quests)
      .where(eq(quests.isActive, true))
      .orderBy(quests.category, quests.difficulty);
  }

  async getUserQuests(userId: string): Promise<UserQuest[]> {
    return await db
      .select()
      .from(userQuests)
      .where(eq(userQuests.userId, userId))
      .orderBy(desc(userQuests.createdAt));
  }

  async createUserQuest(userQuest: any): Promise<UserQuest> {
    const [newUserQuest] = await db.insert(userQuests).values(userQuest).returning();
    return newUserQuest;
  }

  async updateUserQuest(id: number, updates: Partial<UserQuest>): Promise<UserQuest> {
    const [updated] = await db
      .update(userQuests)
      .set(updates)
      .where(eq(userQuests.id, id))
      .returning();
    return updated;
  }

  // Social operations
  async getFriendships(userId: string): Promise<Friendship[]> {
    return await db
      .select()
      .from(friendships)
      .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)))
      .orderBy(desc(friendships.createdAt));
  }

  async createFriendship(friendship: any): Promise<Friendship> {
    const [newFriendship] = await db.insert(friendships).values(friendship).returning();
    return newFriendship;
  }

  async updateFriendship(id: number, status: string): Promise<Friendship> {
    const [updated] = await db
      .update(friendships)
      .set({ status, acceptedAt: status === 'accepted' ? new Date() : null })
      .where(eq(friendships.id, id))
      .returning();
    return updated;
  }

  // Guild operations
  async getGuilds(): Promise<Guild[]> {
    return await db
      .select()
      .from(guilds)
      .where(eq(guilds.isPublic, true))
      .orderBy(desc(guilds.level));
  }

  async getGuild(id: number): Promise<Guild | undefined> {
    const [guild] = await db.select().from(guilds).where(eq(guilds.id, id));
    return guild;
  }

  async createGuild(guild: any): Promise<Guild> {
    const [newGuild] = await db.insert(guilds).values(guild).returning();
    return newGuild;
  }

  async joinGuild(userId: string, guildId: number): Promise<GuildMember> {
    const [member] = await db
      .insert(guildMembers)
      .values({ userId, guildId, role: 'member' })
      .returning();
    return member;
  }

  async getGuildMembers(guildId: number): Promise<GuildMember[]> {
    return await db
      .select()
      .from(guildMembers)
      .where(eq(guildMembers.guildId, guildId))
      .orderBy(guildMembers.role, desc(guildMembers.contribution));
  }

  // Equipment operations
  async getEquipment(): Promise<Equipment[]> {
    return await db
      .select()
      .from(equipment)
      .orderBy(equipment.type, equipment.rarity);
  }

  async getUserEquipment(userId: string): Promise<UserEquipment[]> {
    return await db
      .select()
      .from(userEquipment)
      .where(eq(userEquipment.userId, userId))
      .orderBy(desc(userEquipment.purchasedAt));
  }

  async createUserEquipment(userEquipment: any): Promise<UserEquipment> {
    const [newEquipment] = await db.insert(userEquipment).values(userEquipment).returning();
    return newEquipment;
  }

  async updateUserEquipment(id: number, updates: Partial<UserEquipment>): Promise<UserEquipment> {
    const [updated] = await db
      .update(userEquipment)
      .set(updates)
      .where(eq(userEquipment.id, id))
      .returning();
    return updated;
  }

  // Auction operations
  async getActiveAuctions(): Promise<Auction[]> {
    return await db
      .select()
      .from(auctions)
      .where(and(eq(auctions.isActive, true), gte(auctions.endTime, new Date())))
      .orderBy(asc(auctions.endTime));
  }

  async createAuction(auction: any): Promise<Auction> {
    const [newAuction] = await db.insert(auctions).values(auction).returning();
    return newAuction;
  }

  async createAuctionBid(bid: any): Promise<AuctionBid> {
    const [newBid] = await db.insert(auctionBids).values(bid).returning();
    return newBid;
  }

  async getAuctionBids(auctionId: number): Promise<AuctionBid[]> {
    return await db
      .select()
      .from(auctionBids)
      .where(eq(auctionBids.auctionId, auctionId))
      .orderBy(desc(auctionBids.bidAmount));
  }

  // Staff operations
  async getAvailableStaff(): Promise<Staff[]> {
    return await db
      .select()
      .from(staff)
      .where(eq(staff.isAvailable, true))
      .orderBy(desc(staff.skill));
  }

  async getUserStaff(userId: string): Promise<UserStaff[]> {
    return await db
      .select()
      .from(userStaff)
      .where(and(eq(userStaff.userId, userId), eq(userStaff.isActive, true)))
      .orderBy(desc(userStaff.hiredAt));
  }

  async hireStaff(userStaff: any): Promise<UserStaff> {
    const [hired] = await db.insert(userStaff).values(userStaff).returning();
    return hired;
  }

  async updateUserStaff(id: number, updates: Partial<UserStaff>): Promise<UserStaff> {
    const [updated] = await db
      .update(userStaff)
      .set(updates)
      .where(eq(userStaff.id, id))
      .returning();
    return updated;
  }

  // Notification operations
  async getNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: any): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async markNotificationRead(id: number): Promise<Notification> {
    const [updated] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    return updated;
  }

  // Research operations
  async getAvailableResearch(): Promise<Research[]> {
    return await db
      .select()
      .from(research)
      .where(eq(research.isAvailable, true))
      .orderBy(research.category, research.cost);
  }

  async getUserResearch(userId: string): Promise<UserResearch[]> {
    return await db
      .select()
      .from(userResearch)
      .where(eq(userResearch.userId, userId))
      .orderBy(desc(userResearch.startedAt));
  }

  async startResearch(userResearch: any): Promise<UserResearch> {
    const [started] = await db.insert(userResearch).values(userResearch).returning();
    return started;
  }

  async completeResearch(id: number): Promise<UserResearch> {
    const [completed] = await db
      .update(userResearch)
      .set({ isCompleted: true, completedAt: new Date() })
      .where(eq(userResearch.id, id))
      .returning();
    return completed;
  }

  // Insurance operations
  async getInsurancePolicies(userId: string): Promise<InsurancePolicy[]> {
    return await db
      .select()
      .from(insurancePolicies)
      .where(eq(insurancePolicies.userId, userId))
      .orderBy(desc(insurancePolicies.startDate));
  }

  async createInsurancePolicy(policy: any): Promise<InsurancePolicy> {
    const [newPolicy] = await db.insert(insurancePolicies).values(policy).returning();
    return newPolicy;
  }

  async updateInsurancePolicy(id: number, updates: Partial<InsurancePolicy>): Promise<InsurancePolicy> {
    const [updated] = await db
      .update(insurancePolicies)
      .set(updates)
      .where(eq(insurancePolicies.id, id))
      .returning();
    return updated;
  }

  // Weather operations
  async getCurrentWeather(): Promise<Weather | undefined> {
    const [currentWeather] = await db
      .select()
      .from(weather)
      .where(eq(weather.isActive, true))
      .orderBy(desc(weather.date))
      .limit(1);
    return currentWeather;
  }

  async getWeatherHistory(days: number): Promise<Weather[]> {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    return await db
      .select()
      .from(weather)
      .where(gte(weather.date, daysAgo))
      .orderBy(desc(weather.date));
  }

  async createWeather(weather: any): Promise<Weather> {
    const [newWeather] = await db.insert(weather).values(weather).returning();
    return newWeather;
  }

  // Wilderness operations
  async getBiomes(): Promise<Biome[]> {
    return await db
      .select()
      .from(biomes)
      .where(eq(biomes.isActive, true))
      .orderBy(biomes.unlockLevel);
  }

  async getWildCaptures(userId: string): Promise<WildCapture[]> {
    return await db
      .select()
      .from(wildCaptures)
      .where(eq(wildCaptures.userId, userId))
      .orderBy(desc(wildCaptures.captureDate));
  }

  async createWildCapture(capture: any): Promise<WildCapture> {
    const [newCapture] = await db.insert(wildCaptures).values(capture).returning();
    return newCapture;
  }

  async updateWildCapture(id: number, updates: Partial<WildCapture>): Promise<WildCapture> {
    const [updated] = await db
      .update(wildCaptures)
      .set(updates)
      .where(eq(wildCaptures.id, id))
      .returning();
    return updated;
  }

  // Career operations
  async getCareers(): Promise<Career[]> {
    return await db.select().from(careers).orderBy(careers.category);
  }

  async getUserCareers(userId: string): Promise<UserCareer[]> {
    return await db
      .select()
      .from(userCareers)
      .where(eq(userCareers.userId, userId))
      .orderBy(desc(userCareers.experience));
  }

  async updateUserCareer(id: number, updates: Partial<UserCareer>): Promise<UserCareer> {
    const [updated] = await db
      .update(userCareers)
      .set(updates)
      .where(eq(userCareers.id, id))
      .returning();
    return updated;
  }

  // Skill operations
  async getPlayerSkills(userId: string): Promise<PlayerSkill[]> {
    return await db
      .select()
      .from(playerSkills)
      .where(eq(playerSkills.userId, userId))
      .orderBy(desc(playerSkills.level));
  }

  async updatePlayerSkill(userId: string, skillType: string, experience: number): Promise<PlayerSkill> {
    const [existing] = await db
      .select()
      .from(playerSkills)
      .where(and(eq(playerSkills.userId, userId), eq(playerSkills.skillType, skillType)));

    if (existing) {
      const newExp = existing.experience + experience;
      const newLevel = Math.floor(newExp / 1000) + 1; // Simple leveling formula
      const [updated] = await db
        .update(playerSkills)
        .set({ experience: newExp, level: newLevel, updatedAt: new Date() })
        .where(eq(playerSkills.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newSkill] = await db
        .insert(playerSkills)
        .values({ userId, skillType, experience, level: 1 })
        .returning();
      return newSkill;
    }
  }

  // Breeding Lab operations
  async getBreedingLab(userId: string): Promise<BreedingLab | undefined> {
    const [lab] = await db
      .select()
      .from(breedingLab)
      .where(eq(breedingLab.userId, userId));
    return lab;
  }

  async updateBreedingLab(userId: string, updates: Partial<BreedingLab>): Promise<BreedingLab> {
    const [existing] = await db
      .select()
      .from(breedingLab)
      .where(eq(breedingLab.userId, userId));

    if (existing) {
      const [updated] = await db
        .update(breedingLab)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(breedingLab.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newLab] = await db
        .insert(breedingLab)
        .values({ userId, ...updates })
        .returning();
      return newLab;
    }
  }

  // Genetic Testing operations
  async getGeneticTests(animalId: number): Promise<GeneticTest[]> {
    return await db
      .select()
      .from(geneticTests)
      .where(eq(geneticTests.animalId, animalId))
      .orderBy(desc(geneticTests.requestedAt));
  }

  async createGeneticTest(test: any): Promise<GeneticTest> {
    const [newTest] = await db.insert(geneticTests).values(test).returning();
    return newTest;
  }

  async completeGeneticTest(id: number, results: any): Promise<GeneticTest> {
    const [completed] = await db
      .update(geneticTests)
      .set({ results, isCompleted: true, completedAt: new Date() })
      .where(eq(geneticTests.id, id))
      .returning();
    return completed;
  }

  // Medical Procedures operations
  async getMedicalProcedures(animalId: number): Promise<MedicalProcedure[]> {
    return await db
      .select()
      .from(medicalProcedures)
      .where(eq(medicalProcedures.animalId, animalId))
      .orderBy(desc(medicalProcedures.createdAt));
  }

  async createMedicalProcedure(procedure: any): Promise<MedicalProcedure> {
    const [newProcedure] = await db.insert(medicalProcedures).values(procedure).returning();
    return newProcedure;
  }

  async updateMedicalProcedure(id: number, updates: Partial<MedicalProcedure>): Promise<MedicalProcedure> {
    const [updated] = await db
      .update(medicalProcedures)
      .set(updates)
      .where(eq(medicalProcedures.id, id))
      .returning();
    return updated;
  }

  // Crafting operations
  async getCraftingRecipes(): Promise<CraftingRecipe[]> {
    return await db
      .select()
      .from(craftingRecipes)
      .where(eq(craftingRecipes.isHidden, false))
      .orderBy(craftingRecipes.category, craftingRecipes.unlockLevel);
  }

  async getUserCrafting(userId: string): Promise<UserCrafting[]> {
    return await db
      .select()
      .from(userCrafting)
      .where(eq(userCrafting.userId, userId))
      .orderBy(desc(userCrafting.startedAt));
  }

  async startCrafting(userCrafting: any): Promise<UserCrafting> {
    const [started] = await db.insert(userCrafting).values(userCrafting).returning();
    return started;
  }

  async completeCrafting(id: number): Promise<UserCrafting> {
    const [completed] = await db
      .update(userCrafting)
      .set({ isCompleted: true, completedAt: new Date() })
      .where(eq(userCrafting.id, id))
      .returning();
    return completed;
  }

  // Inventory operations
  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources).orderBy(resources.type, resources.rarity);
  }

  async getUserInventory(userId: string): Promise<UserInventory[]> {
    return await db
      .select()
      .from(userInventory)
      .where(eq(userInventory.userId, userId))
      .orderBy(desc(userInventory.acquiredAt));
  }

  async updateUserInventory(userId: string, resourceId: number, quantity: number): Promise<UserInventory> {
    const [existing] = await db
      .select()
      .from(userInventory)
      .where(and(eq(userInventory.userId, userId), eq(userInventory.resourceId, resourceId)));

    if (existing) {
      const [updated] = await db
        .update(userInventory)
        .set({ quantity: existing.quantity + quantity })
        .where(eq(userInventory.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newItem] = await db
        .insert(userInventory)
        .values({ userId, resourceId, quantity })
        .returning();
      return newItem;
    }
  }

  // Seasonal operations
  async getActiveSeasonalEvents(): Promise<SeasonalEvent[]> {
    const now = new Date();
    return await db
      .select()
      .from(seasonalEvents)
      .where(and(
        eq(seasonalEvents.isActive, true),
        lte(seasonalEvents.startDate, now),
        gte(seasonalEvents.endDate, now)
      ))
      .orderBy(seasonalEvents.startDate);
  }

  async createSeasonalEvent(event: any): Promise<SeasonalEvent> {
    const [newEvent] = await db.insert(seasonalEvents).values(event).returning();
    return newEvent;
  }

  // Facility Layout operations
  async getFacilityLayout(facilityId: number): Promise<FacilityLayout | undefined> {
    const [layout] = await db
      .select()
      .from(facilityLayouts)
      .where(eq(facilityLayouts.facilityId, facilityId));
    return layout;
  }

  async updateFacilityLayout(facilityId: number, layoutData: any): Promise<FacilityLayout> {
    const [existing] = await db
      .select()
      .from(facilityLayouts)
      .where(eq(facilityLayouts.facilityId, facilityId));

    if (existing) {
      const [updated] = await db
        .update(facilityLayouts)
        .set({ layoutData, updatedAt: new Date() })
        .where(eq(facilityLayouts.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newLayout] = await db
        .insert(facilityLayouts)
        .values({ facilityId, layoutData })
        .returning();
      return newLayout;
    }
  }

  // Tournament operations
  async getTournaments(): Promise<Tournament[]> {
    return await db
      .select()
      .from(tournaments)
      .orderBy(desc(tournaments.tournamentStart));
  }

  async createTournament(tournament: any): Promise<Tournament> {
    const [newTournament] = await db.insert(tournaments).values(tournament).returning();
    return newTournament;
  }

  async updateTournament(id: number, updates: Partial<Tournament>): Promise<Tournament> {
    const [updated] = await db
      .update(tournaments)
      .set(updates)
      .where(eq(tournaments.id, id))
      .returning();
    return updated;
  }

  // Community operations
  async getDesignShares(category?: string): Promise<DesignShare[]> {
    const conditions = [eq(designShares.isApproved, true)];
    if (category) {
      conditions.push(eq(designShares.category, category));
    }
    return await db
      .select()
      .from(designShares)
      .where(and(...conditions))
      .orderBy(desc(designShares.rating), desc(designShares.downloadCount));
  }

  async createDesignShare(design: any): Promise<DesignShare> {
    const [newDesign] = await db.insert(designShares).values(design).returning();
    return newDesign;
  }

  async updateDesignShare(id: number, updates: Partial<DesignShare>): Promise<DesignShare> {
    const [updated] = await db
      .update(designShares)
      .set(updates)
      .where(eq(designShares.id, id))
      .returning();
    return updated;
  }

  // Reputation operations
  async getReputationHistory(userId: string): Promise<ReputationHistory[]> {
    return await db
      .select()
      .from(reputationHistory)
      .where(eq(reputationHistory.userId, userId))
      .orderBy(desc(reputationHistory.createdAt));
  }

  async addReputationPoint(userId: string, fromUserId: string, category: string, points: number, reason: string): Promise<ReputationHistory> {
    const [newReputation] = await db
      .insert(reputationHistory)
      .values({ userId, fromUserId, category, points, reason })
      .returning();
    return newReputation;
  }

  // Stats operations
  async getUserStats(userId: string): Promise<{
    totalAnimals: number;
    totalHorses: number;
    totalDogs: number;
    competitionsWon: number;
    offspringBred: number;
  }> {
    const [totalAnimalsResult] = await db
      .select({ count: count() })
      .from(animals)
      .where(eq(animals.ownerId, userId));

    const [totalHorsesResult] = await db
      .select({ count: count() })
      .from(animals)
      .where(and(eq(animals.ownerId, userId), eq(animals.type, "horse")));

    const [totalDogsResult] = await db
      .select({ count: count() })
      .from(animals)
      .where(and(eq(animals.ownerId, userId), eq(animals.type, "dog")));

    const [competitionsWonResult] = await db
      .select({ count: count() })
      .from(competitionEntries)
      .where(and(eq(competitionEntries.ownerId, userId), eq(competitionEntries.placement, 1)));

    const [offspringBredResult] = await db
      .select({ count: count() })
      .from(breedings)
      .leftJoin(animals, eq(breedings.motherId, animals.id))
      .where(and(eq(animals.ownerId, userId), eq(breedings.isCompleted, true)));

    return {
      totalAnimals: totalAnimalsResult?.count || 0,
      totalHorses: totalHorsesResult?.count || 0,
      totalDogs: totalDogsResult?.count || 0,
      competitionsWon: competitionsWonResult?.count || 0,
      offspringBred: offspringBredResult?.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();
