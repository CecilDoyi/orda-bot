// ================================
// ORDA BOT — MVP
// ================================

const express = require('express')
const app = express()
app.use(express.json())

// ================================
// DATASET — 5 vendors, 20 products
// ================================

const vendors = [
  { id: 'v1', name: "Afia's Treats", location: 'Accra', whatsapp: '+233201000001' },
  { id: 'v2', name: "Kofi Styles",   location: 'Accra', whatsapp: '+233201000002' },
  { id: 'v3', name: "Mama Ama Kitchen", location: 'Kumasi', whatsapp: '+233201000003' },
  { id: 'v4', name: "Accra Glow Beauty", location: 'Accra', whatsapp: '+233201000004' },
  { id: 'v5', name: "TechZone GH",   location: 'Accra', whatsapp: '+233201000005' },
]

const products = [
  // Afia's Treats — baked goods
  { id: 'p1',  name: 'Cupcakes (box of 6)',   category: 'food',    price: 'GH₵ 45–60',   location: 'Accra',   vendor_id: 'v1', image: null },
  { id: 'p2',  name: 'Birthday Cake (custom)',category: 'food',    price: 'GH₵ 150–400', location: 'Accra',   vendor_id: 'v1', image: null },
  { id: 'p3',  name: 'Meat Pie (per piece)',  category: 'food',    price: 'GH₵ 8–12',    location: 'Accra',   vendor_id: 'v1', image: null },
  { id: 'p4',  name: 'Chin Chin (500g)',      category: 'food',    price: 'GH₵ 25–35',   location: 'Accra',   vendor_id: 'v1', image: null },

  // Kofi Styles — fashion
  { id: 'p5',  name: 'Kente Shirt (men)',     category: 'fashion', price: 'GH₵ 120–200', location: 'Accra',   vendor_id: 'v2', image: null },
  { id: 'p6',  name: 'Ankara Dress (women)',  category: 'fashion', price: 'GH₵ 150–250', location: 'Accra',   vendor_id: 'v2', image: null },
  { id: 'p7',  name: 'Custom Kaftan',         category: 'fashion', price: 'GH₵ 200–350', location: 'Accra',   vendor_id: 'v2', image: null },
  { id: 'p8',  name: 'Shorts & T-shirt set',  category: 'fashion', price: 'GH₵ 80–130',  location: 'Accra',   vendor_id: 'v2', image: null },

  // Mama Ama Kitchen — food
  { id: 'p9',  name: 'Jollof Rice (portion)', category: 'food',    price: 'GH₵ 30–50',   location: 'Kumasi', vendor_id: 'v3', image: null },
  { id: 'p10', name: 'Waakye (full plate)',   category: 'food',    price: 'GH₵ 25–40',   location: 'Kumasi', vendor_id: 'v3', image: null },
  { id: 'p11', name: 'Light Soup + Fufu',     category: 'food',    price: 'GH₵ 40–60',   location: 'Kumasi', vendor_id: 'v3', image: null },
  { id: 'p12', name: 'Fried Rice + Chicken',  category: 'food',    price: 'GH₵ 50–80',   location: 'Kumasi', vendor_id: 'v3', image: null },

  // Accra Glow Beauty — beauty
  { id: 'p13', name: 'Hair Braiding',         category: 'beauty',  price: 'GH₵ 80–200',  location: 'Accra',   vendor_id: 'v4', image: null },
  { id: 'p14', name: 'Lace Wig (install)',    category: 'beauty',  price: 'GH₵ 150–400', location: 'Accra',   vendor_id: 'v4', image: null },
  { id: 'p15', name: 'Facial & Skincare',     category: 'beauty',  price: 'GH₵ 100–180', location: 'Accra',   vendor_id: 'v4', image: null },
  { id: 'p16', name: 'Nail Art (full set)',   category: 'beauty',  price: 'GH₵ 60–120',  location: 'Accra',   vendor_id: 'v4', image: null },

  // TechZone GH — electronics
  { id: 'p17', name: 'Phone Screen Repair',   category: 'tech',    price: 'GH₵ 80–200',  location: 'Accra',   vendor_id: 'v5', image: null },
  { id: 'p18', name: 'Bluetooth Earbuds',     category: 'tech',    price: 'GH₵ 60–150',  location: 'Accra',   vendor_id: 'v5', image: null },
  { id: 'p19', name: 'Phone Charger (fast)',  category: 'tech',    price: 'GH₵ 30–70',   location: 'Accra',   vendor_id: 'v5', image: null },
  { id: 'p20', name: 'Phone Case (custom)',   category: 'tech',    price: 'GH₵ 20–50',   location: 'Accra',   vendor_id: 'v5', image: null },
]

// ================================
// ORDER LOG (in-memory for now)
// ================================
const orders = []

// ================================
// SEARCH FUNCTION
// ================================
function searchProducts(query) {
  const q = query.toLowerCase()
  return products.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    )
  }).slice(0, 3)
}

function getVendor(vendor_id) {
  return vendors.find(v => v.id === vendor_id)
}

// ================================
// FORMAT RESULT FOR WHATSAPP
// ================================
function formatResults(results) {
  if (results.length === 0) {
    return "Sorry, I couldn't find anything matching your search. Try keywords like *cupcakes*, *jollof*, *wig*, *kente* or *phone repair*."
  }

  let msg = `Found *${results.length} result(s)* for you:\n\n`
  results.forEach((p, i) => {
    const vendor = getVendor(p.vendor_id)
    msg += `*${i + 1}. ${p.name}*\n`
    msg += `💰 ${p.price}\n`
    msg += `🏪 ${vendor.name}\n`
    msg += `📍 ${p.location}\n`
    msg += `Reply *ORDER ${p.id}* to order this\n`
    msg += `\n`
  })
  msg += `_Powered by Orda_ ✓`
  return msg
}

// ================================
// SESSION STORE (tracks order state)
// ================================
const sessions = {}

// ================================
// PROCESS INCOMING MESSAGE
// ================================
function processMessage(from, message) {
  const text = message.trim().toLowerCase()

  // Check if user is confirming an order
  if (sessions[from] && sessions[from].pendingProduct) {
    if (text === 'yes' || text === 'confirm' || text === 'y') {
      const product = sessions[from].pendingProduct
      const vendor = getVendor(product.vendor_id)

      // Log the order
      const order = {
        id: 'ORD' + Date.now(),
        buyer: from,
        product: product.name,
        vendor: vendor.name,
        vendor_whatsapp: vendor.whatsapp,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }
      orders.push(order)

      // Clear session
      delete sessions[from]

      // Simulate vendor notification
      console.log(`\n🔔 VENDOR NOTIFICATION → ${vendor.name} (${vendor.whatsapp})`)
      console.log(`   New order: ${product.name} from ${from}`)
      console.log(`   Order ID: ${order.id}`)

      return `✅ *Order confirmed!*\n\nOrder ID: *${order.id}*\nProduct: ${product.name}\nVendor: ${vendor.name}\n\nThe vendor has been notified and will contact you shortly on WhatsApp.\n\n_Thank you for using Orda_ 🙏`
    }

    if (text === 'no' || text === 'cancel' || text === 'n') {
      delete sessions[from]
      return `No problem! Send me another search to find something else.`
    }
  }

  // Check if user is ordering a specific product
  if (text.startsWith('order p')) {
    const productId = text.replace('order ', '').trim()
    const product = products.find(p => p.id === productId)

    if (!product) {
      return `Product not found. Please try searching again.`
    }

    const vendor = getVendor(product.vendor_id)

    // Save to session — waiting for confirmation
    sessions[from] = { pendingProduct: product }

    return `🛒 *Order Summary*\n\nProduct: *${product.name}*\nPrice: ${product.price}\nVendor: ${vendor.name}\nLocation: ${product.location}\n\nReply *YES* to confirm or *NO* to cancel.`
  }

  // Handle greetings
  if (['hi', 'hello', 'hey', 'orda', 'start'].includes(text)) {
    return `👋 Welcome to *Orda*!\n\nFind verified vendors and products across Ghana — right here on WhatsApp.\n\nJust tell me what you're looking for:\n\n🍰 _cupcakes Accra_\n👗 _ankara dress_\n🍚 _jollof Kumasi_\n💅 _nail art_\n📱 _phone repair_\n\nWhat are you looking for today?`
  }

  // Handle help
  if (text === 'help') {
    return `*Orda Help* 🆘\n\nSearch: just type what you want\nExamples:\n• _cupcakes_\n• _kente shirt Accra_\n• _phone repair_\n\nTo order: reply *ORDER p1* (use the product code shown in results)\n\nTo confirm: reply *YES* or *NO*`
  }

  // Default — treat as search
  const results = searchProducts(text)
  return formatResults(results)
}

// ================================
// WEBHOOK ROUTES
// ================================

// Verification endpoint (WhatsApp requires this)
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'orda_verify_token_2024'
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified')
    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
})

// Receive messages
app.post('/webhook', (req, res) => {
  const body = req.body

  if (body.object === 'whatsapp_business_account') {
    body.entry?.forEach(entry => {
      entry.changes?.forEach(change => {
        const messages = change.value?.messages
        if (messages && messages.length > 0) {
          messages.forEach(msg => {
            const from = msg.from
            const text = msg.text?.body || ''
            console.log(`\n📨 Message from ${from}: "${text}"`)

            const reply = processMessage(from, text)
            console.log(`📤 Reply: "${reply}"`)

            // TODO: send reply back via WhatsApp API
            // (we'll wire this up when API access is ready)
          })
        }
      })
    })
  }

  res.sendStatus(200)
})

// Test endpoint — simulate a message without WhatsApp
app.get('/test', (req, res) => {
  const message = req.query.msg || 'cupcakes'
  const from = 'test_user'
  const reply = processMessage(from, message)
  res.json({
    query: message,
    reply: reply,
    orders: orders
  })
})

// ================================
// START SERVER
// ================================
app.listen(3000, () => {
  console.log('🚀 Orda bot is running on port 3000')
  console.log('📍 Test it: GET /test?msg=cupcakes')
  console.log('🔗 Webhook: POST /webhook')
})

