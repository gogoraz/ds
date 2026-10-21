'use strict';
// Central dictionaries. Legacy text stays stable in saved item names; rendering resolves it.
const I18N_ROWS=[
 [
  "legacy.0",
  "TAP TO BEGIN",
  "ДОКОСНИ ЗА НАЧАЛО"
 ],
 [
  "legacy.1",
  "Enter the darkness",
  "Навлез в мрака"
 ],
 [
  "legacy.2",
  "The Crypt",
  "Криптата"
 ],
 [
  "legacy.3",
  "Heroes",
  "Герои"
 ],
 [
  "legacy.4",
  "Chronicles",
  "Хроники"
 ],
 [
  "legacy.5",
  "Settings",
  "Настройки"
 ],
 [
  "legacy.6",
  "Back",
  "Назад"
 ],
 [
  "legacy.7",
  "Main menu",
  "Главно меню"
 ],
 [
  "legacy.8",
  "CHOOSE YOUR SOUL",
  "ИЗБЕРИ СВОЯ ГЕРОЙ"
 ],
 [
  "legacy.9",
  "CHOOSE YOUR DESCENT",
  "ИЗБЕРИ СВОЯ ПЪТ"
 ],
 [
  "legacy.10",
  "Begin the hunt",
  "Започни лова"
 ],
 [
  "legacy.11",
  "Locked",
  "Заключено"
 ],
 [
  "legacy.12",
  "Level",
  "Ниво"
 ],
 [
  "legacy.13",
  "A SOUL REFORGED",
  "ПРЕРОДЕНА ДУША"
 ],
 [
  "legacy.14",
  "Choose one blessing",
  "Избери една благословия"
 ],
 [
  "legacy.15",
  "Reroll",
  "Нови предложения"
 ],
 [
  "legacy.16",
  "Banish",
  "Прогони"
 ],
 [
  "legacy.17",
  "Tap a card to banish it",
  "Докосни карта, за да я прогониш"
 ],
 [
  "legacy.18",
  "Continue",
  "Продължи"
 ],
 [
  "legacy.19",
  "SANCTUARY",
  "УБЕЖИЩЕ"
 ],
 [
  "legacy.20",
  "Return to battle",
  "Обратно в битката"
 ],
 [
  "legacy.21",
  "End this run",
  "Приключи опита"
 ],
 [
  "legacy.22",
  "Your run will end and earned gold will be saved.",
  "Опитът ще приключи. Спечеленото злато се запазва."
 ],
 [
  "legacy.23",
  "End run",
  "Приключи"
 ],
 [
  "legacy.24",
  "Cancel",
  "Отказ"
 ],
 [
  "legacy.25",
  "YOU HAVE DIED",
  "ТИ ЗАГИНА"
 ],
 [
  "legacy.26",
  "DARKNESS DEFEATED",
  "МРАКЪТ Е ПОБЕДЕН"
 ],
 [
  "legacy.27",
  "Hunt again",
  "Ловувай отново"
 ],
 [
  "legacy.28",
  "Gold",
  "Злато"
 ],
 [
  "legacy.29",
  "Slain",
  "Убити"
 ],
 [
  "legacy.30",
  "Survived",
  "Оцеляване"
 ],
 [
  "legacy.31",
  "Life",
  "Живот"
 ],
 [
  "legacy.32",
  "Souls",
  "Души"
 ],
 [
  "legacy.33",
  "SKILL",
  "УМЕНИЕ"
 ],
 [
  "legacy.34",
  "DASH",
  "УКЛОН"
 ],
 [
  "legacy.35",
  "Ready",
  "Готово"
 ],
 [
  "legacy.36",
  "Upgrade",
  "Подобри"
 ],
 [
  "legacy.37",
  "MAX",
  "МАКС"
 ],
 [
  "legacy.38",
  "Owned",
  "Притежаваш"
 ],
 [
  "legacy.39",
  "Cost",
  "Цена"
 ],
 [
  "legacy.40",
  "ANCIENT TREASURE",
  "ДРЕВНО СЪКРОВИЩЕ"
 ],
 [
  "legacy.41",
  "Claim the relics",
  "Прибери реликвите"
 ],
 [
  "legacy.42",
  "EVOLVED",
  "ЕВОЛЮЦИЯ"
 ],
 [
  "legacy.43",
  "NEW",
  "НОВО"
 ],
 [
  "legacy.44",
  "COMMON",
  "ОБИКНОВЕНО"
 ],
 [
  "legacy.45",
  "MAGIC",
  "МАГИЧЕСКО"
 ],
 [
  "legacy.46",
  "RARE",
  "РЯДКО"
 ],
 [
  "legacy.47",
  "LEGENDARY",
  "ЛЕГЕНДАРНО"
 ],
 [
  "legacy.48",
  "Music",
  "Музика"
 ],
 [
  "legacy.49",
  "Effects",
  "Ефекти"
 ],
 [
  "legacy.50",
  "Mute",
  "Без звук"
 ],
 [
  "legacy.51",
  "Graphics",
  "Графика"
 ],
 [
  "legacy.52",
  "Screen shake",
  "Трептене на екрана"
 ],
 [
  "legacy.53",
  "Vibration",
  "Вибрация"
 ],
 [
  "legacy.54",
  "Damage numbers",
  "Числа за щетите"
 ],
 [
  "legacy.55",
  "Joystick size",
  "Размер на джойстика"
 ],
 [
  "legacy.56",
  "Joystick opacity",
  "Прозрачност"
 ],
 [
  "legacy.57",
  "Language",
  "Език"
 ],
 [
  "legacy.58",
  "Export save",
  "Изнеси запис"
 ],
 [
  "legacy.59",
  "Import save",
  "Зареди запис"
 ],
 [
  "legacy.60",
  "Save text ready below. Copy it somewhere safe.",
  "Записът е в полето. Копирай го на сигурно място."
 ],
 [
  "legacy.61",
  "Save imported",
  "Записът е зареден"
 ],
 [
  "legacy.62",
  "Invalid save text",
  "Невалиден запис"
 ],
 [
  "legacy.63",
  "Saving unavailable here. Export your save before closing.",
  "Запазването тук е недостъпно. Изнеси записа преди затваряне."
 ],
 [
  "legacy.64",
  "Drag on the left to move. Attacks fire automatically. Use the skill and dash buttons on the right.",
  "Плъзгай вляво за движение. Атаките са автоматични. Вдясно са умението и уклонът."
 ],
 [
  "legacy.65",
  "A DARK PRESENCE AWAKENS",
  "МРАЧНО ПРИСЪСТВИЕ СЕ ПРОБУЖДА"
 ],
 [
  "legacy.66",
  "Soulstone claimed",
  "Получи камък на душите"
 ],
 [
  "legacy.67",
  "A SOUL REFUSES DEATH",
  "ДУШАТА ОТКАЗВА ДА УМРЕ"
 ],
 [
  "legacy.68",
  "Cursed Graveyard",
  "Прокълнатото гробище"
 ],
 [
  "legacy.69",
  "The Catacombs",
  "Катакомбите"
 ],
 [
  "legacy.70",
  "Hellfire Wastes",
  "Адските пустоши"
 ],
 [
  "legacy.71",
  "Defeat the previous stage",
  "Победи в предишната зона"
 ],
 [
  "legacy.72",
  "Best",
  "Рекорд"
 ],
 [
  "legacy.73",
  "Curse",
  "Проклятие"
 ],
 [
  "legacy.74",
  "Total kills",
  "Общо убити"
 ],
 [
  "legacy.75",
  "Soulstones",
  "Камъни на душите"
 ],
 [
  "legacy.76",
  "Revives",
  "Съживявания"
 ],
 [
  "legacy.77",
  "Not enough gold",
  "Недостатъчно злато"
 ],
 [
  "legacy.78",
  "Restore life",
  "Възстанови живот"
 ],
 [
  "legacy.79",
  "Purse of gold",
  "Кесия злато"
 ],
 [
  "legacy.80",
  "Your power knows no bounds",
  "Силата ти няма предел"
 ],
 [
  "legacy.81",
  "Relics strengthen your weapons and blessings.",
  "Реликвите подсилват оръжията и благословиите ти."
 ],
 [
  "legacy.82",
  "Fullscreen",
  "Цял екран"
 ],
 [
  "legacy.83",
  "Move left • skill right • automatic attacks",
  "Движение вляво • умение вдясно • автоматични атаки"
 ],
 [
  "legacy.84",
  "ONE FILE · OFFLINE · TOUCH FIRST",
  "ЕДИН ФАЙЛ · ОФЛАЙН · ТЪЧ УПРАВЛЕНИЕ"
 ],
 [
  "legacy.85",
  "An original gothic survival game",
  "Оригинална готическа игра за оцеляване"
 ],
 [
  "legacy.86",
  "New soul or realm unlocked",
  "Отключен е нов герой или свят"
 ],
 [
  "legacy.87",
  "BLESSING",
  "БЛАГОСЛОВИЯ"
 ],
 [
  "legacy.88",
  "WEAPON",
  "ОРЪЖИЕ"
 ],
 [
  "legacy.89",
  "Tier",
  "Ранг"
 ],
 [
  "legacy.90",
  "minutes",
  "минути"
 ],
 [
  "legacy.91",
  "No connection required. Export saves before moving the file.",
  "Не изисква връзка. Изнасяй записа, преди да местиш файла."
 ],
 [
  "legacy.92",
  "Rank VIII + matching blessing + treasure chest",
  "Ранг VIII + съответна благословия + сандък"
 ],
 [
  "legacy.93",
  "DANGER",
  "ОПАСНОСТ"
 ],
 [
  "legacy.94",
  "THE REAPER HAS COME",
  "ЖЪТВАРЯТ ДОЙДЕ"
 ],
 [
  "legacy.95",
  "The gates are open",
  "Портите са отворени"
 ],
 [
  "legacy.96",
  "New run",
  "Нов опит"
 ],
 [
  "legacy.97",
  "without reviving",
  "без съживяване"
 ],
 [
  "legacy.98",
  "Reach",
  "Достигни"
 ],
 [
  "legacy.99",
  "Slay",
  "Убий"
 ],
 [
  "legacy.100",
  "Defeat",
  "Победи"
 ],
 [
  "legacy.101",
  "Enemies",
  "Врагове"
 ],
 [
  "legacy.102",
  "The final gate opens at 12:00. Defeat the Lord of Ruin.",
  "Последната порта се отваря в 12:00. Победи Владетеля на разрухата."
 ],
 [
  "legacy.103",
  "Reset",
  "Нулирай"
 ],
 [
  "legacy.104",
  "Vitality",
  "Жизненост"
 ],
 [
  "legacy.105",
  "Might",
  "Мощ"
 ],
 [
  "legacy.106",
  "Armor",
  "Броня"
 ],
 [
  "legacy.107",
  "Swiftness",
  "Бързина"
 ],
 [
  "legacy.108",
  "Growth",
  "Развитие"
 ],
 [
  "legacy.109",
  "Greed",
  "Алчност"
 ],
 [
  "legacy.110",
  "Luck",
  "Късмет"
 ],
 [
  "legacy.111",
  "Magnet",
  "Привличане"
 ],
 [
  "legacy.112",
  "Revival",
  "Възкресение"
 ],
 [
  "legacy.113",
  "Rerolls",
  "Нови избори"
 ],
 [
  "legacy.114",
  "Banishes",
  "Прогонвания"
 ],
 [
  "legacy.115",
  "Projectiles",
  "Снаряди"
 ],
 [
  "legacy.116",
  "Haste",
  "Ускорение"
 ],
 [
  "legacy.117",
  "Rusted Sword",
  "Ръждив меч"
 ],
 [
  "legacy.118",
  "Blade of Ruin",
  "Острие на разрухата"
 ],
 [
  "legacy.119",
  "Hunter’s Bow",
  "Ловен лък"
 ],
 [
  "legacy.120",
  "Storm Volley",
  "Бурен залп"
 ],
 [
  "legacy.121",
  "Fireball Staff",
  "Огнен жезъл"
 ],
 [
  "legacy.122",
  "Meteor Rain",
  "Метеоритен дъжд"
 ],
 [
  "legacy.123",
  "Bone Orbit",
  "Костен кръг"
 ],
 [
  "legacy.124",
  "Death Halo",
  "Ореол на смъртта"
 ],
 [
  "legacy.125",
  "Holy Smite",
  "Свещен удар"
 ],
 [
  "legacy.126",
  "Wrath of Heaven",
  "Небесен гняв"
 ],
 [
  "legacy.127",
  "Throwing Axes",
  "Хвърлящи брадви"
 ],
 [
  "legacy.128",
  "Executioner’s Rain",
  "Дъжд на палача"
 ],
 [
  "legacy.129",
  "Frost Nova",
  "Ледена нова"
 ],
 [
  "legacy.130",
  "Absolute Zero",
  "Абсолютна нула"
 ],
 [
  "legacy.131",
  "Poison Flask",
  "Отровна колба"
 ],
 [
  "legacy.132",
  "Plague Cloud",
  "Чумен облак"
 ],
 [
  "legacy.133",
  "Chain Whip",
  "Верижен камшик"
 ],
 [
  "legacy.134",
  "Vampire’s Lash",
  "Вампирски бич"
 ],
 [
  "legacy.135",
  "Spectral Daggers",
  "Призрачни ками"
 ],
 [
  "legacy.136",
  "Phantom Barrage",
  "Призрачен бараж"
 ],
 [
  "legacy.137",
  "Ward Totem",
  "Тотем пазител"
 ],
 [
  "legacy.138",
  "Idol of Judgement",
  "Идол на възмездието"
 ],
 [
  "legacy.139",
  "Blood Scythe",
  "Кървава коса"
 ],
 [
  "legacy.140",
  "Reaper’s Harvest",
  "Жътва на смъртта"
 ],
 [
  "legacy.141",
  "Automatic strikes. Rank VIII can evolve.",
  "Автоматични удари. Ранг VIII може да еволюира."
 ],
 [
  "legacy.142",
  "Piercing arrows seek the nearest foe.",
  "Пробивни стрели към най-близкия враг."
 ],
 [
  "legacy.143",
  "Explosive fireballs scorch clustered enemies.",
  "Експлозивни кълба изгарят групи врагове."
 ],
 [
  "legacy.144",
  "Skulls circle the hero, damaging on contact.",
  "Черепи обикалят героя и нанасят щети."
 ],
 [
  "legacy.145",
  "Holy lightning chains between enemies.",
  "Свещена мълния прескача между враговете."
 ],
 [
  "legacy.146",
  "Heavy axes arc through multiple enemies.",
  "Тежки брадви преминават през враговете."
 ],
 [
  "legacy.147",
  "An icy ring damages and slows enemies.",
  "Леден кръг наранява и забавя враговете."
 ],
 [
  "legacy.148",
  "Poison lingers on the ground.",
  "Отрова остава върху земята."
 ],
 [
  "legacy.149",
  "Alternating lashes reach through crowds.",
  "Редуващи се удари достигат през тълпата."
 ],
 [
  "legacy.150",
  "Fast spectral blades follow your movement.",
  "Бързи призрачни остриета следват движението."
 ],
 [
  "legacy.151",
  "Dropped wards pulse with sacred power.",
  "Поставени тотеми пулсират със свещена сила."
 ],
 [
  "legacy.152",
  "A sweeping scythe steals life on kills.",
  "Косата поразява в кръг и отнема живот."
 ],
 [
  "legacy.153",
  "Steel remembers every soul.",
  "Стоманата помни всяка душа."
 ],
 [
  "legacy.154",
  "From silence comes the last breath.",
  "От тишината идва последният дъх."
 ],
 [
  "legacy.155",
  "Even the dead fear the flame.",
  "Дори мъртвите се боят от пламъка."
 ],
 [
  "legacy.156",
  "Whetstone",
  "Точило"
 ],
 [
  "legacy.157",
  "+10% damage",
  "+10% щети"
 ],
 [
  "legacy.158",
  "Quiver of Wind",
  "Колчан на вятъра"
 ],
 [
  "legacy.159",
  "+12% projectile speed",
  "+12% скорост на снарядите"
 ],
 [
  "legacy.160",
  "Ember Heart",
  "Жарко сърце"
 ],
 [
  "legacy.161",
  "+10% attack area",
  "+10% обхват"
 ],
 [
  "legacy.162",
  "Grave Dust",
  "Гробна пепел"
 ],
 [
  "legacy.163",
  "+12% duration",
  "+12% продължителност"
 ],
 [
  "legacy.164",
  "Sacred Oil",
  "Свещено масло"
 ],
 [
  "legacy.165",
  "−6% cooldown",
  "−6% време за презареждане"
 ],
 [
  "legacy.166",
  "Bloodlust Band",
  "Пръстен на кръвожадността"
 ],
 [
  "legacy.167",
  "+6% critical chance",
  "+6% критичен шанс"
 ],
 [
  "legacy.168",
  "Frozen Heart",
  "Ледено сърце"
 ],
 [
  "legacy.169",
  "+1 armor",
  "+1 броня"
 ],
 [
  "legacy.170",
  "Rotten Herb",
  "Гнила билка"
 ],
 [
  "legacy.171",
  "+0.35 life per second",
  "+0.35 живот в секунда"
 ],
 [
  "legacy.172",
  "Crimson Vial",
  "Алена ампула"
 ],
 [
  "legacy.173",
  "+15% maximum life",
  "+15% максимален живот"
 ],
 [
  "legacy.174",
  "Shadow Cloak",
  "Сенчесто наметало"
 ],
 [
  "legacy.175",
  "+8% movement speed",
  "+8% скорост на движение"
 ],
 [
  "legacy.176",
  "Idol Fragment",
  "Отломка от идол"
 ],
 [
  "legacy.177",
  "+1 projectile",
  "+1 снаряд"
 ],
 [
  "legacy.178",
  "Soul Jar",
  "Делва за души"
 ],
 [
  "legacy.179",
  "+10% experience",
  "+10% опит"
 ],
 [
  "legacy.180",
  "Lucky Coin",
  "Монета на късмета"
 ],
 [
  "legacy.181",
  "+10% luck",
  "+10% късмет"
 ],
 [
  "legacy.182",
  "Magnet Stone",
  "Магнитен камък"
 ],
 [
  "legacy.183",
  "+25 soul attraction",
  "+25 привличане на души"
 ],
 [
  "legacy.184",
  "Gold Ring",
  "Златен пръстен"
 ],
 [
  "legacy.185",
  "+12% gold",
  "+12% злато"
 ],
 [
  "legacy.186",
  "Cursed Skull",
  "Прокълнат череп"
 ],
 [
  "legacy.187",
  "+10% enemies and rewards",
  "+10% врагове и награди"
 ],
 [
  "legacy.188",
  "Fallen Imp",
  "Паднал бес"
 ],
 [
  "legacy.189",
  "Carrion Bat",
  "Мършояден прилеп"
 ],
 [
  "legacy.190",
  "Shambling Zombie",
  "Влачещо зомби"
 ],
 [
  "legacy.191",
  "Skeleton Soldier",
  "Скелет воин"
 ],
 [
  "legacy.192",
  "Skeleton Archer",
  "Скелет стрелец"
 ],
 [
  "legacy.193",
  "Ghoul",
  "Гул"
 ],
 [
  "legacy.194",
  "Cultist",
  "Култист"
 ],
 [
  "legacy.195",
  "Armored Revenant",
  "Брониран отмъстител"
 ],
 [
  "legacy.196",
  "Blood Leech",
  "Кървава пиявица"
 ],
 [
  "legacy.197",
  "Wraith",
  "Привидение"
 ],
 [
  "legacy.198",
  "Fire Demon",
  "Огнен демон"
 ],
 [
  "legacy.199",
  "Gravewarden",
  "Гробен страж"
 ],
 [
  "legacy.200",
  "Plague Bearer",
  "Чумоносец"
 ],
 [
  "legacy.201",
  "Shade Stalker",
  "Сенчест преследвач"
 ],
 [
  "legacy.202",
  "The Flesh Butcher",
  "Месарят"
 ],
 [
  "legacy.203",
  "The Blood Countess",
  "Кървавата графиня"
 ],
 [
  "legacy.204",
  "The Lord of Ruin",
  "Владетелят на разрухата"
 ],
 [
  "legacy.205",
  "Fast",
  "Бърз"
 ],
 [
  "legacy.206",
  "Fire-Enchanted",
  "Огнен"
 ],
 [
  "legacy.207",
  "Frozen Aura",
  "Ледена аура"
 ],
 [
  "legacy.208",
  "Teleporting",
  "Телепортиращ"
 ],
 [
  "legacy.209",
  "Extra Strong",
  "Могъщ"
 ],
 [
  "legacy.210",
  "Vampiric",
  "Вампирски"
 ],
 [
  "legacy.211",
  "Shielded",
  "Защитен"
 ],
 [
  "legacy.212",
  "Cursed",
  "Прокълнат"
 ],
 [
  "legacy.213",
  "Warrior",
  "Воин"
 ],
 [
  "legacy.214",
  "+2 armor, +20% melee damage",
  "+2 броня, +20% щети в близък бой"
 ],
 [
  "legacy.215",
  "Whirlwind",
  "Вихрушка"
 ],
 [
  "legacy.216",
  "Available",
  "Достъпен"
 ],
 [
  "legacy.217",
  "Hunter",
  "Ловец"
 ],
 [
  "legacy.218",
  "+15% speed, +10% critical chance",
  "+15% скорост, +10% критичен шанс"
 ],
 [
  "legacy.219",
  "Arrow Storm",
  "Буря от стрели"
 ],
 [
  "legacy.220",
  "Sorceress",
  "Магьосница"
 ],
 [
  "legacy.221",
  "+25% area, −20% maximum life",
  "+25% обхват, −20% максимален живот"
 ],
 [
  "legacy.222",
  "Blizzard",
  "Виелица"
 ],
 [
  "legacy.223",
  "Reach level 15",
  "Достигни ниво 15"
 ],
 [
  "legacy.224",
  "Necromancer",
  "Некромант"
 ],
 [
  "legacy.225",
  "+1 projectile, chance to raise slain foes",
  "+1 снаряд, шанс за възкресяване на убити"
 ],
 [
  "legacy.226",
  "Raise Dead",
  "Възкреси мъртвите"
 ],
 [
  "legacy.227",
  "Slay 1000 enemies in total",
  "Убий общо 1000 врагове"
 ],
 [
  "legacy.228",
  "Paladin",
  "Паладин"
 ],
 [
  "legacy.229",
  "+1 regeneration, +25% duration",
  "+1 регенерация, +25% продължителност"
 ],
 [
  "legacy.230",
  "Consecration",
  "Освещаване"
 ],
 [
  "legacy.231",
  "Defeat the Graveyard",
  "Победи в Гробището"
 ],
 [
  "legacy.232",
  "Blood Knight",
  "Кървав рицар"
 ],
 [
  "legacy.233",
  "Life stolen on kills",
  "Отнема живот при убийство"
 ],
 [
  "legacy.234",
  "Blood Nova",
  "Кървава нова"
 ],
 [
  "legacy.235",
  "Defeat Catacombs without a revive",
  "Победи в Катакомбите без съживяване"
 ],
 [
  "legacy.236",
  "First blood",
  "Първа кръв"
 ],
 [
  "legacy.237",
  "Grave sweeper",
  "Чистач на гробове"
 ],
 [
  "legacy.238",
  "A legion falls",
  "Паднал легион"
 ],
 [
  "legacy.239",
  "Forged in darkness",
  "Изкован в мрака"
 ],
 [
  "legacy.240",
  "Unbroken soul",
  "Несломима душа"
 ],
 [
  "legacy.241",
  "The first gate",
  "Първата порта"
 ],
 [
  "legacy.242",
  "Beneath the stone",
  "Под камъка"
 ],
 [
  "legacy.243",
  "Hell is silent",
  "Адът замлъкна"
 ],
 [
  "legacy.244",
  "The bells toll for the living.",
  "Камбаните бият за живите."
 ],
 [
  "legacy.245",
  "One soul. Twelve minutes. No mercy.",
  "Една душа. Дванадесет минути. Без милост."
 ],
 [
  "legacy.246",
  "Damage",
  "Щети"
 ],
 [
  "legacy.247",
  "Watch the ground. Evade the charge.",
  "Следи земята. Избягвай атаката."
 ],
 [
  "legacy.248",
  "Her thirst grows with every wound.",
  "Жаждата ѝ расте с всяка рана."
 ],
 [
  "legacy.249",
  "The last seal is broken. End the darkness.",
  "Последният печат е счупен. Победи мрака."
 ],
 [
  "legacy.250",
  ">Bulgarian</option><option value=\"en\" ",
  ">Български</option><option value=\"en\" "
 ],
 [
  "legacy.251",
  "Auto",
  "Автоматично"
 ],
 [
  "legacy.252",
  "Low",
  "Ниска"
 ],
 [
  "legacy.253",
  "Medium",
  "Средна"
 ],
 [
  "legacy.254",
  "High",
  "Висока"
 ],
 [
  "legacy.255",
  "Synthesized effects · Ambient music",
  "Синтезирани звукови ефекти и фонова музика"
 ],
 [
  "legacy.256",
  "The Fallen March",
  "Падналите земи"
 ],
 [
  "legacy.257",
  "Gothic wilderness & cathedral",
  "Готическа пустош и катедрала"
 ],
 [
  "legacy.258",
  "The Black Moor",
  "Черната пустош"
 ],
 [
  "legacy.259",
  "The Forgotten Cemetery",
  "Забравеното гробище"
 ],
 [
  "legacy.260",
  "The Broken Cathedral",
  "Разрушената катедрала"
 ],
 [
  "legacy.261",
  "The Lower Catacombs",
  "Долните катакомби"
 ],
 [
  "legacy.262",
  "Kingdom of Sand",
  "Царството на пясъка"
 ],
 [
  "legacy.263",
  "Desert palaces & ancient tombs",
  "Пустинни дворци и древни гробници"
 ],
 [
  "legacy.264",
  "The Scouring Sands",
  "Изпепелените пясъци"
 ],
 [
  "legacy.265",
  "The Sunken Palace",
  "Затрупаният дворец"
 ],
 [
  "legacy.266",
  "The Serpent Tomb",
  "Змийската гробница"
 ],
 [
  "legacy.267",
  "The Astral Sanctuary",
  "Астралното светилище"
 ],
 [
  "legacy.268",
  "The Drowned Kingdom",
  "Потъналото царство"
 ],
 [
  "legacy.269",
  "Jungle, marsh & forbidden temple",
  "Джунгла, блата и забранен храм"
 ],
 [
  "legacy.270",
  "The Thorn Jungle",
  "Бодливата джунгла"
 ],
 [
  "legacy.271",
  "The Great Mire",
  "Голямото блато"
 ],
 [
  "legacy.272",
  "The Overgrown City",
  "Обраслият град"
 ],
 [
  "legacy.273",
  "The Temple of Blood",
  "Храмът на кръвта"
 ],
 [
  "legacy.274",
  "The Infernal Gate",
  "Адската порта"
 ],
 [
  "legacy.275",
  "Ash, molten rock & chaos",
  "Пепел, лава и хаос"
 ],
 [
  "legacy.276",
  "The Ashen Descent",
  "Пепелното спускане"
 ],
 [
  "legacy.277",
  "The River of Embers",
  "Реката от жар"
 ],
 [
  "legacy.278",
  "The Hellforge",
  "Адската ковачница"
 ],
 [
  "legacy.279",
  "The Sanctuary of Ruin",
  "Светилището на разрухата"
 ],
 [
  "legacy.280",
  "The Moor Stalker",
  "Дебнещият в пустошта"
 ],
 [
  "legacy.281",
  "The Ossuary Keeper",
  "Пазителят на костницата"
 ],
 [
  "legacy.282",
  "The Desecrator",
  "Осквернителят"
 ],
 [
  "legacy.283",
  "The Crimson Abbess",
  "Алената абатиса"
 ],
 [
  "legacy.284",
  "The Dune Reaver",
  "Пясъчният хищник"
 ],
 [
  "legacy.285",
  "The Forsaken Vizier",
  "Забравеният везир"
 ],
 [
  "legacy.286",
  "The Serpent King",
  "Змийският крал"
 ],
 [
  "legacy.287",
  "The Astral Warden",
  "Астралният пазител"
 ],
 [
  "legacy.288",
  "The Thorn Tyrant",
  "Бодливият тиранин"
 ],
 [
  "legacy.289",
  "The Mire Devourer",
  "Поглъщачът от блатото"
 ],
 [
  "legacy.290",
  "The Ruined Oracle",
  "Погубеният оракул"
 ],
 [
  "legacy.291",
  "The Blood Hierophant",
  "Кървавият йерофант"
 ],
 [
  "legacy.292",
  "The Ash Butcher",
  "Пепелният месар"
 ],
 [
  "legacy.293",
  "The Furnace Lord",
  "Владетелят на пещта"
 ],
 [
  "legacy.294",
  "The Iron Matron",
  "Желязната матрона"
 ],
 [
  "legacy.295",
  "Spin through enemies for 3 seconds.",
  "Върти се през враговете за 3 секунди."
 ],
 [
  "legacy.296",
  "War Cry",
  "Боен вик"
 ],
 [
  "legacy.297",
  "A shockwave damages and stuns nearby foes.",
  "Ударна вълна наранява и зашеметява враговете."
 ],
 [
  "legacy.298",
  "Battle Orders",
  "Бойни заповеди"
 ],
 [
  "legacy.299",
  "Restore life and empower damage for 8 seconds.",
  "Възстановява живот и подсилва щетите за 8 секунди."
 ],
 [
  "legacy.300",
  "Strafe",
  "Стрелкова вихрушка"
 ],
 [
  "legacy.301",
  "Rapid aimed volleys pierce the crowd.",
  "Бързи насочени залпове пронизват тълпата."
 ],
 [
  "legacy.302",
  "Immolation Arrow",
  "Изгаряща стрела"
 ],
 [
  "legacy.303",
  "An explosive arrow leaves burning ground.",
  "Експлозивна стрела оставя горяща земя."
 ],
 [
  "legacy.304",
  "Decoy",
  "Примамка"
 ],
 [
  "legacy.305",
  "A decoy draws ordinary monsters away.",
  "Примамка привлича обикновените чудовища."
 ],
 [
  "legacy.306",
  "A storm of ice strikes and slows a wide area.",
  "Ледена буря удря и забавя в широка зона."
 ],
 [
  "legacy.307",
  "Frozen Orb",
  "Ледено кълбо"
 ],
 [
  "legacy.308",
  "A traveling orb sheds piercing ice bolts.",
  "Движещо се кълбо изстрелва пробивни ледени стрели."
 ],
 [
  "legacy.309",
  "Static Field",
  "Статично поле"
 ],
 [
  "legacy.310",
  "Lightning strips a portion of nearby enemy life.",
  "Мълния отнема част от живота на близките врагове."
 ],
 [
  "legacy.311",
  "Raise Skeleton",
  "Възкреси скелет"
 ],
 [
  "legacy.312",
  "Raise three skeleton warriors to fight for you.",
  "Възкресява три скелета, които се бият за теб."
 ],
 [
  "legacy.313",
  "Corpse Explosion",
  "Трупен взрив"
 ],
 [
  "legacy.314",
  "Explode up to three nearby fallen bodies.",
  "Взривява до три близки паднали тела."
 ],
 [
  "legacy.315",
  "Bone Prison",
  "Костен затвор"
 ],
 [
  "legacy.316",
  "A ring of bones traps and slows nearby enemies.",
  "Костен кръг затваря и забавя близките врагове."
 ],
 [
  "legacy.317",
  "Blessed Hammer",
  "Благословен чук"
 ],
 [
  "legacy.318",
  "Sacred hammers spiral outward through enemies.",
  "Свещени чукове се разгръщат в спирала през враговете."
 ],
 [
  "legacy.319",
  "Fist of the Heavens",
  "Небесен юмрук"
 ],
 [
  "legacy.320",
  "A holy bolt strikes, scattering sacred sparks.",
  "Свещена мълния удря и разпръсква искри."
 ],
 [
  "legacy.321",
  "Holy Shield",
  "Свещен щит"
 ],
 [
  "legacy.322",
  "A radiant shield grants temporary armor.",
  "Сияен щит дава временна броня."
 ],
 [
  "legacy.323",
  "Dragon Talon",
  "Драконов нокът"
 ],
 [
  "legacy.324",
  "A rapid series of kicks stuns a close target.",
  "Поредица от ритници зашеметява близка цел."
 ],
 [
  "legacy.325",
  "Lightning Sentry",
  "Мълниеносен страж"
 ],
 [
  "legacy.326",
  "A trap fires lightning at nearby enemies.",
  "Капан изстрелва мълнии по близките врагове."
 ],
 [
  "legacy.327",
  "Shadow Master",
  "Повелител на сенките"
 ],
 [
  "legacy.328",
  "Summon a shadow ally that attacks and distracts.",
  "Призовава сенчест съюзник, който атакува и отвлича."
 ],
 [
  "legacy.329",
  "Leap Attack",
  "Скок с атака"
 ],
 [
  "legacy.330",
  "Vault",
  "Акробатичен скок"
 ],
 [
  "legacy.331",
  "Teleport",
  "Телепорт"
 ],
 [
  "legacy.332",
  "Blood Rush",
  "Кървав устрем"
 ],
 [
  "legacy.333",
  "Charge",
  "Щурм"
 ],
 [
  "legacy.334",
  "Dragon Flight",
  "Драконов полет"
 ],
 [
  "legacy.335",
  "Bash",
  "Съкрушаване"
 ],
 [
  "legacy.336",
  "Frenzy",
  "Неистовство"
 ],
 [
  "legacy.337",
  "Multiple Shot",
  "Множествен изстрел"
 ],
 [
  "legacy.338",
  "Fireball",
  "Огнено кълбо"
 ],
 [
  "legacy.339",
  "Meteor",
  "Метеор"
 ],
 [
  "legacy.340",
  "Bone Spear",
  "Костно копие"
 ],
 [
  "legacy.341",
  "Bone Spirit",
  "Костен дух"
 ],
 [
  "legacy.342",
  "Chain Lightning",
  "Верижна мълния"
 ],
 [
  "legacy.343",
  "Thunder Storm",
  "Гръмотевична буря"
 ],
 [
  "legacy.344",
  "Double Throw",
  "Двойно хвърляне"
 ],
 [
  "legacy.345",
  "Double Throw · Mastery",
  "Двойно хвърляне · Майсторство"
 ],
 [
  "legacy.346",
  "Poison Nova",
  "Отровна нова"
 ],
 [
  "legacy.347",
  "Poison Explosion",
  "Отровен взрив"
 ],
 [
  "legacy.348",
  "Teeth",
  "Зъби"
 ],
 [
  "legacy.349",
  "Hydra",
  "Хидра"
 ],
 [
  "legacy.350",
  "Hydra · Fire Mastery",
  "Хидра · Огнено майсторство"
 ],
 [
  "legacy.351",
  "Whirlwind · Blood Funnel",
  "Вихрушка · Кървава фуния"
 ],
 [
  "legacy.352",
  "A crushing strike knocks enemies back.",
  "Съкрушителен удар отблъсква враговете."
 ],
 [
  "legacy.353",
  "A fan of arrows pierces the crowd.",
  "Ветрило от стрели пронизва тълпата."
 ],
 [
  "legacy.354",
  "An explosive orb of flame.",
  "Експлозивно кълбо от пламъци."
 ],
 [
  "legacy.355",
  "A bone lance pierces enemies in a line.",
  "Костно копие пронизва враговете в линия."
 ],
 [
  "legacy.356",
  "Lightning arcs from enemy to enemy.",
  "Мълния прескача между враговете."
 ],
 [
  "legacy.357",
  "Two thrown weapons slice through enemies.",
  "Две хвърлени оръжия прорязват враговете."
 ],
 [
  "legacy.358",
  "A freezing nova; at mastery, a traveling ice orb.",
  "Замразяваща нова; при майсторство — летящо ледено кълбо."
 ],
 [
  "legacy.359",
  "An expanding ring of deadly poison.",
  "Разширяващ се кръг от смъртоносна отрова."
 ],
 [
  "legacy.360",
  "Holy hammers spiral outward.",
  "Свещени чукове се разгръщат в спирала."
 ],
 [
  "legacy.361",
  "A fan of piercing bone teeth.",
  "Ветрило от пробивни костни зъби."
 ],
 [
  "legacy.362",
  "A three-headed fire guardian spits bolts.",
  "Триглав огнен пазител изстрелва кълба."
 ],
 [
  "legacy.363",
  "A spinning melee assault steals life on kills.",
  "Въртящо нападение отнема живот при убийство."
 ],
 [
  "legacy.364",
  "Power drawn from ancient disciplines.",
  "Сила от древни бойни изкуства."
 ],
 [
  "legacy.365",
  "Barbarian",
  "Варварин"
 ],
 [
  "legacy.366",
  "Amazon",
  "Амазонка"
 ],
 [
  "legacy.367",
  "Assassin",
  "Убийца"
 ],
 [
  "legacy.368",
  "+10% critical chance, +10% movement speed",
  "+10% критичен шанс, +10% скорост на движение"
 ],
 [
  "legacy.369",
  "Complete level 1-1 or reach level 15",
  "Премини подниво 1-1 или достигни ниво 15"
 ],
 [
  "legacy.370",
  "Complete level 1-3 or slay 1000 enemies",
  "Премини подниво 1-3 или убий 1000 врагове"
 ],
 [
  "legacy.371",
  "Complete chapter I",
  "Завърши зона I"
 ],
 [
  "legacy.372",
  "Complete chapter II without a revive on its final level",
  "Завърши последното подниво на зона II без съживяване"
 ],
 [
  "legacy.373",
  "CAMPAIGN",
  "КАМПАНИЯ"
 ],
 [
  "legacy.374",
  "Chapter",
  "Зона"
 ],
 [
  "legacy.375",
  "Level",
  "Подниво"
 ],
 [
  "legacy.376",
  "Guardian",
  "Пазител"
 ],
 [
  "legacy.377",
  "Enter the next level",
  "Към следващото подниво"
 ],
 [
  "legacy.378",
  "Equipment and soul level carry forward.",
  "Екипировката и нивото на душата се пренасят."
 ],
 [
  "legacy.379",
  "COMPLETED",
  "ЗАВЪРШЕНО"
 ],
 [
  "legacy.380",
  "AVAILABLE",
  "ДОСТЪПНО"
 ],
 [
  "legacy.381",
  "Defeat the previous level to unlock.",
  "Победи в предишното подниво, за да отключиш."
 ],
 [
  "legacy.382",
  "Mana",
  "Мана"
 ],
 [
  "legacy.383",
  "Not enough mana",
  "Недостатъчно мана"
 ],
 [
  "legacy.384",
  "No fallen bodies nearby",
  "Няма паднали тела наблизо"
 ],
 [
  "legacy.385",
  "Movement",
  "Придвижване"
 ],
 [
  "legacy.386",
  "Class skills",
  "Класови умения"
 ],
 [
  "legacy.387",
  "Continue the journey",
  "Продължи пътешествието"
 ],
 [
  "legacy.388",
  "LEVEL CLEARED",
  "ПОДНИВОТО Е ПРЕМИНАТО"
 ],
 [
  "legacy.389",
  "THE FOUR SEALS ARE BROKEN",
  "ЧЕТИРИТЕ ПЕЧАТА СА СЧУПЕНИ"
 ],
 [
  "legacy.390",
  "Survive, then defeat the guardian",
  "Оцелей, после победи пазителя"
 ],
 [
  "legacy.391",
  "Drag left to move · three skills on the right · movement below",
  "Движение вляво · три умения вдясно · придвижване отдолу"
 ],
 [
  "legacy.392",
  "Drag left. Attacks are automatic. Use the three class skills on the right; the lower button leaps, charges or teleports in your movement direction.",
  "Плъзгай вляво. Атаките са автоматични. Вдясно са трите класови умения; долният бутон скача, щурмува или телепортира по посоката ти."
 ],
 [
  "legacy.393",
  "Defeat the guardian to open the next gate.",
  "Победи пазителя, за да отвориш следващата порта."
 ],
 [
  "legacy.394",
  "MASTERY",
  "МАЙСТОРСТВО"
 ],
 [
  "legacy.395",
  "Wells restore life and mana",
  "Кладенците възстановяват живот и мана"
 ],
 [
  "legacy.396",
  "No checkpoint is available",
  "Няма наличен контролен запис"
 ],
 [
  "legacy.397",
  "Classic skills · adapted for survival combat",
  "Класически умения · адаптирани за оцеляване"
 ],
 [
  "legacy.398",
  "Four realms. Sixteen gates. One soul.",
  "Четири свята. Шестнадесет порти. Една душа."
 ],
 [
  "legacy.399",
  "Watch the ground. Use your movement skill to evade the marked attacks.",
  "Следи земята. Използвай придвижването си, за да избегнеш отбелязаните атаки."
 ],
 [
  "legacy.400",
  "Exile's Edge",
  "Острието на изгнаника"
 ],
 [
  "legacy.401",
  "Mantle of Return",
  "Наметало на завръщането"
 ],
 [
  "legacy.402",
  "Forgotten Relic",
  "Забравена реликва"
 ],
 [
  "legacy.403",
  "Ranger",
  "Следотърсач"
 ],
 [
  "legacy.404",
  "Emberweaver",
  "Жаротъкачка"
 ],
 [
  "legacy.405",
  "Soulbinder",
  "Душепазител"
 ],
 [
  "legacy.406",
  "Oathkeeper",
  "Клетвен страж"
 ],
 [
  "legacy.407",
  "Nightblade",
  "Нощно острие"
 ],
 [
  "legacy.408",
  "Clear the final zone on difficulty 2",
  "Победи финалната зона на трудност 2"
 ],
 [
  "legacy.409",
  "Defeat the guardian of zone ",
  "Победи пазителя на подзона "
 ],
 [
  "legacy.410",
  "Blade Tempest",
  "Буря от стомана"
 ],
 [
  "legacy.411",
  "Iron Roar",
  "Железен рев"
 ],
 [
  "legacy.412",
  "Rallying Oath",
  "Обет на волята"
 ],
 [
  "legacy.413",
  "Needle Rain",
  "Дъжд от остриета"
 ],
 [
  "legacy.414",
  "Ember Arrow",
  "Жарка стрела"
 ],
 [
  "legacy.415",
  "Hollow Echo",
  "Кухо ехо"
 ],
 [
  "legacy.416",
  "Winter Veil",
  "Зимен воал"
 ],
 [
  "legacy.417",
  "Frost Seed",
  "Ледено семе"
 ],
 [
  "legacy.418",
  "Storm Pulse",
  "Бурен пулс"
 ],
 [
  "legacy.419",
  "Gravebound",
  "Гробна стража"
 ],
 [
  "legacy.420",
  "Soulburst",
  "Душевен взрив"
 ],
 [
  "legacy.421",
  "Ossuary Ring",
  "Костница"
 ],
 [
  "legacy.422",
  "Oath Hammers",
  "Чукове на обета"
 ],
 [
  "legacy.423",
  "Dawnfall",
  "Падаща зора"
 ],
 [
  "legacy.424",
  "Golden Aegis",
  "Златна егида"
 ],
 [
  "legacy.425",
  "Raven Talon",
  "Гарванов нокът"
 ],
 [
  "legacy.426",
  "Storm Beacon",
  "Бурен фар"
 ],
 [
  "legacy.427",
  "Night Echoes",
  "Нощни отгласи"
 ],
 [
  "legacy.428",
  "Weapon",
  "Оръжие"
 ],
 [
  "legacy.429",
  "Armor",
  "Доспех"
 ],
 [
  "legacy.430",
  "Charm",
  "Талисман"
 ],
 [
  "legacy.431",
  "Common",
  "Обикновен"
 ],
 [
  "legacy.432",
  "Magic",
  "Магически"
 ],
 [
  "legacy.433",
  "Rare",
  "Рядък"
 ],
 [
  "legacy.434",
  "Legendary",
  "Легендарен"
 ],
 [
  "legacy.435",
  "Warden's Blade",
  "Стражево острие"
 ],
 [
  "legacy.436",
  "Traveler's Mail",
  "Ризница на пътника"
 ],
 [
  "legacy.437",
  "Seal of Dawn",
  "Печат на зората"
 ],
 [
  "legacy.438",
  "Steel Mastery",
  "Стоманено майсторство"
 ],
 [
  "legacy.439",
  "Unbroken",
  "Несломимост"
 ],
 [
  "legacy.440",
  "Battle Discipline",
  "Бойна дисциплина"
 ],
 [
  "legacy.441",
  "Deadly Precision",
  "Смъртоносна точност"
 ],
 [
  "legacy.442",
  "Keen Sight",
  "Остър поглед"
 ],
 [
  "legacy.443",
  "Hunting Rhythm",
  "Ловен ритъм"
 ],
 [
  "legacy.444",
  "Living Ember",
  "Жива жарава"
 ],
 [
  "legacy.445",
  "Wider Horizon",
  "Разширен хоризонт"
 ],
 [
  "legacy.446",
  "Quiet Focus",
  "Тиха концентрация"
 ],
 [
  "legacy.447",
  "Grave Knowledge",
  "Гробно знание"
 ],
 [
  "legacy.448",
  "Eternal Pact",
  "Вечен договор"
 ],
 [
  "legacy.449",
  "Flow of Souls",
  "Поток на душите"
 ],
 [
  "legacy.450",
  "Power of the Oath",
  "Сила на обета"
 ],
 [
  "legacy.451",
  "Oath Shield",
  "Щит на клетвата"
 ],
 [
  "legacy.452",
  "Radiant Will",
  "Светла воля"
 ],
 [
  "legacy.453",
  "Night Precision",
  "Нощна прецизност"
 ],
 [
  "legacy.454",
  "Silent Steps",
  "Безшумни стъпки"
 ],
 [
  "legacy.455",
  "Shadow Rhythm",
  "Сенчест ритъм"
 ],
 [
  "legacy.456",
  "% damage",
  "% щети"
 ],
 [
  "legacy.457",
  " life",
  " живот"
 ],
 [
  "legacy.458",
  "% experience",
  "% опит"
 ],
 [
  "legacy.459",
  "Exile's Blade",
  "Острие на изгнаника"
 ],
 [
  "legacy.460",
  "Iron Verdict",
  "Желязна присъда"
 ],
 [
  "legacy.461",
  "Ashen Blade",
  "Клинок на пепелта"
 ],
 [
  "legacy.462",
  "Traveler's Guard",
  "Стража на пътника"
 ],
 [
  "legacy.463",
  "Bone Bastion",
  "Костен бастион"
 ],
 [
  "legacy.464",
  "Oath Mail",
  "Ризница на обета"
 ],
 [
  "legacy.465",
  "Seal of Mist",
  "Печат на мъглата"
 ],
 [
  "legacy.466",
  "Eye of Dawn",
  "Око на зората"
 ],
 [
  "legacy.467",
  "Soul Amulet",
  "Амулет на душите"
 ],
 [
  "legacy.468",
  "Death approaches. Retreat to keep your earned resources.",
  "Смъртта идва. Можеш да се оттеглиш и да запазиш ресурсите."
 ],
 [
  "legacy.469",
  "Level ",
  "Ниво "
 ],
 [
  "legacy.470",
  "◉ Move",
  "◉ Движение"
 ],
 [
  "legacy.471",
  "TEST · no rewards or unlocks",
  "ТЕСТ · без награди и отключване"
 ],
 [
  "legacy.472",
  "Enemies ",
  "Врагове "
 ],
 [
  "legacy.473",
  " · Projectiles ",
  " · Снаряди "
 ],
 [
  "legacy.474",
  "Animations ",
  "Анимации "
 ],
 [
  "legacy.475",
  "<div class=\"v6-wallet\"><span>HELLBOUND / Act I · v6.0</span><span>◆ ",
  "<div class=\"v6-wallet\"><span>HELLBOUND / Акт I · v6.0</span><span>◆ "
 ],
 [
  "legacy.476",
  "<div class=\"v6-layout v6-town\"><div><div class=\"eyebrow\">ASHEN KEEP</div><h1>Four gates.<br>One exile.</h1><p class=\"subtitle\">The Fallen Lands · Act I</p><p class=\"small\">Prepare your hero, temper your relics and break the four seals. Earned rewards remain after defeat.</p><div class=\"v6-notice\">",
  "<div class=\"v6-layout v6-town\"><div><div class=\"eyebrow\">КРЕПОСТТА НА ПЕПЕЛТА</div><h1>Четири порти.<br>Един изгнаник.</h1><p class=\"subtitle\">Падналите земи · Акт I</p><p class=\"small\">Подготви героя, закали намерените реликви и разруши четирите печата. При загуба запазваш спечеленото.</p><div class=\"v6-notice\">"
 ],
 [
  "legacy.477",
  "/4 zones cleared<br>Next hero: ",
  "/4 подзони преминати<br>Следващ герой: "
 ],
 [
  "legacy.478",
  "\" style=\"height:135px;float:left;margin:-10px 14px -5px 0\"><p class=\"small\">12 weapons · evolutions<br>3 active skills<br>Permanent talents and items</p></div><div><div class=\"v6-grid\">",
  "\" style=\"height:135px;float:left;margin:-10px 14px -5px 0\"><p class=\"small\">12 оръжия · еволюции<br>3 активни умения<br>Постоянни таланти и предмети</p></div><div><div class=\"v6-grid\">"
 ],
 [
  "legacy.479",
  "<p class=\"v6-footer\">Portrait / Landscape · original dark fantasy<br>Progress is stored locally in this browser.</p></div></div>",
  "<p class=\"v6-footer\">Портрет / Landscape · оригинална мрачна фентъзи визия<br>Напредъкът е локален за този браузър.</p></div></div>"
 ],
 [
  "legacy.480",
  "defeat the next guardian",
  "победи следващия пазител"
 ],
 [
  "legacy.481",
  "final zone on difficulty 2",
  "финална подзона на трудност 2"
 ],
 [
  "legacy.482",
  "◈ Gates of Act I",
  "◈ Портите на Акт I"
 ],
 [
  "legacy.483",
  "⚒ Forge",
  "⚒ Ковачница"
 ],
 [
  "legacy.484",
  "✥ Talents",
  "✥ Таланти"
 ],
 [
  "legacy.485",
  "♜ Legacy",
  "♜ Наследство"
 ],
 [
  "legacy.486",
  "⚔ Heroes",
  "⚔ Герои"
 ],
 [
  "legacy.487",
  "Settings / save",
  "Настройки / запис"
 ],
 [
  "legacy.488",
  "Continue journey · zone ",
  "Продължи похода · подзона "
 ],
 [
  "legacy.489",
  "Test zones and bosses",
  "Тест на зоните и босовете"
 ],
 [
  "legacy.490",
  "<div class=\"eyebrow\">THE FALLEN LANDS · ALL ACT I ZONES</div><h2>The Exile's Path</h2><div class=\"v6-grid\">",
  "<div class=\"eyebrow\">ПАДНАЛИТЕ ЗЕМИ · ВСИЧКИ ПОДЗОНИ НА АКТ I</div><h2>Пътят на изгнаника</h2><div class=\"v6-grid\">"
 ],
 [
  "legacy.491",
  "</div><p class=\"v6-notice\">Selected: ",
  "</div><p class=\"v6-notice\">Избрана: "
 ],
 [
  "legacy.492",
  " Raise difficulty after a victory; lowering it is free.</p><div class=\"v6-actions\">",
  " Трудността се повишава след победа и може да се намалява безплатно.</p><div class=\"v6-actions\">"
 ],
 [
  "legacy.493",
  "</p><small>Guardian: ",
  "</p><small>Пазител: "
 ],
 [
  "legacy.494",
  " until guardian · Difficulty ",
  " до боса · Трудност "
 ],
 [
  "legacy.495",
  "UNCLEARED",
  "НЕПРЕМИНАТА"
 ],
 [
  "legacy.496",
  "Open wasteland, dead trees and broken arches.",
  "Открита пустош, мъртви дървета и счупени арки."
 ],
 [
  "legacy.497",
  "Graves, walls and healing wells.",
  "Гробове, зидове и лечебни кладенци."
 ],
 [
  "legacy.498",
  "Cathedral columns, cultists and spirits.",
  "Катедрални колони, култисти и привидения."
 ],
 [
  "legacy.499",
  "Stone mazes, fire and the final seal.",
  "Каменни лабиринти, огън и последният печат."
 ],
 [
  "legacy.500",
  "Select zone",
  "Избери подзоната"
 ],
 [
  "legacy.501",
  "Defeat the previous guardian",
  "Победи предходния пазител"
 ],
 [
  "legacy.502",
  "Difficulty ",
  "Трудност "
 ],
 [
  "legacy.503",
  "The saved combat build will be restored.",
  "Запазеният боен билд ще бъде възстановен."
 ],
 [
  "legacy.504",
  "Entering a later zone directly provides a starting combat build.",
  "Прякото влизане в по-късна зона дава начален боен ранг за нея."
 ],
 [
  "legacy.505",
  "Enter zone",
  "Влез в подзоната"
 ],
 [
  "legacy.506",
  "Change hero",
  "Смени героя"
 ],
 [
  "legacy.507",
  "Back to town",
  "Към града"
 ],
 [
  "legacy.508",
  "<h2>Forge and treasury</h2><p class=\"small\">One item per slot. Tempering adds 10% of base power per rank, up to +5. Overflow loot becomes fragments.</p><div class=\"v6-actions\">",
  "<h2>Ковачница и съкровищница</h2><p class=\"small\">Един предмет на слот. Закаляване +10% от основния ефект на ранг, до +5. При пълен сандък излишната плячка се разглобява в отломки.</p><div class=\"v6-actions\">"
 ],
 [
  "legacy.509",
  "/60 slots · Dismantling returns 20% of the base price, without tempering costs. No repair fee or rank loss.</p>",
  "/60 слота · Разглобяването връща 20% от началната цена, без стойността на закаляването. Няма цена за ремонт или загуба на ранг.</p>"
 ],
 [
  "legacy.510",
  "Buy starter relics",
  "Купи начални реликви"
 ],
 [
  "legacy.511",
  "Permanent attributes",
  "Постоянни характеристики"
 ],
 [
  "legacy.512",
  "Town",
  "Град"
 ],
 [
  "legacy.513",
  " · Rank +",
  " · Ранг +"
 ],
 [
  "legacy.514",
  " · Level ",
  " · Ниво "
 ],
 [
  "legacy.515",
  "✓ Equipped",
  "✓ Екипиран"
 ],
 [
  "legacy.516",
  "Equip",
  "Екипирай"
 ],
 [
  "legacy.517",
  "Fully tempered",
  "Максимално закален"
 ],
 [
  "legacy.518",
  "Temper · ",
  "Закали · "
 ],
 [
  "legacy.519",
  "Dismantle · ",
  "Разглоби · "
 ],
 [
  "legacy.520",
  "Starter relic",
  "Начална реликва"
 ],
 [
  "legacy.521",
  "<h2>Smith's relics</h2><div class=\"v6-grid\">",
  "<h2>Реликви на ковача</h2><div class=\"v6-grid\">"
 ],
 [
  "legacy.522",
  "Buy · ",
  "Купи · "
 ],
 [
  "legacy.523",
  " · Permanent talents</h2><p class=\"small\">Soulstones come from elites and bosses. The next talent requires 2 ranks in the previous talent.</p><div class=\"v6-grid\">",
  " · Постоянни таланти</h2><p class=\"small\">Камъни на душите от елити и босове. За следващия талант са нужни 2 ранга в предходния.</p><div class=\"v6-grid\">"
 ],
 [
  "legacy.524",
  "<div class=\"v6-card\"><span class=\"v6-tag\">RANK ",
  "<div class=\"v6-card\"><span class=\"v6-tag\">РАНГ "
 ],
 [
  "legacy.525",
  "+3% damage per rank.",
  "+3% щети за ранг."
 ],
 [
  "legacy.526",
  "−2% cooldown and +8 mana per rank.",
  "−2% презареждане и +8 мана за ранг."
 ],
 [
  "legacy.527",
  "+6 life per rank.",
  "+6 живот за ранг."
 ],
 [
  "legacy.528",
  "+1.5% critical chance per rank.",
  "+1.5% критичен шанс за ранг."
 ],
 [
  "legacy.529",
  "+4% area per rank.",
  "+4% обхват за ранг."
 ],
 [
  "legacy.530",
  "+6% duration per rank.",
  "+6% продължителност за ранг."
 ],
 [
  "legacy.531",
  "+1 armor per rank.",
  "+1 броня за ранг."
 ],
 [
  "legacy.532",
  "+2% speed per rank.",
  "+2% скорост за ранг."
 ],
 [
  "legacy.533",
  "Maximum",
  "Максимум"
 ],
 [
  "legacy.534",
  "Learn · ",
  "Научи · "
 ],
 [
  "legacy.535",
  "<div class=\"eyebrow\">LEVEL ",
  "<div class=\"eyebrow\">НИВО "
 ],
 [
  "legacy.536",
  " · COMBAT BUILD FOR THIS RUN</div><h2>",
  " · БОЕН БИЛД ЗА ТОЗИ ПОХОД</div><h2>"
 ],
 [
  "legacy.537",
  "</b>Time</div><div><b>",
  "</b>Време</div><div><b>"
 ],
 [
  "legacy.538",
  "</b>Slain</div><div><b>+",
  "</b>Победени</div><div><b>+"
 ],
 [
  "legacy.539",
  "</b>Gold</div><div><b>+",
  "</b>Злато</div><div><b>+"
 ],
 [
  "legacy.540",
  "</b>Souls</div></div><p class=\"small\">",
  "</b>Души</div></div><p class=\"small\">"
 ],
 [
  "legacy.541",
  "TEST MODE · NO PROGRESS CHANGES",
  "ТЕСТОВ РЕЖИМ · ПРОГРЕСЪТ НЕ СЕ ПРОМЕНЯ"
 ],
 [
  "legacy.542",
  "ACT I · ZONE ",
  "АКТ I · ПОДЗОНА "
 ],
 [
  "legacy.543",
  "ACT I COMPLETE",
  "АКТ I Е ПРЕМИНАТ"
 ],
 [
  "legacy.544",
  "SEAL BROKEN",
  "ПЕЧАТЪТ Е РАЗРУШЕН"
 ],
 [
  "legacy.545",
  "BACK TO THE KEEP",
  "ОБРАТНО В КРЕПОСТТА"
 ],
 [
  "legacy.546",
  "No rewards or unlocks.",
  "Няма награди или отключвания."
 ],
 [
  "legacy.547",
  "Items kept: ",
  "Запазени предмети: "
 ],
 [
  "legacy.548",
  " · Permanent equipment, talents and unlocked zones are retained.",
  " · Постоянната екипировка, талантите и достигнатите зони се запазват."
 ],
 [
  "legacy.549",
  "<div class=\"v6-notice\">A new hero is unlocked — select them in town.</div>",
  "<div class=\"v6-notice\">Отключен е нов герой — избери го в града.</div>"
 ],
 [
  "legacy.550",
  "Next zone",
  "Следваща подзона"
 ],
 [
  "legacy.551",
  "Try again",
  "Опитай отново"
 ],
 [
  "legacy.552",
  "Forge",
  "Ковачница"
 ],
 [
  "legacy.553",
  "<h2>Act I trials</h2><p class=\"v6-notice\">All four zones are available for testing. Use your selected hero and equipment without rewards or save changes. “Boss now” provides a prepared build.</p><div class=\"v6-grid\">",
  "<h2>Изпитания на Акт I</h2><p class=\"v6-notice\">Всички четири подзони са достъпни тук за тест. Използваш избрания герой и текущата екипировка, но няма награди, запис на похода или отключвания. „Бос веднага“ дава подготвен боен билд.</p><div class=\"v6-grid\">"
 ],
 [
  "legacy.554",
  "Test full zone",
  "Тест на цялата зона"
 ],
 [
  "legacy.555",
  "Boss now",
  "Бос веднага"
 ],
 [
  "legacy.556",
  "iPhone: rotate manually with orientation lock disabled. Safari → Share → Add to Home Screen. Progress is local; export to move to another phone. Audio is synthesized.",
  "iPhone: завърти ръчно с изключено заключване на ориентацията. Safari → Споделяне → Добави към Начален екран. Прогресът е локален; използвай експорт за друг телефон. Звуците са синтезирани."
 ],
 [
  "legacy.557",
  "<div class=\"eyebrow danger\">SEAL GUARDIAN</div><div class=\"hero-view\"><img alt=\"\" src=\"",
  "<div class=\"eyebrow danger\">ПАЗИТЕЛ НА ПЕЧАТА</div><div class=\"hero-view\"><img alt=\"\" src=\""
 ],
 [
  "legacy.558",
  "</h2><p class=\"small\">Watch the warning circles and use your movement skill to avoid the attack.</p>",
  "</h2><p class=\"small\">Следи предупредителните кръгове и използвай придвижването, за да избегнеш удара.</p>"
 ],
 [
  "legacy.559",
  " · level ",
  " · ниво "
 ],
 [
  "legacy.560",
  "Gate Sentinel",
  "Страж на прохода"
 ],
 [
  "legacy.561",
  "Seal Warden",
  "Пазител на печата"
 ],
 [
  "legacy.562",
  "Helmet / hood",
  "Шлем / качулка"
 ],
 [
  "legacy.563",
  " mana",
  " мана"
 ],
 [
  "legacy.564",
  "Gloves",
  "Ръкавици"
 ],
 [
  "legacy.565",
  "% critical chance",
  "% критичен шанс"
 ],
 [
  "legacy.566",
  "Boots",
  "Ботуши"
 ],
 [
  "legacy.567",
  "% speed",
  "% скорост"
 ],
 [
  "legacy.568",
  "Cloak",
  "Плащ"
 ],
 [
  "legacy.569",
  " life / sec",
  " живот / сек"
 ],
 [
  "legacy.570",
  "Belt",
  "Пояс"
 ],
 [
  "legacy.571",
  " armor",
  " броня"
 ],
 [
  "legacy.572",
  "Ashen Oath",
  "Клетва на пепелта"
 ],
 [
  "legacy.573",
  "Solar Covenant",
  "Завет на слънцето"
 ],
 [
  "legacy.574",
  "Heart of Thorns",
  "Сърце на тръните"
 ],
 [
  "legacy.575",
  "Ember Seal",
  "Печат на жаравата"
 ],
 [
  "legacy.576",
  "Ashen Core",
  "Пепелно ядро"
 ],
 [
  "legacy.577",
  "Sun Crystal",
  "Слънчев кристал"
 ],
 [
  "legacy.578",
  "Thorn Essence",
  "Трънлива есенция"
 ],
 [
  "legacy.579",
  "Ember Heart",
  "Сърце от жар"
 ],
 [
  "legacy.580",
  "Iron Echo",
  "Железен отзвук"
 ],
 [
  "legacy.581",
  "Falcon Volley",
  "Залп на сокола"
 ],
 [
  "legacy.582",
  "Frost Resonance",
  "Леден резонанс"
 ],
 [
  "legacy.583",
  "Soul Gathering",
  "Сбор на душите"
 ],
 [
  "legacy.584",
  "Oath Dawn",
  "Зора на обета"
 ],
 [
  "legacy.585",
  "Venom Crescent",
  "Отровен полумесец"
 ],
 [
  "legacy.586",
  "Third skill: shockwave, 34 damage and a 0.7-second slow.",
  "При третото умение: ударна вълна, 34 щети и 0.7 сек забавяне."
 ],
 [
  "legacy.587",
  "Third skill: three piercing arrows dealing 23 damage each.",
  "При третото умение: три пронизващи стрели с по 23 щети."
 ],
 [
  "legacy.588",
  "Third skill: frost nova, 35 damage and a 1.3-second slow.",
  "При третото умение: ледена нова с 35 щети и 1.3 сек забавяне."
 ],
 [
  "legacy.589",
  "Third skill: heals 4% life and fires three bone spears.",
  "При третото умение: лекува 4% живот и изстрелва три костни копия."
 ],
 [
  "legacy.590",
  "Third skill: 2 seconds of protection and a holy strike dealing 38 damage.",
  "При третото умение: 2 сек защита и свещен удар с 38 щети."
 ],
 [
  "legacy.591",
  "Third skill: poison wave dealing 32 damage and a 2-second speed boost.",
  "При третото умение: отровна вълна с 32 щети и 2 сек ускорение."
 ],
 [
  "legacy.592",
  "Relic",
  "Реликва"
 ],
 [
  "legacy.593",
  "Complete level ",
  "Премини ниво "
 ],
 [
  "legacy.594",
  " act",
  " акт"
 ],
 [
  "legacy.595",
  "Earthbreak",
  "Земен разлом"
 ],
 [
  "legacy.596",
  "Fox Vault",
  "Лисичи скок"
 ],
 [
  "legacy.597",
  "Veilstep",
  "Стъпка през воала"
 ],
 [
  "legacy.598",
  "Soul Drift",
  "Душевен устрем"
 ],
 [
  "legacy.599",
  "Oath Charge",
  "Щурм на обета"
 ],
 [
  "legacy.600",
  "Raven Dive",
  "Гарванов полет"
 ],
 [
  "legacy.601",
  "Leap over obstacles; impact damage and slow on landing.",
  "Скок над препятствия; удар и забавяне при приземяване."
 ],
 [
  "legacy.602",
  "Quick low vault over obstacles; 1.5 seconds of speed afterward.",
  "Бърз нисък скок над препятствия; 1.5 сек ускорение след него."
 ],
 [
  "legacy.603",
  "Instantly pass through obstacles to a free landing point.",
  "Мигновено преместване през препятствия до свободна точка."
 ],
 [
  "legacy.604",
  "Brief spectral dash through obstacles; restores 4% life.",
  "Кратък призрачен устрем през препятствия; възстановява 4% живот."
 ],
 [
  "legacy.605",
  "Ground charge; stops at walls and damages enemies along the path.",
  "Щурм по земята; спира пред стени и удря враговете по пътя."
 ],
 [
  "legacy.606",
  "Fly toward an enemy ahead; impact damage and slow on landing.",
  "Полет към враг пред теб; удар и забавяне при кацане."
 ],
 [
  "legacy.607",
  "Traveler's ",
  "Пътнически "
 ],
 [
  "legacy.608",
  " of ",
  " на "
 ],
 [
  "legacy.609",
  "the Exile",
  "изгнаника"
 ],
 [
  "legacy.610",
  "the Sand Wind",
  "пясъчния вятър"
 ],
 [
  "legacy.611",
  "Thorns",
  "тръните"
 ],
 [
  "legacy.612",
  "Embers",
  "жаравата"
 ],
 [
  "legacy.613",
  "Death approaches. Retreat to keep only your earned gold.",
  "Смъртта идва. При оттегляне запазваш само златото."
 ],
 [
  "legacy.614",
  "<div class=\"eyebrow danger\">GUARDIAN · ",
  "<div class=\"eyebrow danger\">ПАЗИТЕЛ · "
 ],
 [
  "legacy.615",
  " ACT</div><div class=\"hero-view\"><img alt=\"\" src=\"",
  " АКТ</div><div class=\"hero-view\"><img alt=\"\" src=\""
 ],
 [
  "legacy.616",
  "</h2><p class=\"small\">Watch the warning circles. Victory awards ",
  "</h2><p class=\"small\">Пази се от предупредителните кръгове. Победата носи "
 ],
 [
  "legacy.617",
  " and a chance at a set recipe.</p>",
  " и шанс за сетова рецепта.</p>"
 ],
 [
  "legacy.618",
  "<div class=\"v6-layout v6-town\"><div><div class=\"eyebrow\">ASHEN KEEP</div><h1>Four acts.<br>One destiny.</h1><p class=\"subtitle\">48 trials beyond the gates</p><p class=\"small\">Death preserves only gold earned in this run. Purchased upgrades and equipment secured through victory remain forever.</p><div class=\"v6-notice\">",
  "<div class=\"v6-layout v6-town\"><div><div class=\"eyebrow\">КРЕПОСТТА НА ПЕПЕЛТА</div><h1>Четири акта.<br>Една съдба.</h1><p class=\"subtitle\">48 изпитания отвъд портите</p><p class=\"small\">При смърт прибираш само златото от опита. Купените подобрения и прибраната при победа екипировка остават завинаги.</p><div class=\"v6-notice\">"
 ],
 [
  "legacy.619",
  "/48 levels<br>Heroes: ",
  "/48 нива<br>Герои: "
 ],
 [
  "legacy.620",
  "\" style=\"height:130px;float:left;margin-right:16px\"><p class=\"small\">18 class spells · 6 movement skills<br>8 equipment slots · 4 sets<br>Boss materials and permanent relics</p></div><div><div class=\"v6-grid\">",
  "\" style=\"height:130px;float:left;margin-right:16px\"><p class=\"small\">18 класови магии · 6 придвижвания<br>8 слота за екипировка · 4 сета<br>Босови материали и постоянни реликви</p></div><div><div class=\"v6-grid\">"
 ],
 [
  "legacy.621",
  "◈ Campaign · four acts",
  "◈ Кампания · четири акта"
 ],
 [
  "legacy.622",
  "⚒ Equipment and forge",
  "⚒ Екипировка и ковачница"
 ],
 [
  "legacy.623",
  "✥ Talents and relics",
  "✥ Таланти и реликви"
 ],
 [
  "legacy.624",
  "♜ Legacy · buy with gold",
  "♜ Наследство · със злато"
 ],
 [
  "legacy.625",
  "Continue · level ",
  "Продължи · ниво "
 ],
 [
  "legacy.626",
  "Test all levels and heroes",
  "Изпитай всички нива и герои"
 ],
 [
  "legacy.627",
  "<p class=\"v6-footer\">Portrait and landscape · two-finger controls<br>Your save is local to this browser.</p></div></div>",
  "<p class=\"v6-footer\">Портрет и landscape · управление с два пръста<br>Записът е локален за този браузър.</p></div></div>"
 ],
 [
  "legacy.628",
  "<div class=\"eyebrow\">HERO ",
  "<div class=\"eyebrow\">ГЕРОЙ "
 ],
 [
  "legacy.629",
  " life</span><span>◈ ",
  " живот</span><span>◈ "
 ],
 [
  "legacy.630",
  " mana</span><span>♜ ",
  " мана</span><span>♜ "
 ],
 [
  "legacy.631",
  " armor</span><span>➜ ",
  " броня</span><span>➜ "
 ],
 [
  "legacy.632",
  " speed</span><span>⚔ ",
  " скорост</span><span>⚔ "
 ],
 [
  "legacy.633",
  "% damage</span><span>✦ ",
  "% щети</span><span>✦ "
 ],
 [
  "legacy.634",
  "% critical chance</span></div><p class=\"v6-footer\">Base class attributes before equipment, legacy and combat build.</p><div class=\"v6-notice\"><b>",
  "% критичен шанс</span></div><p class=\"v6-footer\">Основни класови стойности преди екипировка, наследство и боен билд.</p><div class=\"v6-notice\"><b>"
 ],
 [
  "legacy.635",
  " sec<br>",
  " сек<br>"
 ],
 [
  "legacy.636",
  " mana<br><small>",
  " мана<br><small>"
 ],
 [
  "legacy.637",
  " sec</small></em></div>",
  " сек</small></em></div>"
 ],
 [
  "legacy.638",
  "</div><p class=\"small\"><b>Boss relic: ",
  "</div><p class=\"small\"><b>Босова реликва: "
 ],
 [
  "legacy.639",
  " From rank 2: +8% power per rank. Additional cooldown: 12 seconds.</p>",
  " От ранг 2: +8% сила на ранг. Допълнително презареждане 12 сек.</p>"
 ],
 [
  "legacy.640",
  "Select and continue",
  "Избери и продължи"
 ],
 [
  "legacy.641",
  "<p class=\"danger\">Locked · ",
  "<p class=\"danger\">Заключен · "
 ],
 [
  "legacy.642",
  "<div class=\"eyebrow\">CAMPAIGN · ",
  "<div class=\"eyebrow\">КАМПАНИЯ · "
 ],
 [
  "legacy.643",
  "<div class=\"v6-card\"><span class=\"v6-tag\">ZONE ",
  "<div class=\"v6-card\"><span class=\"v6-tag\">ЗОНА "
 ],
 [
  "legacy.644",
  " Level ",
  " Ниво "
 ],
 [
  "legacy.645",
  " · Recipes: ",
  " · Рецепти: "
 ],
 [
  "legacy.646",
  "</b><br>Guardian: ",
  "</b><br>Пазител: "
 ],
 [
  "legacy.647",
  " until appearance<br>Difficulty ",
  " до появата му<br>Трудност "
 ],
 [
  "legacy.648",
  "− Difficulty",
  "− Трудност"
 ],
 [
  "legacy.649",
  "+ Difficulty",
  "+ Трудност"
 ],
 [
  "legacy.650",
  "</div><p class=\"small\">Each level has its own guardian and difficulty. Victory carries the temporary build into the next level. Death starts a new build prepared for the selected level.</p><div class=\"v6-actions\">",
  "</div><p class=\"small\">Всяко ниво има собствен пазител и трудност. След победа пренасяш временния билд в следващото ниво. След смърт започваш нов билд с подготовка за избраното ниво.</p><div class=\"v6-actions\">"
 ],
 [
  "legacy.651",
  "Enter selected level",
  "Влез в избраното ниво"
 ],
 [
  "legacy.652",
  "</span> — 2 pieces: ",
  "</span> — 2 части: "
 ],
 [
  "legacy.653",
  "+18 life",
  "+18 живот"
 ],
 [
  "legacy.654",
  "−4% cooldown",
  "−4% презареждане"
 ],
 [
  "legacy.655",
  "+0.35 life/sec",
  "+0.35 живот/сек"
 ],
 [
  "legacy.656",
  "+5% damage",
  "+5% щети"
 ],
 [
  "legacy.657",
  "; 3 pieces: ",
  "; 3 части: "
 ],
 [
  "legacy.658",
  "+15 mana",
  "+15 мана"
 ],
 [
  "legacy.659",
  "+5% speed",
  "+5% скорост"
 ],
 [
  "legacy.660",
  "+4% critical chance",
  "+4% критичен шанс"
 ],
 [
  "legacy.661",
  "<h2>Equipment · eight slots</h2><div class=\"v6-actions\">",
  "<h2>Екипировка · осем слота</h2><div class=\"v6-actions\">"
 ],
 [
  "legacy.662",
  "Shop · buy with gold",
  "Магазин · купи със злато"
 ],
 [
  "legacy.663",
  "Recipes and sets",
  "Рецепти и сетове"
 ],
 [
  "legacy.664",
  "empty",
  "празен"
 ],
 [
  "legacy.665",
  "</p><p class=\"small\">Tempering: +10% of base power per rank, maximum +5; no failure or item loss. Active pieces: ",
  "</p><p class=\"small\">Закаляване: +10% от основния ефект на ранг, максимум +5; без неуспех и без загуба на предмет. Активни части: "
 ],
 [
  "legacy.666",
  "\">Set: ",
  "\">Сет: "
 ],
 [
  "legacy.667",
  "Unequip",
  "Свали"
 ],
 [
  "legacy.668",
  "Maximum rank",
  "Максимален ранг"
 ],
 [
  "legacy.669",
  "Starter item",
  "Начален предмет"
 ],
 [
  "legacy.670",
  "/80 slots. On victory, overflow loot becomes fragments. Dismantling returns 20% of the base price, excluding tempering costs.</p>",
  "/80 места. При победа излишната плячка става на отломки. Разглобяването връща 20% от базовата цена, без похарченото за закаляване.</p>"
 ],
 [
  "legacy.671",
  "<h2>Smith's book</h2><p class=\"v6-notice\">Missing-recipe chance: 23% / 35% / 50% by level within the zone. After 4 victories without a recipe, the next is guaranteed for that act. Secured only on victory. Recipes are permanent and never consumed.</p><div class=\"v7-stats\">",
  "<h2>Книгата на ковача</h2><p class=\"v6-notice\">Шанс за липсваща рецепта: 23% / 35% / 50% според нивото в зоната. След 4 победи без рецепта следващата е гарантирана за съответния акт. Приема се само при победа. Рецептите са постоянни и не се изразходват.</p><div class=\"v7-stats\">"
 ],
 [
  "legacy.672",
  " ACT · ",
  " АКТ · "
 ],
 [
  "legacy.673",
  "LEARNED",
  "НАУЧЕНА"
 ],
 [
  "legacy.674",
  "UNDISCOVERED",
  "НЕОТКРИТА"
 ],
 [
  "legacy.675",
  "Craft · ",
  "Изработи · "
 ],
 [
  "legacy.676",
  "<div class=\"v6-card v7-relic\"><span class=\"v6-tag\">BOSS RELIC · RANK ",
  "<div class=\"v6-card v7-relic\"><span class=\"v6-tag\">БОСОВА РЕЛИКВА · РАНГ "
 ],
 [
  "legacy.677",
  "</p><p>Triggers with the third class spell. Rank 1 unlocks the skill; further ranks add 8% of base power each. Cooldown: 12 seconds.</p><small>",
  "</p><p>Задейства се с третата класова магия. Ранг 1 отключва умението; следващите дават +8% от основната му сила. Презареждане: 12 сек.</p><small>"
 ],
 [
  "legacy.678",
  " · available ",
  " · налични "
 ],
 [
  "legacy.679",
  "Full mastery",
  "Пълно майсторство"
 ],
 [
  "legacy.680",
  "Unlock",
  "Отключи"
 ],
 [
  "legacy.681",
  "TEST · NO PROGRESS",
  "ТЕСТ · БЕЗ ПРОГРЕС"
 ],
 [
  "legacy.682",
  "LEVEL ",
  "НИВО "
 ],
 [
  "legacy.683",
  " ACT",
  " АКТ"
 ],
 [
  "legacy.684",
  "CAMPAIGN COMPLETE",
  "КАМПАНИЯТА Е ПРЕМИНАТА"
 ],
 [
  "legacy.685",
  "ZONE COMPLETE",
  "ЗОНАТА Е ПРЕМИНАТА"
 ],
 [
  "legacy.686",
  "GUARDIAN DEFEATED",
  "ПАЗИТЕЛЯТ Е ПОБЕДЕН"
 ],
 [
  "legacy.687",
  "</b>Souls</div></div><p class=\"v6-notice\">",
  "</b>Души</div></div><p class=\"v6-notice\">"
 ],
 [
  "legacy.688",
  "Testing grants no rewards and does not change your save.",
  "Тестът не дава награди и не променя записа."
 ],
 [
  "legacy.689",
  "Items secured: ",
  "Прибрани предмети: "
 ],
 [
  "legacy.690",
  " · Overflow fragments: ",
  " · Отломки от препълване: "
 ],
 [
  "legacy.691",
  "<br>New recipe: ",
  "<br>Нова рецепта: "
 ],
 [
  "legacy.692",
  "<br>No new recipe this time.",
  "<br>Няма нова рецепта този път."
 ],
 [
  "legacy.693",
  "Only gold earned in this run was secured. Temporary levels, weapon upgrades and unsecured loot were lost. Permanent purchases and unlocks remain.",
  "Прибрано е само златото от този опит. Временните нива, магически подобрения и неприбраната плячка са изгубени. Постоянните покупки и отключвания остават."
 ],
 [
  "legacy.694",
  "<div class=\"v6-notice\">A new hero is unlocked!</div>",
  "<div class=\"v6-notice\">Отключен е нов герой!</div>"
 ],
 [
  "legacy.695",
  "Next level",
  "Следващо ниво"
 ],
 [
  "legacy.696",
  "<h2>Training ground · all 48 levels</h2><p class=\"v6-notice\">All heroes, acts and levels can be tested without rewards or save changes. “Boss” provides a prepared build.</p><div class=\"v6-actions\">",
  "<h2>Полигон · всички 48 нива</h2><p class=\"v6-notice\">Всички герои, актове и нива са достъпни за тест, без награди или промяна на записа. „Бос“ дава подготвен билд.</p><div class=\"v6-actions\">"
 ],
 [
  "legacy.697",
  "Full level",
  "Цялото ниво"
 ]
];
I18N_ROWS.push(...[["fragment.0", "Drag on the left to move. Attacks fire automatically. Use the skill and dash buttons on the right.", "Плъзгай вляво за движение. Атаките са автоматични. Вдясно са умението и уклонът."], ["fragment.1", "Move left • skill right • automatic attacks", "Движение вляво • умение вдясно • автоматични атаки"], ["fragment.2", "The final gate opens at 12:00. Defeat the Lord of Ruin.", "Последната порта се отваря в 12:00. Победи Владетеля на разрухата."], ["fragment.3", ">Bulgarian", ">Български"], ["fragment.4", "Exile's Edge", "Острието на изгнаника"], ["fragment.5", "Mantle of Return", "Наметало на завръщането"], ["fragment.6", "Forgotten Relic", "Забравена реликва"], ["fragment.7", "Defeat the guardian of zone ", "Победи пазителя на подзона "], ["fragment.8", "Weapon", "Оръжие"], ["fragment.9", "Armor", "Доспех"], ["fragment.10", "Charm", "Талисман"], ["fragment.11", "Common", "Обикновен"], ["fragment.12", "Magic", "Магически"], ["fragment.13", "Rare", "Рядък"], ["fragment.14", "Legendary", "Легендарен"], ["fragment.15", "Warden's Blade", "Стражево острие"], ["fragment.16", "Traveler's Mail", "Ризница на пътника"], ["fragment.17", "Seal of Dawn", "Печат на зората"], ["fragment.18", "Steel Mastery", "Стоманено майсторство"], ["fragment.19", "Unbroken", "Несломимост"], ["fragment.20", "Battle Discipline", "Бойна дисциплина"], ["fragment.21", "Deadly Precision", "Смъртоносна точност"], ["fragment.22", "Keen Sight", "Остър поглед"], ["fragment.23", "Hunting Rhythm", "Ловен ритъм"], ["fragment.24", "Living Ember", "Жива жарава"], ["fragment.25", "Wider Horizon", "Разширен хоризонт"], ["fragment.26", "Quiet Focus", "Тиха концентрация"], ["fragment.27", "Grave Knowledge", "Гробно знание"], ["fragment.28", "Eternal Pact", "Вечен договор"], ["fragment.29", "Flow of Souls", "Поток на душите"], ["fragment.30", "Power of the Oath", "Сила на обета"], ["fragment.31", "Oath Shield", "Щит на клетвата"], ["fragment.32", "Radiant Will", "Светла воля"], ["fragment.33", "Night Precision", "Нощна прецизност"], ["fragment.34", "Silent Steps", "Безшумни стъпки"], ["fragment.35", "Shadow Rhythm", "Сенчест ритъм"], ["fragment.36", "% damage", "% щети"], ["fragment.37", " life", " живот"], ["fragment.38", "% experience", "% опит"], ["fragment.39", "Exile's Blade", "Острие на изгнаника"], ["fragment.40", "Iron Verdict", "Желязна присъда"], ["fragment.41", "Ashen Blade", "Клинок на пепелта"], ["fragment.42", "Traveler's Guard", "Стража на пътника"], ["fragment.43", "Bone Bastion", "Костен бастион"], ["fragment.44", "Oath Mail", "Ризница на обета"], ["fragment.45", "Seal of Mist", "Печат на мъглата"], ["fragment.46", "Eye of Dawn", "Око на зората"], ["fragment.47", "Soul Amulet", "Амулет на душите"], ["fragment.48", "Death approaches. Retreat to keep your earned resources.", "Смъртта идва. Можеш да се оттеглиш и да запазиш ресурсите."], ["fragment.49", "Level ", "Ниво "], ["fragment.50", "◉ Move", "◉ Движение"], ["fragment.51", "TEST · no rewards or unlocks", "ТЕСТ · без награди и отключване"], ["fragment.52", "Enemies ", "Врагове "], ["fragment.53", " · Projectiles ", " · Снаряди "], ["fragment.54", "Animations ", "Анимации "], ["fragment.55", "HELLBOUND / Act I · v6.0", "HELLBOUND / Акт I · v6.0"], ["fragment.56", "ASHEN KEEP", "КРЕПОСТТА НА ПЕПЕЛТА"], ["fragment.57", "Four gates.", "Четири порти."], ["fragment.58", "One exile.", "Един изгнаник."], ["fragment.59", "The Fallen Lands · Act I", "Падналите земи · Акт I"], ["fragment.60", "Prepare your hero, temper your relics and break the four seals. Earned rewards remain after defeat.", "Подготви героя, закали намерените реликви и разруши четирите печата. При загуба запазваш спечеленото."], ["fragment.61", "/4 zones cleared", "/4 подзони преминати"], ["fragment.62", "Next hero: ", "Следващ герой: "], ["fragment.63", "12 weapons · evolutions", "12 оръжия · еволюции"], ["fragment.64", "3 active skills", "3 активни умения"], ["fragment.65", "Permanent talents and items", "Постоянни таланти и предмети"], ["fragment.66", "Portrait / Landscape · original dark fantasy", "Портрет / Landscape · оригинална мрачна фентъзи визия"], ["fragment.67", "Progress is stored locally in this browser.", "Напредъкът е локален за този браузър."], ["fragment.68", "defeat the next guardian", "победи следващия пазител"], ["fragment.69", "final zone on difficulty 2", "финална подзона на трудност 2"], ["fragment.70", "◈ Gates of Act I", "◈ Портите на Акт I"], ["fragment.71", "⚒ Forge", "⚒ Ковачница"], ["fragment.72", "✥ Talents", "✥ Таланти"], ["fragment.73", "♜ Legacy", "♜ Наследство"], ["fragment.74", "⚔ Heroes", "⚔ Герои"], ["fragment.75", "Settings / save", "Настройки / запис"], ["fragment.76", "Continue journey · zone ", "Продължи похода · подзона "], ["fragment.77", "Test zones and bosses", "Тест на зоните и босовете"], ["fragment.78", "THE FALLEN LANDS · ALL ACT I ZONES", "ПАДНАЛИТЕ ЗЕМИ · ВСИЧКИ ПОДЗОНИ НА АКТ I"], ["fragment.79", "The Exile's Path", "Пътят на изгнаника"], ["fragment.80", "Selected: ", "Избрана: "], ["fragment.81", " Raise difficulty after a victory; lowering it is free.", " Трудността се повишава след победа и може да се намалява безплатно."], ["fragment.82", "Guardian: ", "Пазител: "], ["fragment.83", " until guardian · Difficulty ", " до боса · Трудност "], ["fragment.84", "UNCLEARED", "НЕПРЕМИНАТА"], ["fragment.85", "Open wasteland, dead trees and broken arches.", "Открита пустош, мъртви дървета и счупени арки."], ["fragment.86", "Graves, walls and healing wells.", "Гробове, зидове и лечебни кладенци."], ["fragment.87", "Cathedral columns, cultists and spirits.", "Катедрални колони, култисти и привидения."], ["fragment.88", "Stone mazes, fire and the final seal.", "Каменни лабиринти, огън и последният печат."], ["fragment.89", "Select zone", "Избери подзоната"], ["fragment.90", "Defeat the previous guardian", "Победи предходния пазител"], ["fragment.91", "Difficulty ", "Трудност "], ["fragment.92", "The saved combat build will be restored.", "Запазеният боен билд ще бъде възстановен."], ["fragment.93", "Entering a later zone directly provides a starting combat build.", "Прякото влизане в по-късна зона дава начален боен ранг за нея."], ["fragment.94", "Enter zone", "Влез в подзоната"], ["fragment.95", "Change hero", "Смени героя"], ["fragment.96", "Back to town", "Към града"], ["fragment.97", "Forge and treasury", "Ковачница и съкровищница"], ["fragment.98", "One item per slot. Tempering adds 10% of base power per rank, up to +5. Overflow loot becomes fragments.", "Един предмет на слот. Закаляване +10% от основния ефект на ранг, до +5. При пълен сандък излишната плячка се разглобява в отломки."], ["fragment.99", "/60 slots · Dismantling returns 20% of the base price, without tempering costs. No repair fee or rank loss.", "/60 слота · Разглобяването връща 20% от началната цена, без стойността на закаляването. Няма цена за ремонт или загуба на ранг."], ["fragment.100", "Buy starter relics", "Купи начални реликви"], ["fragment.101", "Permanent attributes", "Постоянни характеристики"], ["fragment.102", "Town", "Град"], ["fragment.103", " · Rank +", " · Ранг +"], ["fragment.104", " · Level ", " · Ниво "], ["fragment.105", "✓ Equipped", "✓ Екипиран"], ["fragment.106", "Equip", "Екипирай"], ["fragment.107", "Fully tempered", "Максимално закален"], ["fragment.108", "Temper · ", "Закали · "], ["fragment.109", "Dismantle · ", "Разглоби · "], ["fragment.110", "Starter relic", "Начална реликва"], ["fragment.111", "Smith's relics", "Реликви на ковача"], ["fragment.112", "Buy · ", "Купи · "], ["fragment.113", " · Permanent talents", " · Постоянни таланти"], ["fragment.114", "Soulstones come from elites and bosses. The next talent requires 2 ranks in the previous talent.", "Камъни на душите от елити и босове. За следващия талант са нужни 2 ранга в предходния."], ["fragment.115", "RANK ", "РАНГ "], ["fragment.116", "+3% damage per rank.", "+3% щети за ранг."], ["fragment.117", "−2% cooldown and +8 mana per rank.", "−2% презареждане и +8 мана за ранг."], ["fragment.118", "+6 life per rank.", "+6 живот за ранг."], ["fragment.119", "+1.5% critical chance per rank.", "+1.5% критичен шанс за ранг."], ["fragment.120", "+4% area per rank.", "+4% обхват за ранг."], ["fragment.121", "+6% duration per rank.", "+6% продължителност за ранг."], ["fragment.122", "+1 armor per rank.", "+1 броня за ранг."], ["fragment.123", "+2% speed per rank.", "+2% скорост за ранг."], ["fragment.124", "Maximum", "Максимум"], ["fragment.125", "Learn · ", "Научи · "], ["fragment.126", "LEVEL ", "НИВО "], ["fragment.127", " · COMBAT BUILD FOR THIS RUN", " · БОЕН БИЛД ЗА ТОЗИ ПОХОД"], ["fragment.128", "Time", "Време"], ["fragment.129", "Slain", "Победени"], ["fragment.130", "TEST MODE · NO PROGRESS CHANGES", "ТЕСТОВ РЕЖИМ · ПРОГРЕСЪТ НЕ СЕ ПРОМЕНЯ"], ["fragment.131", "ACT I · ZONE ", "АКТ I · ПОДЗОНА "], ["fragment.132", "ACT I COMPLETE", "АКТ I Е ПРЕМИНАТ"], ["fragment.133", "SEAL BROKEN", "ПЕЧАТЪТ Е РАЗРУШЕН"], ["fragment.134", "BACK TO THE KEEP", "ОБРАТНО В КРЕПОСТТА"], ["fragment.135", "No rewards or unlocks.", "Няма награди или отключвания."], ["fragment.136", "Items kept: ", "Запазени предмети: "], ["fragment.137", " · Permanent equipment, talents and unlocked zones are retained.", " · Постоянната екипировка, талантите и достигнатите зони се запазват."], ["fragment.138", "A new hero is unlocked — select them in town.", "Отключен е нов герой — избери го в града."], ["fragment.139", "Next zone", "Следваща подзона"], ["fragment.140", "Try again", "Опитай отново"], ["fragment.141", "Forge", "Ковачница"], ["fragment.142", "Act I trials", "Изпитания на Акт I"], ["fragment.143", "All four zones are available for testing. Use your selected hero and equipment without rewards or save changes. “Boss now” provides a prepared build.", "Всички четири подзони са достъпни тук за тест. Използваш избрания герой и текущата екипировка, но няма награди, запис на похода или отключвания. „Бос веднага“ дава подготвен боен билд."], ["fragment.144", "Test full zone", "Тест на цялата зона"], ["fragment.145", "Boss now", "Бос веднага"], ["fragment.146", "iPhone: rotate manually with orientation lock disabled. Safari → Share → Add to Home Screen. Progress is local; export to move to another phone. Audio is synthesized.", "iPhone: завърти ръчно с изключено заключване на ориентацията. Safari → Споделяне → Добави към Начален екран. Прогресът е локален; използвай експорт за друг телефон. Звуците са синтезирани."], ["fragment.147", "SEAL GUARDIAN", "ПАЗИТЕЛ НА ПЕЧАТА"], ["fragment.148", "Watch the warning circles and use your movement skill to avoid the attack.", "Следи предупредителните кръгове и използвай придвижването, за да избегнеш удара."], ["fragment.149", " · level ", " · ниво "], ["fragment.150", "Helmet / hood", "Шлем / качулка"], ["fragment.151", " mana", " мана"], ["fragment.152", "Gloves", "Ръкавици"], ["fragment.153", "% critical chance", "% критичен шанс"], ["fragment.154", "Boots", "Ботуши"], ["fragment.155", "% speed", "% скорост"], ["fragment.156", "Cloak", "Плащ"], ["fragment.157", " life / sec", " живот / сек"], ["fragment.158", "Belt", "Пояс"], ["fragment.159", " armor", " броня"], ["fragment.160", "Ashen Oath", "Клетва на пепелта"], ["fragment.161", "Solar Covenant", "Завет на слънцето"], ["fragment.162", "Heart of Thorns", "Сърце на тръните"], ["fragment.163", "Ember Seal", "Печат на жаравата"], ["fragment.164", "Ashen Core", "Пепелно ядро"], ["fragment.165", "Sun Crystal", "Слънчев кристал"], ["fragment.166", "Thorn Essence", "Трънлива есенция"], ["fragment.167", "Ember Heart", "Сърце от жар"], ["fragment.168", "Iron Echo", "Железен отзвук"], ["fragment.169", "Falcon Volley", "Залп на сокола"], ["fragment.170", "Frost Resonance", "Леден резонанс"], ["fragment.171", "Soul Gathering", "Сбор на душите"], ["fragment.172", "Oath Dawn", "Зора на обета"], ["fragment.173", "Venom Crescent", "Отровен полумесец"], ["fragment.174", "Third skill: shockwave, 34 damage and a 0.7-second slow.", "При третото умение: ударна вълна, 34 щети и 0.7 сек забавяне."], ["fragment.175", "Third skill: three piercing arrows dealing 23 damage each.", "При третото умение: три пронизващи стрели с по 23 щети."], ["fragment.176", "Third skill: frost nova, 35 damage and a 1.3-second slow.", "При третото умение: ледена нова с 35 щети и 1.3 сек забавяне."], ["fragment.177", "Third skill: heals 4% life and fires three bone spears.", "При третото умение: лекува 4% живот и изстрелва три костни копия."], ["fragment.178", "Third skill: 2 seconds of protection and a holy strike dealing 38 damage.", "При третото умение: 2 сек защита и свещен удар с 38 щети."], ["fragment.179", "Third skill: poison wave dealing 32 damage and a 2-second speed boost.", "При третото умение: отровна вълна с 32 щети и 2 сек ускорение."], ["fragment.180", "Relic", "Реликва"], ["fragment.181", "Complete level ", "Премини ниво "], ["fragment.182", " act", " акт"], ["fragment.183", "Leap over obstacles; impact damage and slow on landing.", "Скок над препятствия; удар и забавяне при приземяване."], ["fragment.184", "Quick low vault over obstacles; 1.5 seconds of speed afterward.", "Бърз нисък скок над препятствия; 1.5 сек ускорение след него."], ["fragment.185", "Instantly pass through obstacles to a free landing point.", "Мигновено преместване през препятствия до свободна точка."], ["fragment.186", "Brief spectral dash through obstacles; restores 4% life.", "Кратък призрачен устрем през препятствия; възстановява 4% живот."], ["fragment.187", "Ground charge; stops at walls and damages enemies along the path.", "Щурм по земята; спира пред стени и удря враговете по пътя."], ["fragment.188", "Fly toward an enemy ahead; impact damage and slow on landing.", "Полет към враг пред теб; удар и забавяне при кацане."], ["fragment.189", "Traveler's ", "Пътнически "], ["fragment.190", " of ", " на "], ["fragment.191", "the Exile", "изгнаника"], ["fragment.192", "the Sand Wind", "пясъчния вятър"], ["fragment.193", "Thorns", "тръните"], ["fragment.194", "Embers", "жаравата"], ["fragment.195", "Death approaches. Retreat to keep only your earned gold.", "Смъртта идва. При оттегляне запазваш само златото."], ["fragment.196", "GUARDIAN · ", "ПАЗИТЕЛ · "], ["fragment.197", " ACT", " АКТ"], ["fragment.198", "Watch the warning circles. Victory awards ", "Пази се от предупредителните кръгове. Победата носи "], ["fragment.199", " and a chance at a set recipe.", " и шанс за сетова рецепта."], ["fragment.200", "Four acts.", "Четири акта."], ["fragment.201", "One destiny.", "Една съдба."], ["fragment.202", "48 trials beyond the gates", "48 изпитания отвъд портите"], ["fragment.203", "Death preserves only gold earned in this run. Purchased upgrades and equipment secured through victory remain forever.", "При смърт прибираш само златото от опита. Купените подобрения и прибраната при победа екипировка остават завинаги."], ["fragment.204", "/48 levels", "/48 нива"], ["fragment.205", "Heroes: ", "Герои: "], ["fragment.206", "18 class spells · 6 movement skills", "18 класови магии · 6 придвижвания"], ["fragment.207", "8 equipment slots · 4 sets", "8 слота за екипировка · 4 сета"], ["fragment.208", "Boss materials and permanent relics", "Босови материали и постоянни реликви"], ["fragment.209", "◈ Campaign · four acts", "◈ Кампания · четири акта"], ["fragment.210", "⚒ Equipment and forge", "⚒ Екипировка и ковачница"], ["fragment.211", "✥ Talents and relics", "✥ Таланти и реликви"], ["fragment.212", "♜ Legacy · buy with gold", "♜ Наследство · със злато"], ["fragment.213", "Continue · level ", "Продължи · ниво "], ["fragment.214", "Test all levels and heroes", "Изпитай всички нива и герои"], ["fragment.215", "Portrait and landscape · two-finger controls", "Портрет и landscape · управление с два пръста"], ["fragment.216", "Your save is local to this browser.", "Записът е локален за този браузър."], ["fragment.217", "HERO ", "ГЕРОЙ "], ["fragment.218", " speed", " скорост"], ["fragment.219", "Base class attributes before equipment, legacy and combat build.", "Основни класови стойности преди екипировка, наследство и боен билд."], ["fragment.220", " sec", " сек"], ["fragment.221", "Boss relic: ", "Босова реликва: "], ["fragment.222", " From rank 2: +8% power per rank. Additional cooldown: 12 seconds.", " От ранг 2: +8% сила на ранг. Допълнително презареждане 12 сек."], ["fragment.223", "Select and continue", "Избери и продължи"], ["fragment.224", "Locked · ", "Заключен · "], ["fragment.225", "CAMPAIGN · ", "КАМПАНИЯ · "], ["fragment.226", "ZONE ", "ЗОНА "], ["fragment.227", " Level ", " Ниво "], ["fragment.228", " · Recipes: ", " · Рецепти: "], ["fragment.229", " until appearance", " до появата му"], ["fragment.230", "− Difficulty", "− Трудност"], ["fragment.231", "+ Difficulty", "+ Трудност"], ["fragment.232", "Each level has its own guardian and difficulty. Victory carries the temporary build into the next level. Death starts a new build prepared for the selected level.", "Всяко ниво има собствен пазител и трудност. След победа пренасяш временния билд в следващото ниво. След смърт започваш нов билд с подготовка за избраното ниво."], ["fragment.233", "Enter selected level", "Влез в избраното ниво"], ["fragment.234", " — 2 pieces: ", " — 2 части: "], ["fragment.235", "+18 life", "+18 живот"], ["fragment.236", "−4% cooldown", "−4% презареждане"], ["fragment.237", "+0.35 life/sec", "+0.35 живот/сек"], ["fragment.238", "+5% damage", "+5% щети"], ["fragment.239", "; 3 pieces: ", "; 3 части: "], ["fragment.240", "+15 mana", "+15 мана"], ["fragment.241", "+5% speed", "+5% скорост"], ["fragment.242", "+4% critical chance", "+4% критичен шанс"], ["fragment.243", "Equipment · eight slots", "Екипировка · осем слота"], ["fragment.244", "Shop · buy with gold", "Магазин · купи със злато"], ["fragment.245", "Recipes and sets", "Рецепти и сетове"], ["fragment.246", "empty", "празен"], ["fragment.247", "Tempering: +10% of base power per rank, maximum +5; no failure or item loss. Active pieces: ", "Закаляване: +10% от основния ефект на ранг, максимум +5; без неуспех и без загуба на предмет. Активни части: "], ["fragment.248", "\">Set: ", "\">Сет: "], ["fragment.249", "Unequip", "Свали"], ["fragment.250", "Maximum rank", "Максимален ранг"], ["fragment.251", "Starter item", "Начален предмет"], ["fragment.252", "/80 slots. On victory, overflow loot becomes fragments. Dismantling returns 20% of the base price, excluding tempering costs.", "/80 места. При победа излишната плячка става на отломки. Разглобяването връща 20% от базовата цена, без похарченото за закаляване."], ["fragment.253", "Smith's book", "Книгата на ковача"], ["fragment.254", "Missing-recipe chance: 23% / 35% / 50% by level within the zone. After 4 victories without a recipe, the next is guaranteed for that act. Secured only on victory. Recipes are permanent and never consumed.", "Шанс за липсваща рецепта: 23% / 35% / 50% според нивото в зоната. След 4 победи без рецепта следващата е гарантирана за съответния акт. Приема се само при победа. Рецептите са постоянни и не се изразходват."], ["fragment.255", " ACT · ", " АКТ · "], ["fragment.256", "LEARNED", "НАУЧЕНА"], ["fragment.257", "UNDISCOVERED", "НЕОТКРИТА"], ["fragment.258", "Craft · ", "Изработи · "], ["fragment.259", "BOSS RELIC · RANK ", "БОСОВА РЕЛИКВА · РАНГ "], ["fragment.260", "Triggers with the third class spell. Rank 1 unlocks the skill; further ranks add 8% of base power each. Cooldown: 12 seconds.", "Задейства се с третата класова магия. Ранг 1 отключва умението; следващите дават +8% от основната му сила. Презареждане: 12 сек."], ["fragment.261", " · available ", " · налични "], ["fragment.262", "Full mastery", "Пълно майсторство"], ["fragment.263", "Unlock", "Отключи"], ["fragment.264", "TEST · NO PROGRESS", "ТЕСТ · БЕЗ ПРОГРЕС"], ["fragment.265", "CAMPAIGN COMPLETE", "КАМПАНИЯТА Е ПРЕМИНАТА"], ["fragment.266", "ZONE COMPLETE", "ЗОНАТА Е ПРЕМИНАТА"], ["fragment.267", "GUARDIAN DEFEATED", "ПАЗИТЕЛЯТ Е ПОБЕДЕН"], ["fragment.268", "Testing grants no rewards and does not change your save.", "Тестът не дава награди и не променя записа."], ["fragment.269", "Items secured: ", "Прибрани предмети: "], ["fragment.270", " · Overflow fragments: ", " · Отломки от препълване: "], ["fragment.271", "New recipe: ", "Нова рецепта: "], ["fragment.272", "No new recipe this time.", "Няма нова рецепта този път."], ["fragment.273", "Only gold earned in this run was secured. Temporary levels, weapon upgrades and unsecured loot were lost. Permanent purchases and unlocks remain.", "Прибрано е само златото от този опит. Временните нива, магически подобрения и неприбраната плячка са изгубени. Постоянните покупки и отключвания остават."], ["fragment.274", "A new hero is unlocked!", "Отключен е нов герой!"], ["fragment.275", "Next level", "Следващо ниво"], ["fragment.276", "Training ground · all 48 levels", "Полигон · всички 48 нива"], ["fragment.277", "All heroes, acts and levels can be tested without rewards or save changes. “Boss” provides a prepared build.", "Всички герои, актове и нива са достъпни за тест, без награди или промяна на записа. „Бос“ дава подготвен билд."], ["fragment.278", "Full level", "Цялото ниво"]]);
I18N_ROWS.push(...[["font.size", "Text size", "Размер на текста"], ["font.readable", "Readable headings", "Четливи заглавия"]]);
I18N_ROWS.push(...[["input.title", "Controls", "Управление"], ["input.explain", "Keyboard bindings, click-to-move with left mouse, dash with right mouse. Gamepad: left stick moves; A/X/Y cast; B dashes. In menus: arrows/D-pad navigate, A confirms, B returns, LB/RB change tabs; right stick and triggers scroll.", "Клавиши по избор. С мишка: ляв бутон за движение, десен за придвижване. Контролер: ляв стик за движение; A/X/Y за магии; B за придвижване. В меню: стрелки/D-pad, A за избор, B назад, LB/RB за табове; десен стик и спусъци за скрол."], ["input.up", "Move up", "Движение нагоре"], ["input.down", "Move down", "Движение надолу"], ["input.left", "Move left", "Движение наляво"], ["input.right", "Move right", "Движение надясно"], ["input.spell0", "Spell 1", "Магия 1"], ["input.spell1", "Spell 2", "Магия 2"], ["input.spell2", "Spell 3", "Магия 3"], ["input.dash", "Movement skill", "Придвижване"], ["input.pause", "Pause", "Пауза"], ["input.press", "Press a key; Escape cancels", "Натисни клавиш; Escape отменя"], ["input.mouse", "Click-to-move", "Движение с мишка"], ["input.deadzone", "Stick dead zone", "Мъртва зона на стика"], ["input.rumble", "Controller vibration", "Вибрация на контролера"], ["input.reset", "Reset bindings", "Начални клавиши"], ["input.connected", "Controller connected. Game paused.", "Контролерът е свързан. Играта е на пауза."], ["input.disconnected", "Controller disconnected. Game paused.", "Контролерът е изключен. Играта е на пауза."], ["input.gamepad", "A / X / Y · B", "A / X / Y · B"], ["input.touch", "Touch: move left, cast right", "Докосване: движение вляво, магии вдясно"], ["input.runstats", "Slain: {kills} · Damage: {damage}", "Убити: {kills} · Щети: {damage}"]]);
I18N_ROWS.push(...[["rift.title", "Rifts", "Разломи"], ["rift.intro", "Fill progress by slaying enemies, then defeat the guardian before time expires. Each attempt consumes one keystone.", "Запълни напредъка с убийства, после победи пазителя навреме. Всеки опит изразходва един ключ."], ["rift.locked", "Unlock by completing campaign level 12. Your first T1 key is free.", "Отключва се след победа на ниво 12. Първият T1 ключ е безплатен."], ["rift.preview", "Enemy life ×{hp} · damage ×{damage} · {reward} fragments · {time}", "Живот ×{hp} · щети ×{damage} · {reward} отломки · {time}"], ["rift.power", "Recommended power index: {power}", "Препоръчана сила: {power}"], ["rift.biome", "Biome", "Биом"], ["rift.keys", "Keystones available: {count}", "Налични ключове: {count}"], ["rift.enter", "Open rift", "Отвори разлом"], ["rift.history", "Last 20 rifts", "Последни 20 разлома"], ["rift.win", "Rift cleared", "Разломът е затворен"], ["rift.loss", "Rift lost", "Разломът е загубен"], ["rift.export", "Export personal records", "Изнеси личните рекорди"], ["rift.result", "{shards} rift fragments · {runes} runes · {gold} gold · new T{key} key", "{shards} разломни отломки · {runes} руни · {gold} злато · нов ключ T{key}"], ["rift.lossRule", "Death keeps 50% of earned fragments; timeout or retreat keeps 25%. Gold remains. Failed keys lose one tier.", "Смъртта пази 50% от спечелените отломки; изтекло време или оттегляне — 25%. Златото остава. При загуба ключът пада с едно ниво."], ["rift.progress", "{value}% · remaining {time}", "{value}% · остават {time}"], ["affix.fire", "Flaming trails", "Пламтящи следи"], ["affix.fast", "Fast enemies", "Бързи врагове"], ["affix.elites", "Double elites", "Двойни елити"], ["affix.wells", "Wells do not heal", "Кладенците не лекуват"], ["affix.mana", "Reduced starting mana", "Намалена начална мана"], ["affix.frost", "Frozen death echoes", "Леден отглас при смърт"]]);
const I18n={
 dictionaries:{en:Object.create(null),bg:Object.create(null)},missing:new Set(),pseudo:false,
 get language(){try{return save.settings.lang==='bg'?'bg':'en';}catch(_){return (typeof navigator!=='undefined'&&/^bg/i.test(navigator.language||''))?'bg':'en';}},
 t(key,params={}){const dict=this.dictionaries[this.language];let value=dict[key];if(value===undefined){this.missing.add(key);value=this.dictionaries.en[key]??key;}
 value=String(value).replace(/\{(\w+)\}/g,(_,k)=>String(params[k]??'{'+k+'}'));return this.pseudo?'['+value.replace(/[aeiou]/gi,'$&$&')+' !!!]':value;},
 localize(value){const text=String(value??'');if(this.language==='bg')return text;return text.replace(this.pattern,part=>this.english.get(part.toLowerCase())??part);},
 number(value,options={}){return new Intl.NumberFormat(this.language,options).format(value);},
 plural(count,forms){return forms[new Intl.PluralRules(this.language).select(count)]??forms.other;},
 time(seconds){const n=Math.max(0,Math.floor(seconds));return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');},
 setLanguage(lang){if(!['bg','en'].includes(lang))return false;save.settings.lang=lang;document.documentElement.lang=lang;persist();this.renderCurrent();return true;},
 renderCurrent(){const screens={town:menu,hero:heroScreen,campaign:stageScreen,gear:gearScreen,shop:shopScreen,recipes:recipeScreen,talents:talentScreen,settings:()=>settingsScreen(settingsReturn),crypt:cryptScreen,achievements:achievementScreen,test:testScreen,pause:showPause};(screens[screenName]||menu)();},
 localizePanel(panel){if(panel)this.localizeHTML(panel);},
 localizeHTML(panel){panel.innerHTML=this.localize(panel.innerHTML);if(panel.setAttribute)panel.setAttribute('lang',this.language);}
};
for(const [key,en,bg]of I18N_ROWS){I18n.dictionaries.en[key]=en;I18n.dictionaries.bg[key]=bg;}
I18n.english=new Map(I18N_ROWS.map(row=>[row[2].toLowerCase(),row[1]]));
const i18nEscape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
I18n.pattern=new RegExp([...I18n.english.keys()].sort((a,b)=>b.length-a.length).map(i18nEscape).join('|'),'gi');
function t(key,params){return I18n.t(key,params);}
function legacy(key){return I18n.dictionaries.bg[key]??key;}
