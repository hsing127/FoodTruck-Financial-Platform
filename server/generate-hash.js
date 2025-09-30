import bcrypt from 'bcrypt';

async function generateHash() {
  const password = 'password123';
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  
  console.log('Password:', password);
  console.log('Hash:', hash);
  
  // Test user object
  console.log('\nAdd this to your user.json:');
  console.log(JSON.stringify({
    "Email": "test@foodtruck.com",
    "Password": hash,
    "BusinessName": "Test Food Truck",
  }, null, 2));
}

generateHash();