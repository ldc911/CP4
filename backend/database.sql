CREATE TABLE
    user (
        id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        nickname varchar(255) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        bio TEXT,
        banPic VARCHAR(255),
        isMJ TINYINT(1)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    user (
        nickname,
        email,
        bio,
        banPic,
        isMJ
    )
VALUES (
        "Hassess",
        "test@test.com",
        "Parcours d'Hassess,occultiste de niveau 5",
        "https://random.imagecdn.app/800/300",
        0
    ), (
        "Naälia et Tagadours",
        "test2@test.com",
        "Parcours d'une drakédie et d'une féral', magelame et ensroceleuse de niveau 5",
        "https://random.imagecdn.app/800/300",
        1
    ), (
        "Grodar",
        "test3@test.com",
        "Parcours de Grodar, barbare de niveau 5",
        "https://random.imagecdn.app/800/300",
        0
    ), (
        "Kaz et Smaja",
        "test4@test.com",
        "Parcours de Kaz et Smaja, assassin et prétresse de niveau 5",
        "https://random.imagecdn.app/800/300",
        0
    ), (
        "Divin",
        "test5@test.com",
        "Parcours de Divin, forgelier de niveau 5",
        "https://random.imagecdn.app/800/300",
        1
    );

CREATE TABLE
    session (
        id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        dateSession VARCHAR(15) NOT NULL UNIQUE,
        duration VARCHAR(50) NOT NULL,
        localisation VARCHAR(255) NOT NULL,
        isCampaign TINYINT(1) NOT NULL,
        title VARCHAR(255) NOT NULL,
        user_meal INT,
        details_meals TEXT,
        user_apero INT,
        user_alcool VARCHAR(50),
        user_sweets INT,
        user_dessert INT,
        user_soft INT
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    session (
        dateSession,
        duration,
        localisation,
        isCampaign,
        title,
        user_meal,
        details_meals,
        user_apero,
        user_alcool,
        user_sweets,
        user_dessert,
        user_soft
    )
VALUES (
        "2023-O2-04",
        "Après-midi",
        "Chez Naälia",
        1,
        "Avancée campagne",
        2,
        "Côte de boeuf au barbec",
        1,
        4,
        3,
        3,
        5
    ), (
        "2023-O2-11",
        "Après-midi et soirée",
        "Chez Hassess",
        0,
        "Side quests, sortez les cassos",
        1,
        "Confits de coincoin",
        2,
        4,
        3,
        5,
        3
    );