const dns = require('dns');

console.log('🔍 Testing DNS Resolution...\n');

const hostname = '_mongodb._tcp.cluster0.ingwuuj.mongodb.net';

dns.resolveSrv(hostname, (err, addresses) => {
  if (err) {
    console.error('❌ SRV DNS resolution failed:');
    console.error('   Error:', err.message);
    console.error('\n📋 This means:');
    console.error('   1. Your DNS server cannot resolve MongoDB Atlas SRV records');
    console.error('   2. Your IP might not be whitelisted in MongoDB Atlas');
    console.error('   3. A firewall is blocking DNS queries\n');
    
    console.log('💡 Solutions:');
    console.log('   1. Go to https://cloud.mongodb.com');
    console.log('   2. Navigate to: Network Access (left sidebar)');
    console.log('   3. Click "Add IP Address"');
    console.log('   4. Click "Add Current IP Address" OR use 0.0.0.0/0 for testing');
    console.log('   5. Wait 1-2 minutes');
    console.log('   6. Try: npm run seed\n');
  } else {
    console.log('✅ DNS resolution successful!');
    console.log('📍 Addresses:', addresses);
  }
});

// Also test basic DNS
console.log('\n🔍 Testing basic DNS resolution...');
dns.lookup('cluster0.ingwuuj.mongodb.net', (err, address, family) => {
  if (err) {
    console.error('❌ Basic DNS lookup failed:', err.message);
  } else {
    console.log('✅ Basic DNS works! IP:', address);
  }
});
