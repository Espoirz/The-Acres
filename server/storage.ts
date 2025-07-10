import {
  users,
  animals,
  breedings,
  trainingSessions,
  marketplaceListings,
  facilities,
  competitions,
  competitionEntries,
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
    const [newAnimal] = await db.insert(animals).values(animal).returning();
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
    return await db
      .select()
      .from(breedings)
      .leftJoin(animals, eq(breedings.motherId, animals.id))
      .where(eq(animals.ownerId, ownerId))
      .orderBy(desc(breedings.createdAt));
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
    return await db
      .select()
      .from(trainingSessions)
      .leftJoin(animals, eq(trainingSessions.animalId, animals.id))
      .where(
        and(
          eq(animals.ownerId, ownerId),
          eq(trainingSessions.isCompleted, false)
        )
      )
      .orderBy(asc(trainingSessions.endTime));
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
    let query = db
      .select()
      .from(marketplaceListings)
      .leftJoin(animals, eq(marketplaceListings.animalId, animals.id))
      .leftJoin(users, eq(marketplaceListings.sellerId, users.id))
      .where(eq(marketplaceListings.isActive, true));

    if (filters?.animalType) {
      query = query.where(eq(animals.type, filters.animalType));
    }
    if (filters?.breed) {
      query = query.where(eq(animals.breed, filters.breed));
    }
    if (filters?.minPrice) {
      query = query.where(gte(marketplaceListings.price, filters.minPrice));
    }
    if (filters?.maxPrice) {
      query = query.where(lte(marketplaceListings.price, filters.maxPrice));
    }

    const orderBy = filters?.sortBy === "price_desc" ? desc(marketplaceListings.price) :
                   filters?.sortBy === "price_asc" ? asc(marketplaceListings.price) :
                   desc(marketplaceListings.createdAt);

    return await query.orderBy(orderBy);
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
