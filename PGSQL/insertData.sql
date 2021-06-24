INSERT INTO
    lideres(codigo_lider, nombre)
VALUES
    (1, 'Sergio Mendoza'),
    (2, 'Lucia Mesa'),
    (3, 'Carla Ramirez'),
    (4, 'Pablo Jaramillo');

INSERT INTO
    estados(codigo_estado, nombre)
VALUES
    (1, 'inicial'),
    (2, 'ejecución'),
    (3, 'entrega'),
    (4, 'estabilizacion');

INSERT INTO
    entidades(nit, nombre, razon_social, contacto, telefono)
VALUES
    (
        1,
        'entidad 1',
        'entidad 1 LTDA',
        'Luis Perez',
        3552233
    ),
    (
        2,
        'entidad 2',
        'entidad 2 S.A',
        'Luisa Perez',
        3552233
    ),
    (
        3,
        'entidad 3',
        'entidad 3 S.A.S',
        'Carlos Manila',
        3552233
    );

INSERT INTO
    proyectos(
        codigo_proyecto,
        fecha_inicio,
        fecha_fin,
        objetivo,
        descripccion,
        direccion,
        costo_total,
        longitud,
        latitud,
        lider_codigo_lider,
        estados_codigo_estado,
        entidad_nit
    )
VALUES
    (
        1,
        '2021-06-01',
        '2020-06-25',
        'Objetivo del proyecto 1',
        'Descripción el del proyecto 1',
        'Carrera 55A # 84sur - 18',
        2000000,
        6.151109,
        -75.636798,
        1,
        1,
        1
    ),
    (
        2,
        '2021-06-01',
        '2020-06-25',
        'Objetivo del proyecto 2',
        'Descripción el del proyecto 2',
        'Carrera 55A # 84sur - 18',
        2000000,
        6.151109,
        -75.636798,
        2,
        2,
        2
    ),
    (
        3,
        '2021-06-01',
        '2020-06-25',
        'Objetivo del proyecto 3',
        'Descripción el del proyecto 3',
        'Carrera 55A # 84sur - 18',
        2000000,
        6.151109,
        -75.636798,
        3,
        3,
        3
    );

INSERT INTO
    obreros (
        codigo_obrero,
        nombre,
        proyecto_codigo_proyecto
    )
VALUES
    (1, 'Pepe Pelaez', 1),
    (2, 'Pacho Pelaez', 1),
    (3, 'Rodrigo Bilbao', 1),
    (4, 'Joe', 2),
    (5, 'Pacho', 2),
    (6, 'Camilo', 2),
    (7, 'Pepe', 1),
    (8, 'Pacho', 3),
    (9, 'Ernesto', 3);

