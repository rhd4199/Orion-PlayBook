-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "actor_user_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "before_json" JSONB,
    "after_json" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "license_note" TEXT,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rules_terms" (
    "id" UUID NOT NULL,
    "kind" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "rules_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spells" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "casting_time" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components_json" JSONB NOT NULL,
    "duration" TEXT NOT NULL,
    "concentration_bool" BOOLEAN NOT NULL,
    "ritual_bool" BOOLEAN NOT NULL,
    "description_md" TEXT NOT NULL,

    CONSTRAINT "spells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spell_tags" (
    "spell_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "spell_tags_pkey" PRIMARY KEY ("spell_id","tag_id")
);

-- CreateTable
CREATE TABLE "spell_scaling" (
    "id" UUID NOT NULL,
    "spell_id" UUID NOT NULL,
    "mode" TEXT NOT NULL,
    "scaling_json" JSONB NOT NULL,

    CONSTRAINT "spell_scaling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "hit_die" INTEGER NOT NULL,
    "primary_abilities_json" JSONB NOT NULL,
    "proficiencies_json" JSONB NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subclasses" (
    "id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subclasses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description_md" TEXT NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_features" (
    "class_id" UUID NOT NULL,
    "feature_id" UUID NOT NULL,
    "level_gained" INTEGER NOT NULL,

    CONSTRAINT "class_features_pkey" PRIMARY KEY ("class_id","feature_id")
);

-- CreateTable
CREATE TABLE "subclass_features" (
    "subclass_id" UUID NOT NULL,
    "feature_id" UUID NOT NULL,
    "level_gained" INTEGER NOT NULL,

    CONSTRAINT "subclass_features_pkey" PRIMARY KEY ("subclass_id","feature_id")
);

-- CreateTable
CREATE TABLE "feats" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "prerequisites_json" JSONB NOT NULL,
    "description_md" TEXT NOT NULL,

    CONSTRAINT "feats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "speed_json" JSONB NOT NULL,
    "traits_json" JSONB NOT NULL,
    "description_md" TEXT NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backgrounds" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "skill_proficiencies_json" JSONB NOT NULL,
    "tool_proficiencies_json" JSONB NOT NULL,
    "languages_json" JSONB NOT NULL,
    "features_json" JSONB NOT NULL,

    CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "cost_cp" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "description_md" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "item_id" UUID NOT NULL,
    "weapon_type" TEXT NOT NULL,
    "damage_dice" TEXT NOT NULL,
    "damage_type" TEXT NOT NULL,
    "properties_json" JSONB NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "armors" (
    "item_id" UUID NOT NULL,
    "armor_type" TEXT NOT NULL,
    "ac_base" INTEGER NOT NULL,
    "dex_cap" INTEGER,
    "str_req" INTEGER,
    "stealth_disadvantage_bool" BOOLEAN NOT NULL,

    CONSTRAINT "armors_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "item_tags" (
    "item_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "item_tags_pkey" PRIMARY KEY ("item_id","tag_id")
);

-- CreateTable
CREATE TABLE "monsters" (
    "id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "alignment" TEXT NOT NULL,
    "ac" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "speed_json" JSONB NOT NULL,
    "ability_scores_json" JSONB NOT NULL,
    "saves_json" JSONB NOT NULL,
    "skills_json" JSONB NOT NULL,
    "senses_json" JSONB NOT NULL,
    "languages_json" JSONB NOT NULL,
    "cr" DOUBLE PRECISION NOT NULL,
    "xp" INTEGER NOT NULL,
    "traits_md" TEXT NOT NULL,
    "actions_md" TEXT NOT NULL,
    "legendary_actions_md" TEXT,

    CONSTRAINT "monsters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monster_actions" (
    "id" UUID NOT NULL,
    "monster_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "action_type" TEXT NOT NULL,
    "toHit" INTEGER,
    "reach_range" TEXT,
    "damage_json" JSONB,
    "description_md" TEXT NOT NULL,

    CONSTRAINT "monster_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL,
    "kind" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "meta_json" JSONB NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_assets" (
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "asset_id" UUID NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "entity_assets_pkey" PRIMARY KEY ("entity_type","entity_id","asset_id","role")
);

-- CreateTable
CREATE TABLE "i18n_strings" (
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "i18n_strings_pkey" PRIMARY KEY ("entity_type","entity_id","field","locale")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "level_total" INTEGER NOT NULL,
    "species_id" UUID NOT NULL,
    "background_id" UUID NOT NULL,
    "alignment" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "notes_md" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_abilities" (
    "character_id" UUID NOT NULL,
    "str" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "con" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "wis" INTEGER NOT NULL,
    "cha" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "raw_json" JSONB NOT NULL,

    CONSTRAINT "character_abilities_pkey" PRIMARY KEY ("character_id")
);

-- CreateTable
CREATE TABLE "character_classes" (
    "id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "subclass_id" UUID,
    "level" INTEGER NOT NULL,
    "hit_points_rolls_json" JSONB,

    CONSTRAINT "character_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_proficiencies" (
    "id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "kind" TEXT NOT NULL,
    "term_key" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "character_proficiencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_inventory" (
    "id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "item_id" UUID NOT NULL,
    "qty" INTEGER NOT NULL,
    "equipped_bool" BOOLEAN NOT NULL,
    "attuned_bool" BOOLEAN NOT NULL,
    "custom_name" TEXT,
    "custom_meta_json" JSONB,

    CONSTRAINT "character_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_spells_known" (
    "id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "spell_id" UUID NOT NULL,
    "source" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "character_spells_known_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_spells_prepared" (
    "character_id" UUID NOT NULL,
    "spell_id" UUID NOT NULL,
    "prepared_bool" BOOLEAN NOT NULL,

    CONSTRAINT "character_spells_prepared_pkey" PRIMARY KEY ("character_id","spell_id")
);

-- CreateTable
CREATE TABLE "character_resources" (
    "id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "current" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "meta_json" JSONB,

    CONSTRAINT "character_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "choices" (
    "id" UUID NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "prompt" TEXT,
    "options_json" JSONB NOT NULL,
    "rules_json" JSONB,

    CONSTRAINT "choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_choices" (
    "id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "choice_id" UUID NOT NULL,
    "selected_json" JSONB NOT NULL,
    "chosen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "character_choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" UUID NOT NULL,
    "owner_user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "setting" TEXT,
    "notes_md" TEXT,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_members" (
    "campaign_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "campaign_members_pkey" PRIMARY KEY ("campaign_id","user_id")
);

-- CreateTable
CREATE TABLE "campaign_characters" (
    "campaign_id" UUID NOT NULL,
    "character_id" UUID NOT NULL,

    CONSTRAINT "campaign_characters_pkey" PRIMARY KEY ("campaign_id","character_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "summary_md" TEXT,
    "notes_md" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounters" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "encounters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounter_combatants" (
    "id" UUID NOT NULL,
    "encounter_id" UUID NOT NULL,
    "kind" TEXT NOT NULL,
    "ref_id" TEXT NOT NULL,
    "initiative" INTEGER NOT NULL,
    "hp_current" INTEGER NOT NULL,
    "conditions_json" JSONB,

    CONSTRAINT "encounter_combatants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_key_key" ON "permissions"("key");

-- CreateIndex
CREATE UNIQUE INDEX "rules_terms_kind_key_key" ON "rules_terms"("kind", "key");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spells" ADD CONSTRAINT "spells_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spell_tags" ADD CONSTRAINT "spell_tags_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spell_tags" ADD CONSTRAINT "spell_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spell_scaling" ADD CONSTRAINT "spell_scaling_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclasses" ADD CONSTRAINT "subclasses_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclasses" ADD CONSTRAINT "subclasses_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_features" ADD CONSTRAINT "class_features_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_features" ADD CONSTRAINT "class_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclass_features" ADD CONSTRAINT "subclass_features_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclass_features" ADD CONSTRAINT "subclass_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feats" ADD CONSTRAINT "feats_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "species" ADD CONSTRAINT "species_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backgrounds" ADD CONSTRAINT "backgrounds_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "armors" ADD CONSTRAINT "armors_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_tags" ADD CONSTRAINT "item_tags_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_tags" ADD CONSTRAINT "item_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monsters" ADD CONSTRAINT "monsters_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_actions" ADD CONSTRAINT "monster_actions_monster_id_fkey" FOREIGN KEY ("monster_id") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entity_assets" ADD CONSTRAINT "entity_assets_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "backgrounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_abilities" ADD CONSTRAINT "character_abilities_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_classes" ADD CONSTRAINT "character_classes_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_classes" ADD CONSTRAINT "character_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_classes" ADD CONSTRAINT "character_classes_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_proficiencies" ADD CONSTRAINT "character_proficiencies_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_inventory" ADD CONSTRAINT "character_inventory_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_inventory" ADD CONSTRAINT "character_inventory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_spells_known" ADD CONSTRAINT "character_spells_known_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_spells_known" ADD CONSTRAINT "character_spells_known_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_spells_prepared" ADD CONSTRAINT "character_spells_prepared_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_spells_prepared" ADD CONSTRAINT "character_spells_prepared_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_resources" ADD CONSTRAINT "character_resources_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_choices" ADD CONSTRAINT "character_choices_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_choices" ADD CONSTRAINT "character_choices_choice_id_fkey" FOREIGN KEY ("choice_id") REFERENCES "choices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_members" ADD CONSTRAINT "campaign_members_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_members" ADD CONSTRAINT "campaign_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_characters" ADD CONSTRAINT "campaign_characters_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_characters" ADD CONSTRAINT "campaign_characters_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounter_combatants" ADD CONSTRAINT "encounter_combatants_encounter_id_fkey" FOREIGN KEY ("encounter_id") REFERENCES "encounters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
