import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    // Skip any existing ZIP file to prevent explosive recursive bloating
    if (entry.name.endsWith('.zip')) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to remove directory recursively safely
function cleanDirSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

try {
  console.log('1. Limpiando directorios anteriores...');
  cleanDirSync('dist');
  cleanDirSync('wordpress-theme/dist');
  cleanDirSync('wordpress-plugin/dist');

  // Purge any existing zip files before compiling to prevent Vite from copying them
  if (fs.existsSync('public/wordpress-theme.zip')) {
    fs.unlinkSync('public/wordpress-theme.zip');
  }
  if (fs.existsSync('wordpress-theme.zip')) {
    fs.unlinkSync('wordpress-theme.zip');
  }

  console.log('2. Ejecutando build de Vite...');
  execSync('npx vite build', { stdio: 'inherit' });

  // Copy all raw postales images directly to dist/assets/ to guarantee they exist with original names for the WordPress theme
  const srcPostalesDir = 'src/assets/images/postales';
  const destAssetsDir = 'dist/assets';
  if (fs.existsSync(srcPostalesDir)) {
    const files = fs.readdirSync(srcPostalesDir);
    for (const file of files) {
      if (file.endsWith('.jpg')) {
        fs.copyFileSync(path.join(srcPostalesDir, file), path.join(destAssetsDir, file));
      }
    }
    console.log('-> Copiadas imágenes de postales originales directamente a dist/assets para asegurar disponibilidad offline completa en el Tema.');
  }

  console.log('3. Creando directorios destino...');
  fs.mkdirSync('wordpress-theme/dist', { recursive: true });
  fs.mkdirSync('wordpress-plugin/dist', { recursive: true });
  fs.mkdirSync('public', { recursive: true });

  console.log('4. Copiando archivos de "dist" a los directorios de WordPress...');
  copyDirSync('dist', 'wordpress-theme/dist');
  copyDirSync('dist', 'wordpress-plugin/dist');

  console.log('5. Copiando archivos raíz del tema...');
  fs.copyFileSync('functions.php', 'wordpress-theme/functions.php');
  fs.copyFileSync('index.php', 'wordpress-theme/index.php');
  fs.copyFileSync('style.css', 'wordpress-theme/style.css');

  console.log('6. Generando archivo ZIP del Tema WordPress con compatibilidad PclZip...');
  const zip = new AdmZip();
  
  // Recursivamente busca y agrega archivos individualmente para evitar registros vacíos de directorios (size-0) que corrompen el extractor PclZip de WordPress
  function zipFolderRecursively(localDir, zipDirTarget) {
    const entries = fs.readdirSync(localDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullLocalPath = path.join(localDir, entry.name);
      if (entry.isDirectory()) {
        const nextZipDir = zipDirTarget ? `${zipDirTarget}/${entry.name}` : entry.name;
        zipFolderRecursively(fullLocalPath, nextZipDir);
      } else {
        zip.addLocalFile(fullLocalPath, zipDirTarget);
      }
    }
  }

  zipFolderRecursively('wordpress-theme', 'wordpress-theme');
  
  // Guardar en la raíz, en public de Vite, y en dist para descarga directa inmediata
  zip.writeZip('wordpress-theme.zip');
  zip.writeZip('public/wordpress-theme.zip');
  zip.writeZip('dist/wordpress-theme.zip');

  console.log('¡Proceso completado con éxito! Todos los assets compilados, empaquetados y el ZIP del tema listos.');
} catch (error) {
  console.error('Error durante el empaquetado de assets o creación del ZIP:', error);
  process.exit(1);
}
