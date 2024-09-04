import { GameObjectDefs } from "../../../shared/defs/gameObjectDefs";
import type { GunDef } from "../../../shared/defs/gameObjects/gunDefs";
import { ObjectType } from "../../../shared/net/objectSerializeFns";
import { GamePlugin } from "../game/pluginManager";

const lootTable = {
    tier_world: [
        { name: "tier_scopes", count: 1, weight: 1 },
        { name: "tier_armor", count: 1, weight: 1.7 },
        { name: "tier_packs", count: 1, weight: 0.5 },
        { name: "tier_medical", count: 1, weight: 1.5 },
        { name: "tier_ammo", count: 1, weight: 2.5 },
        { name: "tier_guns", count: 1, weight: 2 },
    ],
    tier_surviv: [
        { name: "tier_scopes", count: 1, weight: 1 },
        { name: "tier_armor", count: 1, weight: 1.2 },
        { name: "tier_medical", count: 1, weight: 4 },
        { name: "tier_packs", count: 1, weight: 1 },
    ],
    tier_container: [
        { name: "tier_scopes", count: 1, weight: 0.2 },
        { name: "tier_armor", count: 1, weight: 1 },
        { name: "tier_packs", count: 1, weight: 0.3 },
        { name: "tier_medical", count: 1, weight: 0.8 },
        { name: "tier_ammo", count: 1, weight: 0.5 },
        { name: "tier_guns", count: 1, weight: 0.6 },
    ],
    tier_leaf_pile: [
        { name: "tier_scopes", count: 1, weight: 1 },
        { name: "tier_armor", count: 1, weight: 1.5 },
        { name: "tier_packs", count: 1, weight: 1 },
        { name: "tier_medical", count: 1, weight: 1 },
        { name: "tier_ammo", count: 1, weight: 1 },
    ],
    tier_soviet: [
        { name: "tier_scopes", count: 1, weight: 1 },
        { name: "tier_armor", count: 1, weight: 1.5 },
        { name: "tier_packs", count: 1, weight: 1 },
        { name: "tier_medical", count: 1, weight: 2 },
        { name: "tier_ammo", count: 1, weight: 3 },
        { name: "tier_guns", count: 1, weight: 6 },
    ],
    tier_toilet: [
        { name: "tier_scopes", count: 1, weight: 0.5 },
        { name: "tier_guns", count: 1, weight: 0.2 },
        { name: "tier_medical", count: 1, weight: 1.0 },
    ],
    tier_scopes: [
        { name: "2xscope", count: 1, weight: 0.7 },
        { name: "4xscope", count: 1, weight: 0.55 },
        { name: "8xscope", count: 1, weight: 0 },
        { name: "15xscope", count: 1, weight: 0 },
    ],
    tier_armor: [
        { name: "helmet01", count: 1, weight: 10 },
        { name: "helmet02", count: 1, weight: 7 },
        { name: "helmet03", count: 1, weight: 2 },
        { name: "chest01", count: 1, weight: 10 },
        { name: "chest02", count: 1, weight: 7 },
        { name: "chest03", count: 1, weight: 2 },
    ],
    tier_packs: [
        { name: "backpack01", count: 1, weight: 10 },
        { name: "backpack02", count: 1, weight: 4 },
        { name: "backpack03", count: 1, weight: 1 },
    ],
    tier_medical: [
        { name: "bandage", count: 5, weight: 8 },
        { name: "healthkit", count: 1, weight: 5 },
        { name: "soda", count: 1, weight: 13 },
        { name: "painkiller", count: 1, weight: 6 },
    ],
    tier_throwables: [
        { name: "frag", count: 1, weight: 1 },
        { name: "smoke", count: 1, weight: 1 },
        { name: "mirv", count: 1, weight: 0.05 },
    ],
    tier_ammo: [
        { name: "9mm", count: 60, weight: 8 },
        { name: "762mm", count: 60, weight: 8 },
        { name: "556mm", count: 60, weight: 8 },
        { name: "12gauge", count: 10, weight: 10 },
    ],
    tier_ammo_crate: [
        { name: "9mm", count: 60, weight: 5 },
        { name: "762mm", count: 60, weight: 5 },
        { name: "556mm", count: 60, weight: 5 },
        { name: "12gauge", count: 10, weight: 7 },
        { name: "50AE", count: 21, weight: 1 },
        { name: "308sub", count: 5, weight: 1 },
        { name: "flare", count: 1, weight: 1 },
    ],
    tier_vending_soda: [
        { name: "soda", count: 1, weight: 6 },
        { name: "tier_ammo", count: 1, weight: 3 },
    ],
    tier_sv98: [{ name: "sv98", count: 1, weight: 1.5 }],
    tier_scopes_sniper: [
        { name: "4xscope", count: 1, weight: 0.2 },
        { name: "8xscope", count: 1, weight: 0 },
        { name: "15xscope", count: 1, weight: 0 },
    ],
    tier_mansion_floor: [{ name: "outfitCasanova", count: 1, weight: 1 }],
    tier_vault_floor: [{ name: "outfitJester", count: 1, weight: 1 }],
    tier_police_floor: [{ name: "outfitPrisoner", count: 1, weight: 1 }],
    tier_chrys_01: [{ name: "outfitImperial", count: 1, weight: 1 }],
    tier_chrys_02: [{ name: "katana", count: 1, weight: 1 }],
    tier_chrys_03: [
        { name: "helmet04_medic", count: 1, weight: 1 },
        { name: "2xscope", count: 1, weight: 1 },
        { name: "4xscope", count: 1, weight: 0.3 },
        { name: "8xscope", count: 1, weight: 0 },
        { name: "15xscope", count: 1, weight: 0 },
    ],
    tier_chrys_case: [{ name: "", count: 1, weight: 1 }],
    tier_chrys_chest: [
        { name: "", count: 1, weight: 1 },
        { name: "katana", count: 1, weight: 1 },
        { name: "katana_rusted", count: 1, weight: 1 },
        { name: "katana_orchid", count: 1, weight: 1 },
    ],
    tier_eye_02: [{ name: "stonehammer", count: 1, weight: 1 }],
    tier_eye_block: [
        { name: "m9", count: 1, weight: 1 },
        { name: "ots38_dual", count: 1, weight: 1 },
        { name: "flare_gun", count: 1, weight: 1 },
        { name: "colt45", count: 1, weight: 1 },
        { name: "45acp", count: 1, weight: 1 },
        { name: "painkiller", count: 1, weight: 1 },
        { name: "m4a1", count: 1, weight: 0.4 },
        { name: "m249", count: 1, weight: 0.05 },
        { name: "awc", count: 1, weight: 0.05 },
        { name: "pkp", count: 1, weight: 0.05 },
    ],
    tier_sledgehammer: [{ name: "sledgehammer", count: 1, weight: 1 }],
    tier_chest_04: [
        { name: "p30l", count: 1, weight: 1 },
        { name: "p30l_dual", count: 1, weight: 0.05 },
    ],
    // tier_medichelmet: [{ name: "helmet04_medic", count: 1, weight: 1 }],
    // tier_buglerhelmet: [{ name: "helmet03_bugler", count: 1, weight: 1 }],
    // tier_grenadierhelmet: [{ name: "helmet03_grenadier", count: 1, weight: 1 }],

    tier_woodaxe: [{ name: "woodaxe", count: 1, weight: 1 }],
    tier_club_melee: [{ name: "machete_taiga", count: 1, weight: 1 }],
    tier_guns: [
        { name: "famas", count: 1, weight: 2 },
        { name: "hk416", count: 1, weight: 8 },
        { name: "mk12", count: 1, weight: 0.6 },
        { name: "pkp", count: 1, weight: 0.0015 },
        { name: "m249", count: 1, weight: 0.006 },
        { name: "ak47", count: 1, weight: 8 },
        { name: "scar", count: 1, weight: 2 },
        { name: "dp28", count: 1, weight: 1.5 },
        { name: "mosin", count: 1, weight: 0.2 },
        { name: "m39", count: 1, weight: 0.5 },
        { name: "vss", count: 1, weight: 0.1 },
        { name: "mp5", count: 1, weight: 6 },
        { name: "mac10", count: 1, weight: 6 },
        { name: "ump9", count: 1, weight: 3 },
        { name: "m870", count: 1, weight: 12 },
        { name: "m1100", count: 1, weight: 0 },
        { name: "mp220", count: 1, weight: 4 },
        { name: "saiga", count: 1, weight: 0.1 },
        { name: "ot38", count: 1, weight: 3 },
        { name: "m9", count: 1, weight: 5 },
        { name: "m93r", count: 1, weight: 4 },
        { name: "glock", count: 1, weight: 4 },
        { name: "deagle", count: 1, weight: 0.5 },
        { name: "vector", count: 1, weight: 1 },
        { name: "sv98", count: 1, weight: 0.03 },
        { name: "spas12", count: 1, weight: 2 },
        { name: "qbb97", count: 1, weight: 0.5 },
        { name: "flare_gun", count: 1, weight: 0.6 },
        { name: "flare_gun_dual", count: 1, weight: 0.00017 },
        { name: "groza", count: 1, weight: 2 },
        { name: "scout_elite", count: 1, weight: 0.1 },
        { name: "blr", count: 1, weight: 0.5 },
        { name: "scorpion", count: 1, weight: 0.5 },
        { name: "m4a1", count: 1, weight: 0.5 },
    ],
    tier_police: [
        { name: "scar", count: 1, weight: 2 },
        { name: "helmet03", count: 1, weight: 1 },
        { name: "chest03", count: 1, weight: 1 },
        { name: "backpack03", count: 1, weight: 1 },
    ],
    tier_ring_case: [
        { name: "grozas", count: 1, weight: 5 },
        { name: "ots38_dual", count: 1, weight: 0.1 },
        { name: "m9", count: 1, weight: 0 },
        { name: "pkp", count: 1, weight: 0.15 },
        { name: "blr", count: 1, weight: 0.3 },
    ],
    tier_chest: [
        { name: "hk416", count: 1, weight: 2 },
        { name: "ak47", count: 1, weight: 13 },
        { name: "groza", count: 1, weight: 3 },
        { name: "famas", count: 1, weight: 1 },
        { name: "mk12", count: 1, weight: 4 },
        { name: "mp220", count: 1, weight: 10 },
        { name: "spas12", count: 1, weight: 9 },
        { name: "dp28", count: 1, weight: 1 },
        { name: "mosin", count: 1, weight: 2 },
        { name: "m39", count: 1, weight: 0.1 },
        { name: "scar", count: 1, weight: 2 },
        { name: "saiga", count: 1, weight: 2 },
        { name: "deagle", count: 1, weight: 0.7 },
        { name: "sv98", count: 1, weight: 0.2 },
        { name: "vector", count: 1, weight: 1 },
        { name: "m249", count: 1, weight: 1 },
        { name: "pkp", count: 1, weight: 0.3 },
        { name: "helmet01", count: 1, weight: 0 },
        { name: "helmet02", count: 1, weight: 0 },
        { name: "helmet03", count: 1, weight: 0 },
        { name: "4xscope", count: 1, weight: 0 },
        { name: "8xscope", count: 1, weight: 0 },
        { name: "blr", count: 1, weight: 2 },
        { name: "scorpion", count: 1, weight: 0.5 },
        { name: "m4a1", count: 1, weight: 0.5 },
    ],
    tier_conch: [
        { name: "outfitAqua", count: 1, weight: 1 },
        { name: "outfitCoral", count: 1, weight: 1 },
    ],
    tier_noir_outfit: [{ name: "outfitNoir", count: 1, weight: 1 }],
    tier_khaki_outfit: [{ name: "outfitKhaki", count: 1, weight: 1 }],
    tier_pirate_melee: [{ name: "hook", count: 1, weight: 1 }],
    tier_hatchet: [
        { name: "vector", count: 1, weight: 5 },
        { name: "hk416", count: 1, weight: 2 },
        { name: "mp220", count: 1, weight: 1 },
        { name: "m249", count: 1, weight: 0.1 },
        { name: "pkp", count: 1, weight: 0.05 },
        { name: "m9", count: 1, weight: 0.01 },
    ],
    tier_lmgs: [
        { name: "bar", count: 1, weight: 5 },
        { name: "dp28", count: 1, weight: 5 },
        { name: "qbb97", count: 1, weight: 0.5 },
        { name: "m249", count: 1, weight: 0.01 },
        { name: "pkp", count: 1, weight: 0.01 },
    ],
    tier_shotguns: [
        { name: "m1100", count: 1, weight: 5 },
        { name: "m870", count: 1, weight: 5 },
        { name: "mp220", count: 1, weight: 1 },
        { name: "spas12", count: 1, weight: 1 },
        { name: "saiga", count: 1, weight: 0.1 },
        { name: "usas", count: 1, weight: 0 },
    ],
    tier_hatchet_melee: [
        { name: "fireaxe", count: 1, weight: 5 },
        { name: "katana", count: 1, weight: 1 },
        { name: "katana_rusted", count: 1, weight: 1 },
        { name: "katana_orchid", count: 1, weight: 0.1 },
        { name: "stonehammer", count: 1, weight: 0.1 },
    ],
    tier_pavilion: [
        { name: "dp28", count: 1, weight: 5 },
        { name: "bar", count: 1, weight: 5 },
        { name: "naginata", count: 1, weight: 1 },
        { name: "m9", count: 1, weight: 1 },
        { name: "pkp", count: 1, weight: 1 },
    ],
    tier_forest_helmet: [{ name: "helmet03_forest", count: 1, weight: 1 }],
    tier_imperial_outfit: [{ name: "outfitImperial", count: 1, weight: 1 }],
    tier_pineapple_outfit: [{ name: "outfitPineapple", count: 1, weight: 1 }],
    tier_tarkhany_outfit: [{ name: "outfitTarkhany", count: 1, weight: 1 }],
    tier_spetsnaz_outfit: [{ name: "outfitSpetsnaz", count: 1, weight: 1 }],
    tier_lumber_outfit: [{ name: "outfitLumber", count: 1, weight: 1 }],
    tier_verde_outfit: [{ name: "outfitVerde", count: 1, weight: 1 }],

    tier_airdrop_uncommon: [
        { name: "mk12", count: 1, weight: 2.5 },
        { name: "scar", count: 1, weight: 0.75 },
        { name: "vector", count: 1, weight: 0.75 },
        { name: "blr", count: 1, weight: 2.5 },
        { name: "mosin", count: 1, weight: 1 },
        { name: "saiga", count: 1, weight: 2 },
        { name: "deagle", count: 1, weight: 1 },
        { name: "sv98", count: 1, weight: 0.05 },
        { name: "qbb97", count: 1, weight: 1.5 },
        { name: "flare_gun", count: 1, weight: 0.1 },
        { name: "scout_elite", count: 1, weight: 1.5 },
    ],
    tier_airdrop_rare: [
        { name: "garand", count: 1, weight: 6 },
        { name: "mosin", count: 1, weight: 3 },
        { name: "pkp", count: 1, weight: 3 },
        { name: "m249", count: 1, weight: 0.1 },
        { name: "m4a1", count: 1, weight: 4 },
        { name: "scorpion", count: 1, weight: 5 },
        // { name: "ots38_dual", count: 1, weight: 4.5 },
    ],
    tier_airdrop_ammo: [
        { name: "45acp", count: 30, weight: 3 },
        { name: "762mm", count: 30, weight: 3 },
        { name: "556mm", count: 30, weight: 3 },
        { name: "12gauge", count: 5, weight: 3 },
    ],
    tier_airdrop_outfits: [
        { name: "", count: 1, weight: 20 },
        { name: "outfitMeteor", count: 1, weight: 5 },
        { name: "outfitHeaven", count: 1, weight: 1 },
        {
            name: "outfitGhillie",
            count: 0,
            weight: 0,
        },
    ],
    tier_airdrop_throwables: [
        { name: "frag", count: 2, weight: 1 },
        { name: "mirv", count: 2, weight: 0.5 },
    ],
    tier_airdrop_melee: [
        { name: "", count: 1, weight: 19 },
        { name: "katana", count: 1, weight: 7 },
        { name: "pan", count: 1, weight: 0 },
    ],
    tier_airdrop_armor: [
        { name: "helmet03", count: 1, weight: 1 },
        { name: "chest03", count: 1, weight: 1 },
        { name: "chest02", count: 1, weight: 2 },
        { name: "helmet02", count: 1, weight: 2 },
    ],
    tier_airdrop_scopes: [
        { name: "4xscope", count: 1, weight: 3 },
        { name: "8xscope", count: 1, weight: 0 },
        { name: "15xscope", count: 1, weight: 0 },
    ],

    tier_perks: [
       // { name: "", count: 1, weight: 20 },
        { name: "splinter", count: 1, weight: 11.428 },
        { name: "scavenger", count: 1, weight: 11.428 },
        { name: "endless_ammo", count: 1, weight: 11.428 },
        { name: "takedown", count: 1, weight: 11.428 },
        { name: "field_medic", count: 1, weight: 7 },
        { name: "bonus_assault", count: 1, weight: 11.428 },
        { name: "firepower", count: 1, weight: 11.428 },
    ],
};

export default class SurvivReloadedPlugin extends GamePlugin {
    protected override initListeners(): void {
        this.on("gameCreated", (game) => {
            game.map.mapDef.lootTable = lootTable;
            if (game.teamMode !== 4 || true){
                game.map.mapDef.gameConfig.roles = undefined;
            }
        });

        this.on("playerGotKillKnockOrRevived", (player) => {
            if (player.game.teamMode !== 1) return;
            player.health = 100;
            player.boost = 100;
            if (player.weapons[0]){
                player.weapons[0].ammo = (GameObjectDefs[player.weapons[0].type] as GunDef).maxClip;
            }
            if (player.weapons[1]){
                player.weapons[1].ammo = (GameObjectDefs[player.weapons[1].type] as GunDef).maxClip;
            }
            player.inventory["frag"] = 3;
        });

        this.on("playerJoin", (player) => {
             switch (player.game.teamMode){
                case 4:
                    player.weapons[3].type = "frag";
                    player.inventory["frag"] = 2;
                    player.inventory["bandage"] = 5;
                    break;
                case 2:
                    player.weapons[3].type = "frag";
                    player.inventory["frag"] = 3;
                    player.inventory["bandage"] = 10;
                    //player.inventory["soda"] = 100;
                    player.inventory["healthkit"] = 1;
                    player.backpack = "backpack02";
                    player.chest = "chest02";
                    player.helmet = "helmet02";
                    player.inventory["4xscope"] = 1;
                    player.scope = "4xscope";
                    player.boost = 100;
                    player.weapons[0].type = "m870";
                    player.weapons[0].ammo = 5;
                    //player.weapons[1].type = "mosin";
                    //player.weapons[1].ammo = 5;
                    //player.addPerk("endless_ammo", false);
                    player.inventory["12gauge"] = 10;
                    const first = player.group && player.group.players.length > 0 && player.group.players[0] === player
                    player.weapons[1].type = first ? "ak47" : "hk416";
                    player.weapons[1].ammo = 30;
                    player.inventory[first ? "762mm" : "556mm"] = 60;

                    break;
                case 1:
                    player.weapons[2].type = "woodaxe";
                    player.weapons[3].type = "frag";
                    player.inventory["bandage"] = 99;
                    player.inventory["soda"] = 99;
                    player.inventory["painkiller"] = 99;
                    player.inventory["healthkit"] = 15;
                    player.inventory["frag"] = 4;
                    player.addPerk("endless_ammo", false);
                    player.addPerk("self_revive", false);

                    player.backpack = "backpack02";
                    player.chest = "chest03";
                    player.helmet = "helmet03";
                    player.inventory["4xscope"] = 1;
                    player.scope = "4xscope";
                    player.boost = 100;

                    player.weapons[0].type = "spas12";
                    player.weapons[0].ammo = 6;
                    player.weapons[1].type = "mosin";
                    player.weapons[1].ammo = 4;

                    const floorguns = ["garand", "saiga", "famas", "m870", "scar", "hk416", "blr", "deagle", "mp220", "mk12"];
                    for (const g of floorguns){
                        player.game.lootBarn.addLootWithoutAmmo(g, player.pos, player.layer, 1);
                    }
                }
            //player.scope = "8xscope";

            // player.weapons[0].type = "m870";
            // player.weapons[0].ammo = 5;
            // player.promoteToRole("leader");
            // player.promoteToRole("lieutenant");
            // player.promoteToRole("marksman");
            // setTimeout(() => {
            //     player.promoteToRole("last_man");
            // }, 5_000);
            // player.promoteToRole("last_man");
            // player.promoteToRole("grenadier");
            // player.promoteToRole("recon");
            // if (player.name == "a") {
            //     player.promoteToRole("leader");
            // }
            // player.addPerk("takedown");
            // player.promoteToRole("medic");
            // player.promoteToRole("bugler");
            // player.game.lootBarn.addLoot("spas12", player.pos, player.layer, 1);
            // setTimeout(() => {
            //     player.promoteToRole("recon");
            // }, 5_000);
        });

        this.on("playerKill", (data) => {
            if (data.source?.__type === ObjectType.Player) {
                const killer = data.source;

                if (killer.group) {
                    const nAliveTeammates = killer.group.getAliveTeammates(killer).length;
                    const multiplier = nAliveTeammates + 1;
                    killer.health += 25 - multiplier * 5;
                    killer.boost += 25 - multiplier * 5;
                } else {
                    killer.health += 20;
                    killer.boost += 25;
                }

                for (let i = 0; i < 2; i++) {
                    const gun = killer.weapons[i];
                    if (!gun.type) continue;
                    const gunDef = GameObjectDefs[gun.type] as GunDef;
                    if (gun.ammo < Math.ceil(gunDef.maxClip / 2)) {
                        gun.ammo = Math.ceil(gunDef.maxClip / 2);
                    }
                }
            }
        });
    }
}