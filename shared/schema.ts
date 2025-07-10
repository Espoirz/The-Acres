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
  
  // New progression and reputation systems
  experience: integer("experience").default(0),
  level: integer("level").default(1),
  breedingReputation: integer("breeding_reputation").default(0),
  trainingReputation: integer("training_reputation").default(0),
  tradingReputation: integer("trading_reputation").default(0),
  
  // Social features
  friendCode: varchar("friend_code").unique(),
  guildId: integer("guild_id"),
  
  // Premium features
  isPremium: boolean("is_premium").default(false),
  premiumExpires: timestamp("premium_expires"),
  
  // Settings
  notificationSettings: jsonb("notification_settings").default({}),
  gameSettings: jsonb("game_settings").default({}),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Animal types enum
export const animalTypes = ["horse", "dog", "cat", "pig", "sheep", "goat", "cow", "chicken"] as const;
export type AnimalType = typeof animalTypes[number];

// Animal lifecycle stages
export const lifecycleStages = ["foal", "yearling", "adult", "senior"] as const;
export type LifecycleStage = typeof lifecycleStages[number];

// Animal conditions
export const animalConditions = ["excellent", "good", "fair", "poor", "sick", "injured"] as const;
export type AnimalCondition = typeof animalConditions[number];

// Training types
export const trainingTypes = ["speed", "endurance", "agility", "intelligence", "loyalty", "strength", "focus"] as const;
export type TrainingType = typeof trainingTypes[number];

// Animals table
export const animals = pgTable("animals", {
  id: serial("id").primaryKey(),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  type: varchar("type").notNull().$type<AnimalType>(),
  breed: varchar("breed").notNull(),
  gender: varchar("gender").notNull(), // "male", "female"
  age: integer("age").notNull().default(0), // in months
  ageInDays: integer("age_in_days").notNull().default(0), // for precise aging
  lifecycleStage: varchar("lifecycle_stage").notNull().default("foal").$type<LifecycleStage>(),
  
  // Enhanced Stats
  speed: integer("speed").notNull().default(50),
  endurance: integer("endurance").notNull().default(50),
  agility: integer("agility").notNull().default(50),
  intelligence: integer("intelligence").notNull().default(50),
  loyalty: integer("loyalty").notNull().default(50),
  strength: integer("strength").notNull().default(50),
  focus: integer("focus").notNull().default(50),
  
  // Potential stats (genetic ceiling)
  speedPotential: integer("speed_potential").notNull().default(100),
  endurancePotential: integer("endurance_potential").notNull().default(100),
  agilityPotential: integer("agility_potential").notNull().default(100),
  intelligencePotential: integer("intelligence_potential").notNull().default(100),
  loyaltyPotential: integer("loyalty_potential").notNull().default(100),
  strengthPotential: integer("strength_potential").notNull().default(100),
  focusPotential: integer("focus_potential").notNull().default(100),
  
  // Enhanced Genetics
  coatColor: varchar("coat_color").notNull(),
  eyeColor: varchar("eye_color").default("brown"),
  markings: varchar("markings").default("none"),
  size: varchar("size").default("medium"), // small, medium, large
  genetics: jsonb("genetics").notNull().default({}),
  hiddenTraits: jsonb("hidden_traits").notNull().default({}),
  lineage: jsonb("lineage").notNull().default({}),
  geneticTestResults: jsonb("genetic_test_results").default({}),
  
  // Enhanced Health and Care
  health: integer("health").notNull().default(100),
  happiness: integer("happiness").notNull().default(100),
  energy: integer("energy").notNull().default(100),
  condition: varchar("condition").notNull().default("good").$type<AnimalCondition>(),
  lastFed: timestamp("last_fed"),
  lastGroomed: timestamp("last_groomed"),
  lastExercised: timestamp("last_exercised"),
  lastVetCheckup: timestamp("last_vet_checkup"),
  
  // Nutrition and Care
  nutritionLevel: integer("nutrition_level").notNull().default(100),
  groomingLevel: integer("grooming_level").notNull().default(100),
  exerciseLevel: integer("exercise_level").notNull().default(100),
  
  // Medical
  vaccinations: jsonb("vaccinations").notNull().default([]),
  medications: jsonb("medications").notNull().default([]),
  injuries: jsonb("injuries").notNull().default([]),
  illnesses: jsonb("illnesses").notNull().default([]),
  
  // Enhanced Breeding
  isBreedingEligible: boolean("is_breeding_eligible").notNull().default(false),
  lastBred: timestamp("last_bred"),
  pregnancyDue: timestamp("pregnancy_due"),
  breedingCooldown: timestamp("breeding_cooldown"),
  totalOffspring: integer("total_offspring").default(0),
  
  // Performance and Records
  competitionsWon: integer("competitions_won").default(0),
  competitionsEntered: integer("competitions_entered").default(0),
  bestSpeed: decimal("best_speed", { precision: 10, scale: 2 }),
  bestEndurance: decimal("best_endurance", { precision: 10, scale: 2 }),
  bestAgility: decimal("best_agility", { precision: 10, scale: 2 }),
  
  // Market and Value
  isForSale: boolean("is_for_sale").notNull().default(false),
  price: integer("price"),
  marketValue: integer("market_value").default(0),
  breedingValue: integer("breeding_value").default(0),
  
  // Special Status
  isRetired: boolean("is_retired").default(false),
  isHallOfFame: boolean("is_hall_of_fame").default(false),
  isChampion: boolean("is_champion").default(false),
  specialTitles: text("special_titles").array().default([]),
  
  // Facility Assignment
  currentFacilityId: integer("current_facility_id"),
  preferredFacilityType: varchar("preferred_facility_type"),
  
  // Metadata
  imageUrl: varchar("image_url"),
  description: text("description"),
  personalityTraits: jsonb("personality_traits").default({}),
  achievements: jsonb("achievements").default([]),
  
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

// Daily Care Activities
export const dailyCare = pgTable("daily_care", {
  id: serial("id").primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  careType: varchar("care_type").notNull(), // "feeding", "grooming", "exercise", "play"
  quality: varchar("quality").notNull(), // "poor", "average", "good", "excellent"
  cost: integer("cost").default(0),
  happinessBonus: integer("happiness_bonus").default(0),
  healthBonus: integer("health_bonus").default(0),
  energyChange: integer("energy_change").default(0),
  completedAt: timestamp("completed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Veterinary Records
export const vetRecords = pgTable("vet_records", {
  id: serial("id").primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  vetType: varchar("vet_type").notNull(), // "checkup", "vaccination", "treatment", "surgery"
  condition: varchar("condition"), // what was treated
  treatment: text("treatment"),
  cost: integer("cost").notNull(),
  effectiveness: integer("effectiveness").default(100), // 0-100%
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: timestamp("follow_up_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Achievements
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  category: varchar("category").notNull(), // "breeding", "competition", "collection", "facility", "social"
  icon: varchar("icon"),
  rarity: varchar("rarity").notNull().default("common"), // "common", "rare", "epic", "legendary"
  pointValue: integer("point_value").default(0),
  requirements: jsonb("requirements").notNull().default({}),
  isHidden: boolean("is_hidden").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Achievements
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  progress: integer("progress").default(0),
  maxProgress: integer("max_progress").default(1),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quests and Missions
export const quests = pgTable("quests", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  category: varchar("category").notNull(), // "tutorial", "daily", "weekly", "story", "special"
  difficulty: varchar("difficulty").default("easy"), // "easy", "medium", "hard", "expert"
  requirements: jsonb("requirements").notNull().default({}),
  rewards: jsonb("rewards").notNull().default({}),
  isActive: boolean("is_active").default(true),
  isRepeatable: boolean("is_repeatable").default(false),
  cooldownHours: integer("cooldown_hours").default(24),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Quests
export const userQuests = pgTable("user_quests", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  questId: integer("quest_id").notNull().references(() => quests.id),
  progress: jsonb("progress").notNull().default({}),
  isCompleted: boolean("is_completed").default(false),
  isCollected: boolean("is_collected").default(false),
  completedAt: timestamp("completed_at"),
  collectedAt: timestamp("collected_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Friends System
export const friendships = pgTable("friendships", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  friendId: varchar("friend_id").notNull().references(() => users.id),
  status: varchar("status").notNull().default("pending"), // "pending", "accepted", "blocked"
  createdAt: timestamp("created_at").defaultNow(),
  acceptedAt: timestamp("accepted_at"),
});

// Guilds/Clubs
export const guilds = pgTable("guilds", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  memberLimit: integer("member_limit").default(50),
  isPublic: boolean("is_public").default(true),
  requirements: jsonb("requirements").default({}),
  benefits: jsonb("benefits").default({}),
  level: integer("level").default(1),
  experience: integer("experience").default(0),
  treasury: integer("treasury").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Guild Members
export const guildMembers = pgTable("guild_members", {
  id: serial("id").primaryKey(),
  guildId: integer("guild_id").notNull().references(() => guilds.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  role: varchar("role").default("member"), // "member", "officer", "leader"
  joinedAt: timestamp("joined_at").defaultNow(),
  contribution: integer("contribution").default(0),
});

// Equipment System
export const equipment = pgTable("equipment", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // "saddle", "bridle", "training_weights", "supplements"
  rarity: varchar("rarity").default("common"),
  effects: jsonb("effects").notNull().default({}), // stat bonuses, training efficiency
  durability: integer("durability").default(100),
  cost: integer("cost").notNull(),
  requirements: jsonb("requirements").default({}),
  description: text("description"),
  imageUrl: varchar("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Equipment Inventory
export const userEquipment = pgTable("user_equipment", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  equipmentId: integer("equipment_id").notNull().references(() => equipment.id),
  quantity: integer("quantity").default(1),
  condition: integer("condition").default(100), // 0-100
  isEquipped: boolean("is_equipped").default(false),
  equippedToAnimalId: integer("equipped_to_animal_id").references(() => animals.id),
  purchasedAt: timestamp("purchased_at").defaultNow(),
});

// Auction House
export const auctions = pgTable("auctions", {
  id: serial("id").primaryKey(),
  sellerId: varchar("seller_id").notNull().references(() => users.id),
  itemType: varchar("item_type").notNull(), // "animal", "equipment", "facility"
  itemId: integer("item_id").notNull(),
  startingPrice: integer("starting_price").notNull(),
  currentBid: integer("current_bid").default(0),
  highestBidderId: varchar("highest_bidder_id").references(() => users.id),
  buyNowPrice: integer("buy_now_price"),
  isActive: boolean("is_active").default(true),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Auction Bids
export const auctionBids = pgTable("auction_bids", {
  id: serial("id").primaryKey(),
  auctionId: integer("auction_id").notNull().references(() => auctions.id),
  bidderId: varchar("bidder_id").notNull().references(() => users.id),
  bidAmount: integer("bid_amount").notNull(),
  isWinning: boolean("is_winning").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Staff System
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // "trainer", "veterinarian", "caretaker", "manager"
  specialization: varchar("specialization"), // "speed_training", "endurance", "breeding", etc.
  skill: integer("skill").notNull(), // 1-100
  salary: integer("salary").notNull(),
  efficiency: integer("efficiency").default(100),
  morale: integer("morale").default(100),
  experience: integer("experience").default(0),
  traits: jsonb("traits").default([]),
  description: text("description"),
  imageUrl: varchar("image_url"),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Staff (hired staff)
export const userStaff = pgTable("user_staff", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  staffId: integer("staff_id").notNull().references(() => staff.id),
  facilityId: integer("facility_id").references(() => facilities.id),
  hiredAt: timestamp("hired_at").defaultNow(),
  contractLength: integer("contract_length").default(30), // days
  contractExpires: timestamp("contract_expires"),
  performance: integer("performance").default(100),
  isActive: boolean("is_active").default(true),
});

// Events and Seasons
export const gameEvents = pgTable("game_events", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  type: varchar("type").notNull(), // "seasonal", "holiday", "special", "breeding_season"
  effects: jsonb("effects").notNull().default({}), // market bonuses, breeding bonuses, etc.
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  imageUrl: varchar("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // "breeding_complete", "training_done", "competition_result"
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  data: jsonb("data").default({}),
  isRead: boolean("is_read").default(false),
  priority: varchar("priority").default("normal"), // "low", "normal", "high", "urgent"
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Research System
export const research = pgTable("research", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  category: varchar("category").notNull(), // "genetics", "training", "nutrition", "medical"
  cost: integer("cost").notNull(),
  timeRequired: integer("time_required").notNull(), // in hours
  prerequisites: text("prerequisites").array().default([]),
  benefits: jsonb("benefits").notNull().default({}),
  unlocks: text("unlocks").array().default([]),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Research
export const userResearch = pgTable("user_research", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  researchId: integer("research_id").notNull().references(() => research.id),
  progress: integer("progress").default(0),
  isCompleted: boolean("is_completed").default(false),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

// Insurance Policies
export const insurancePolicies = pgTable("insurance_policies", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  policyType: varchar("policy_type").notNull(), // "basic", "premium", "elite"
  coverage: integer("coverage").notNull(), // coverage amount
  premium: integer("premium").notNull(), // monthly cost
  deductible: integer("deductible").default(0),
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Weather System
export const weather = pgTable("weather", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  temperature: integer("temperature"), // in fahrenheit
  humidity: integer("humidity"), // 0-100%
  weatherType: varchar("weather_type").notNull(), // "sunny", "rainy", "stormy", "snowy"
  severity: varchar("severity").default("mild"), // "mild", "moderate", "severe"
  effects: jsonb("effects").default({}), // effects on animals, facilities, training
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many, one }) => ({
  animals: many(animals),
  facilities: many(facilities),
  marketplaceListings: many(marketplaceListings),
  competitionEntries: many(competitionEntries),
  dailyCare: many(dailyCare),
  vetRecords: many(vetRecords),
  achievements: many(userAchievements),
  quests: many(userQuests),
  sentFriendships: many(friendships, { relationName: "sender" }),
  receivedFriendships: many(friendships, { relationName: "receiver" }),
  ownedGuilds: many(guilds),
  guildMembership: one(guildMembers),
  equipment: many(userEquipment),
  auctions: many(auctions),
  auctionBids: many(auctionBids),
  staff: many(userStaff),
  notifications: many(notifications),
  research: many(userResearch),
  insurancePolicies: many(insurancePolicies),
}));

export const animalsRelations = relations(animals, ({ one, many }) => ({
  owner: one(users, { fields: [animals.ownerId], references: [users.id] }),
  motherBreedings: many(breedings, { relationName: "mother" }),
  fatherBreedings: many(breedings, { relationName: "father" }),
  offspringBreedings: many(breedings, { relationName: "offspring" }),
  trainingSessions: many(trainingSessions),
  marketplaceListing: one(marketplaceListings),
  competitionEntries: many(competitionEntries),
  dailyCare: many(dailyCare),
  vetRecords: many(vetRecords),
  currentFacility: one(facilities, { fields: [animals.currentFacilityId], references: [facilities.id] }),
  equippedItems: many(userEquipment),
  insurancePolicies: many(insurancePolicies),
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

// New relations for all the new tables
export const dailyCareRelations = relations(dailyCare, ({ one }) => ({
  animal: one(animals, { fields: [dailyCare.animalId], references: [animals.id] }),
  owner: one(users, { fields: [dailyCare.ownerId], references: [users.id] }),
}));

export const vetRecordsRelations = relations(vetRecords, ({ one }) => ({
  animal: one(animals, { fields: [vetRecords.animalId], references: [animals.id] }),
  owner: one(users, { fields: [vetRecords.ownerId], references: [users.id] }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, { fields: [userAchievements.userId], references: [users.id] }),
  achievement: one(achievements, { fields: [userAchievements.achievementId], references: [achievements.id] }),
}));

export const questsRelations = relations(quests, ({ many }) => ({
  userQuests: many(userQuests),
}));

export const userQuestsRelations = relations(userQuests, ({ one }) => ({
  user: one(users, { fields: [userQuests.userId], references: [users.id] }),
  quest: one(quests, { fields: [userQuests.questId], references: [quests.id] }),
}));

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  user: one(users, { fields: [friendships.userId], references: [users.id], relationName: "sender" }),
  friend: one(users, { fields: [friendships.friendId], references: [users.id], relationName: "receiver" }),
}));

export const guildsRelations = relations(guilds, ({ one, many }) => ({
  owner: one(users, { fields: [guilds.ownerId], references: [users.id] }),
  members: many(guildMembers),
}));

export const guildMembersRelations = relations(guildMembers, ({ one }) => ({
  guild: one(guilds, { fields: [guildMembers.guildId], references: [guilds.id] }),
  user: one(users, { fields: [guildMembers.userId], references: [users.id] }),
}));

export const equipmentRelations = relations(equipment, ({ many }) => ({
  userEquipment: many(userEquipment),
}));

export const userEquipmentRelations = relations(userEquipment, ({ one }) => ({
  user: one(users, { fields: [userEquipment.userId], references: [users.id] }),
  equipment: one(equipment, { fields: [userEquipment.equipmentId], references: [equipment.id] }),
  equippedAnimal: one(animals, { fields: [userEquipment.equippedToAnimalId], references: [animals.id] }),
}));

export const auctionsRelations = relations(auctions, ({ one, many }) => ({
  seller: one(users, { fields: [auctions.sellerId], references: [users.id] }),
  highestBidder: one(users, { fields: [auctions.highestBidderId], references: [users.id] }),
  bids: many(auctionBids),
}));

export const auctionBidsRelations = relations(auctionBids, ({ one }) => ({
  auction: one(auctions, { fields: [auctionBids.auctionId], references: [auctions.id] }),
  bidder: one(users, { fields: [auctionBids.bidderId], references: [users.id] }),
}));

export const staffRelations = relations(staff, ({ many }) => ({
  userStaff: many(userStaff),
}));

export const userStaffRelations = relations(userStaff, ({ one }) => ({
  user: one(users, { fields: [userStaff.userId], references: [users.id] }),
  staff: one(staff, { fields: [userStaff.staffId], references: [staff.id] }),
  facility: one(facilities, { fields: [userStaff.facilityId], references: [facilities.id] }),
}));

export const gameEventsRelations = relations(gameEvents, ({ many }) => ({
  // No direct relations, but events affect many things
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

export const researchRelations = relations(research, ({ many }) => ({
  userResearch: many(userResearch),
}));

export const userResearchRelations = relations(userResearch, ({ one }) => ({
  user: one(users, { fields: [userResearch.userId], references: [users.id] }),
  research: one(research, { fields: [userResearch.researchId], references: [research.id] }),
}));

export const insurancePoliciesRelations = relations(insurancePolicies, ({ one }) => ({
  user: one(users, { fields: [insurancePolicies.userId], references: [users.id] }),
  animal: one(animals, { fields: [insurancePolicies.animalId], references: [animals.id] }),
}));

export const weatherRelations = relations(weather, ({ many }) => ({
  // No direct relations, but weather affects many things
}));

// Insert schemas
export const insertAnimalSchema = createInsertSchema(animals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  type: z.enum(["horse", "dog", "cat", "pig", "sheep", "goat", "cow", "chicken"]),
  lifecycleStage: z.enum(["foal", "yearling", "adult", "senior"]).optional(),
  condition: z.enum(["excellent", "good", "fair", "poor", "sick", "injured"]).optional(),
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

// New insert schemas for all new tables
export const insertDailyCareSchema = createInsertSchema(dailyCare).omit({
  id: true,
  createdAt: true,
});

export const insertVetRecordSchema = createInsertSchema(vetRecords).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  createdAt: true,
});

export const insertQuestSchema = createInsertSchema(quests).omit({
  id: true,
  createdAt: true,
});

export const insertUserQuestSchema = createInsertSchema(userQuests).omit({
  id: true,
  createdAt: true,
});

export const insertFriendshipSchema = createInsertSchema(friendships).omit({
  id: true,
  createdAt: true,
});

export const insertGuildSchema = createInsertSchema(guilds).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGuildMemberSchema = createInsertSchema(guildMembers).omit({
  id: true,
});

export const insertEquipmentSchema = createInsertSchema(equipment).omit({
  id: true,
  createdAt: true,
});

export const insertUserEquipmentSchema = createInsertSchema(userEquipment).omit({
  id: true,
});

export const insertAuctionSchema = createInsertSchema(auctions).omit({
  id: true,
  createdAt: true,
});

export const insertAuctionBidSchema = createInsertSchema(auctionBids).omit({
  id: true,
  createdAt: true,
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
  createdAt: true,
});

export const insertUserStaffSchema = createInsertSchema(userStaff).omit({
  id: true,
});

export const insertGameEventSchema = createInsertSchema(gameEvents).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertResearchSchema = createInsertSchema(research).omit({
  id: true,
  createdAt: true,
});

export const insertUserResearchSchema = createInsertSchema(userResearch).omit({
  id: true,
});

export const insertInsurancePolicySchema = createInsertSchema(insurancePolicies).omit({
  id: true,
  createdAt: true,
});

export const insertWeatherSchema = createInsertSchema(weather).omit({
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
