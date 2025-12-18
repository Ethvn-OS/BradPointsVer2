import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (you'll need dotenv or use --env-file flag)
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

async function setupDatabase() {
    let connection;
    
    try {
        // First, connect without specifying database
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });

        console.log('Connected to MySQL server');

        // Read and execute SQL file
        const sqlFile = path.join(__dirname, 'database_setup.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Split by semicolons and execute each statement
        const statements = sql
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

        for (const statement of statements) {
            if (statement.length > 0) {
                try {
                    await connection.query(statement);
                    console.log('✓ Executed:', statement.substring(0, 50) + '...');
                } catch (err) {
                    // Ignore "already exists" errors
                    if (!err.message.includes('already exists')) {
                        console.error('Error executing statement:', err.message);
                    }
                }
            }
        }

        console.log('\n✅ Database setup completed successfully!');
        console.log('Database: bradpoints');
        console.log('Tables created: users, customers, rewards, redemption');

    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

setupDatabase();

