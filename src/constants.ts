export const CANVAS_WIDTH = 372;
export const CANVAS_HEIGHT = 320;

export const ENEMY_TANK_IMAGE_SIZE = 22;
export const PLAYER_TANK_IMAGE_SIZE = 20;
export const FINDING_IMAGE_SIZE = 24;
export const SPAWN_ANIMATION_TIME = 2;
export const ENEMY_TANKS_SPAWN_INTERVAL = 5;
export const PLAYER_TANK_RESPAWN_TIME = 2;
export const BASIC_RELOAD_TIME = 0.5;

export const SLOW_TANK_SPEED = 70;
export const MEDIUM_TANK_SPEED = 85;
export const FAST_TANK_SPEED = 100;

export const BASIC_BULLET_SPEED = 140;
export const FAST_BULLET_SPEED = 160;

export const INDESTRUCTIBLE_ANIMATION_SPEED = 0.05;
export const SPAWN_ANIMATION_SPEED = 0.08;
export const EXPLOSION_ANIMATION_SPEED = 0.08;

export const VALUE_SHOW_TIME = 1;
export const VALUE_SHOW_DELAY = 0.1;

export const FINDING_SHOW_TIME = 7;
export const FINDING_BLINKING_START_TIME = FINDING_SHOW_TIME * 0.8;
export const FINDING_BLINKING_INTERVAL = 0.2;

export const PLAYER_TANKS_SETTINGS = {
  0: {
    speed: SLOW_TANK_SPEED,
    reloadTime: BASIC_RELOAD_TIME,
    bulletSpeed: BASIC_BULLET_SPEED,
    concreteDestroying: false,
    doubleBullet: false,
  },
  1: {
    speed: MEDIUM_TANK_SPEED,
    reloadTime: BASIC_RELOAD_TIME,
    bulletSpeed: BASIC_BULLET_SPEED,
    concreteDestroying: false,
    doubleBullet: false,
  },
  2: {
    speed: MEDIUM_TANK_SPEED,
    reloadTime: BASIC_RELOAD_TIME,
    bulletSpeed: BASIC_BULLET_SPEED,
    concreteDestroying: false,
    doubleBullet: true,
  },
  3: {
    speed: MEDIUM_TANK_SPEED,
    reloadTime: BASIC_RELOAD_TIME,
    bulletSpeed: FAST_BULLET_SPEED,
    concreteDestroying: true,
    doubleBullet: true,
  },
};

export const ENEMY_TANKS_SETTINGS = {
  Small: {
    speed: SLOW_TANK_SPEED,
    value: 100,
    bulletSpeed: BASIC_BULLET_SPEED,
  },
  Fast: {
    speed: FAST_TANK_SPEED,
    value: 200,
    bulletSpeed: BASIC_BULLET_SPEED,
  },
  Power: {
    speed: SLOW_TANK_SPEED,
    value: 300,
    bulletSpeed: FAST_BULLET_SPEED,
  },
  Armor: {
    speed: SLOW_TANK_SPEED,
    value: 400,
    bulletSpeed: BASIC_BULLET_SPEED,
  },
};

export const GAME_STATUS = {
  MENU: "MainMenu",
  READY: "Ready",
  CURTIN: "ShowCurtin",
  STARTED: "Started",
  GAME_OVER: "GameOver",
};
