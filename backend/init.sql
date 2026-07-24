CREATE TABLE IF NOT EXISTS perfumes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    genero VARCHAR(50) CHECK (genero IN ('Masculino', 'Femenino', 'Unisex')),
    precio DECIMAL(10, 2) NOT NULL,
    volumen_ml INTEGER,
    notas_olfativas TEXT,
    fecha_lanzamiento DATE,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO perfumes (nombre, marca, genero, precio, volumen_ml, notas_olfativas, stock) VALUES
('Sauvage', 'Dior', 'Masculino', 95.00, 100, 'Bergamota, Ambroxan, Pimienta', 15),
('Coco Mademoiselle', 'Chanel', 'Femenino', 125.00, 50, 'Naranja, Rosa, Patchouli', 8),
('Acqua di Gio', 'Giorgio Armani', 'Masculino', 75.00, 100, 'Bergamota, Jazmín, Cedro', 20);