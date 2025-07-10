import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  currency: integer("currency").default(5000),
  prestige: integer("prestige").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Animal types enum
export const animalTypes = ["horse", "dog"] as const;
export type AnimalType = typeof animalTypes[number];

// Animal lifecycle stages
export const lifecycleStages = ["foal", "yearling", "adult", "senior"] as const;
export type LifecycleStage = typeof lifecycleStages[number];

// Animals table
export const animals = pgTable("animals", {
  id: serial("id").primaryKey(),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  type: varchar("type").notNull().$type<AnimalType>(),
  breed: varchar("breed").notNull(),
  gender: varchar("gender").notNull(), // "male", "female"
  age: integer("age").notNull().default(0), // in months
  lifecycleStage: varchar("lifecycle_stage").notNull().default("foal").$type<LifecycleStage>(),
  
  // Stats
  speed: integer("speed").notNull().default(50),
  endurance: integer("endurance").notNull().default(50),
  agility: integer("agility").notNull().default(50),
  intelligence: integer("intelligence").notNull().default(50),
  loyalty: integer("loyalty").notNull().default(50),
  
  // Genetics
  coatColor: varchar("coat_color").notNull(),
  genetics: jsonb("genetics").notNull().default({}),
  
  // Health and care
  health: integer("health").notNull().default(100),
  happiness: integer("happiness").notNull().default(100),
  energy: integer("energy").notNull().default(100),
  
  // Breeding
  isBreedingEligible: boolean("is_breeding_eligible").notNull().default(false),
  lastBred: timestamp("last_bred"),
  pregnancyDue: timestamp("pregnancy_due"),
  
  // Market
  isForSale: boolean("is_for_sale").notNull().default(false),
  price: integer("price"),
  
  // Metadata
  imageUrl: varchar("image_url"),
  description: text("description"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Breeding records
export const breedings = pgTable("breedings", {
  id: serial("id").primaryKey(),
  motherId: integer("mother_id").notNull().references(() => animals.id),
  fatherId: integer("father_id").notNull().references(() => animals.id),
  offspringId: integer("offspring_id").references(() => animals.id),
  breedingDate: timestamp("breeding_date").notNull(),
  expectedDueDate: timestamp("expected_due_date").notNull(),
  actualBirthDate: timestamp("actual_birth_date"),
  geneticPredictions: jsonb("genetic_predictions").notNull().default({}),
  isCompleted: boolean("is_completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Training sessions
export const trainingSessions = pgTable("training_sessions", {
  id: serial("id").primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  trainingType: varchar("training_type").notNull(), // "speed", "endurance", "agility", "intelligence"
  duration: integer("duration").notNull(), // in minutes
  cost: integer("cost").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  statImprovement: integer("stat_improvement").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Marketplace listings
export const marketplaceListings = pgTable("marketplace_listings", {
  id: serial("id").primaryKey(),
  sellerId: varchar("seller_id").notNull().references(() => users.id),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  price: integer("price").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Facilities
export const facilities = pgTable("facilities", {
  id: serial("id").primaryKey(),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // "stable", "kennel", "arena", "vet_clinic"
  capacity: integer("capacity").notNull(),
  condition: varchar("condition").notNull().default("good"), // "excellent", "good", "fair", "poor"
  amenities: text("amenities").array().notNull().default([]),
  maintenanceCost: integer("maintenance_cost").notNull().default(0),
  lastMaintenance: timestamp("last_maintenance"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Competitions
export const competitions = pgTable("competitions", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // "speed", "agility", "endurance", "show"
  animalType: varchar("animal_type").notNull().$type<AnimalType>(),
  entryFee: integer("entry_fee").notNull(),
  prizePool: integer("prize_pool").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Competition entries
export const competitionEntries = pgTable("competition_entries", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id").notNull().references(() => competitions.id),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  score: integer("score"),
  placement: integer("placement"),
  prizeMoney: integer("prize_money").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  animals: many(animals),
  facilities: many(facilities),
  marketplaceListings: many(marketplaceListings),
  competitionEntries: many(competitionEntries),
}));

export const animalsRelations = relations(animals, ({ one, many }) => ({
  owner: one(users, { fields: [animals.ownerId], references: [users.id] }),
  motherBreedings: many(breedings, { relationName: "mother" }),
  fatherBreedings: many(breedings, { relationName: "father" }),
  offspringBreedings: many(breedings, { relationName: "offspring" }),
  trainingSessions: many(trainingSessions),
  marketplaceListing: one(marketplaceListings),
  competitionEntries: many(competitionEntries),
}));

export const breedingsRelations = relations(breedings, ({ one }) => ({
  mother: one(animals, { fields: [breedings.motherId], references: [animals.id], relationName: "mother" }),
  father: one(animals, { fields: [breedings.fatherId], references: [animals.id], relationName: "father" }),
  offspring: one(animals, { fields: [breedings.offspringId], references: [animals.id], relationName: "offspring" }),
}));

export const trainingSessionsRelations = relations(trainingSessions, ({ one }) => ({
  animal: one(animals, { fields: [trainingSessions.animalId], references: [animals.id] }),
}));

export const marketplaceListingsRelations = relations(marketplaceListings, ({ one }) => ({
  seller: one(users, { fields: [marketplaceListings.sellerId], references: [users.id] }),
  animal: one(animals, { fields: [marketplaceListings.animalId], references: [animals.id] }),
}));

export const facilitiesRelations = relations(facilities, ({ one }) => ({
  owner: one(users, { fields: [facilities.ownerId], references: [users.id] }),
}));

export const competitionsRelations = relations(competitions, ({ many }) => ({
  entries: many(competitionEntries),
}));

export const competitionEntriesRelations = relations(competitionEntries, ({ one }) => ({
  competition: one(competitions, { fields: [competitionEntries.competitionId], references: [competitions.id] }),
  animal: one(animals, { fields: [competitionEntries.animalId], references: [animals.id] }),
  owner: one(users, { fields: [competitionEntries.ownerId], references: [users.id] }),
}));

// Insert schemas
export const insertAnimalSchema = createInsertSchema(animals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  type: z.enum(["horse", "dog"]),
  lifecycleStage: z.enum(["foal", "yearling", "adult", "senior"]).optional(),
});

export const insertBreedingSchema = createInsertSchema(breedings).omit({
  id: true,
  createdAt: true,
});

export const insertTrainingSessionSchema = createInsertSchema(trainingSessions).omit({
  id: true,
  createdAt: true,
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFacilitySchema = createInsertSchema(facilities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompetitionSchema = createInsertSchema(competitions).omit({
  id: true,
  createdAt: true,
});

export const insertCompetitionEntrySchema = createInsertSchema(competitionEntries).omit({
  id: true,
  createdAt: true,
});

// Export types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Animal = typeof animals.$inferSelect;
export type InsertAnimal = z.infer<typeof insertAnimalSchema>;
export type Breeding = typeof breedings.$inferSelect;
export type InsertBreeding = z.infer<typeof insertBreedingSchema>;
export type TrainingSession = typeof trainingSessions.$inferSelect;
export type InsertTrainingSession = z.infer<typeof insertTrainingSessionSchema>;
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;
export type InsertMarketplaceListing = z.infer<typeof insertMarketplaceListingSchema>;
export type Facility = typeof facilities.$inferSelect;
export type InsertFacility = z.infer<typeof insertFacilitySchema>;
export type Competition = typeof competitions.$inferSelect;
export type InsertCompetition = z.infer<typeof insertCompetitionSchema>;
export type CompetitionEntry = typeof competitionEntries.$inferSelect;
export type InsertCompetitionEntry = z.infer<typeof insertCompetitionEntrySchema>;
