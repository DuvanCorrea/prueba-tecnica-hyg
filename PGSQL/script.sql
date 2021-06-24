-- -----------------------------------------------------
-- Table lideres
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS lideres;
CREATE TABLE IF NOT EXISTS LIDERES (
    codigo_lider INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo_lider)
);

-- -----------------------------------------------------
-- Table ESTADOS
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS ESTADOS;
CREATE TABLE IF NOT EXISTS ESTADOS (
    codigo_estado INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    PRIMARY KEY (codigo_estado)
);

-- -----------------------------------------------------
-- Table ENTIDAD
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS ENTIDAD;
CREATE TABLE IF NOT EXISTS ENTIDADES (
    nit INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    razon_social VARCHAR(45) NOT NULL,
    contacto VARCHAR(45) NOT NULL,
    telefono VARCHAR(45) NOT NULL,
    PRIMARY KEY (nit)
);

-- -----------------------------------------------------
-- Table PROYECTO
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS PROYECTO;
CREATE TABLE IF NOT EXISTS PROYECTOS (
    codigo_proyecto SERIAL NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    objetivo VARCHAR(150) NOT NULL,
    descripccion VARCHAR(250) NOT NULL,
    direccion VARCHAR(45) NOT NULL,
    costo_total INT NOT NULL,
    longitud FLOAT NOT NULL,
    latitud FLOAT NOT NULL,
    LIDER_codigo_lider INT NOT NULL,
    ESTADOS_codigo_estado INT NOT NULL,
    ENTIDAD_nit INT NOT NULL,
    PRIMARY KEY (codigo_proyecto),
    CONSTRAINT fk_PROYECTO_LIDER FOREIGN KEY (LIDER_codigo_lider) REFERENCES LIDERES (codigo_lider) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_PROYECTO_ESTADOS1 FOREIGN KEY (ESTADOS_codigo_estado) REFERENCES ESTADOS (codigo_estado) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_PROYECTO_ENTIDAD1 FOREIGN KEY (ENTIDAD_nit) REFERENCES ENTIDADES (nit) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table OBRERO
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS OBRERO;
CREATE TABLE IF NOT EXISTS OBREROS (
    codigo_obrero INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    PROYECTO_codigo_proyecto INT NOT NULL,
    PRIMARY KEY (codigo_obrero, PROYECTO_codigo_proyecto),
    CONSTRAINT fk_OBRERO_PROYECTO1 FOREIGN KEY (PROYECTO_codigo_proyecto) REFERENCES PROYECTOS (codigo_proyecto) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table SEGUIMINETO
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS SEGUIMINETO;
CREATE TABLE IF NOT EXISTS SEGUIMINETOS (
    codigo_seguimiento SERIAL NOT NULL,
    fecha DATE NOT NULL,
    descripccion VARCHAR(250) NOT NULL,
    avance INT NOT NULL,
    PROYECTO_codigo_proyecto INT NOT NULL,
    PRIMARY KEY (codigo_seguimiento),
    CONSTRAINT fk_SEGUIMINETO_PROYECTO1 FOREIGN KEY (PROYECTO_codigo_proyecto) REFERENCES PROYECTOS (codigo_proyecto) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table FOTO
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS FOTO;
CREATE TABLE IF NOT EXISTS FOTOS (
    codigo_foto SERIAL NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    SEGUIMINETO_codigo_seguimiento INT NOT NULL,
    PRIMARY KEY (codigo_foto),
    CONSTRAINT fk_FOTO_SEGUIMINETO1 FOREIGN KEY (SEGUIMINETO_codigo_seguimiento) REFERENCES SEGUIMINETOS (codigo_seguimiento) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table AUDITORIA
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS AUDITORIA;
CREATE TABLE IF NOT EXISTS AUDITORIAS (
    codigo_proyecto INT NOT NULL,
    fecha DATE NOT NULL
);


