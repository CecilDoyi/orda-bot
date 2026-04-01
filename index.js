// ================================
// ORDA BOT — MVP
// ================================

const express = require('express')
const app = express()
app.use(express.json())

// ================================
// DATASET — 5 vendors, 20 products
// ================================

// ================================
// VENDORS
// ================================
const vendors = [
  { id: 'v1', name: "Afia's Treats", location: 'accra', whatsapp: '+233201000001' },
  { id: 'v2', name: "Kofi Styles", location: 'accra', whatsapp: '+233201000002' },
  { id: 'v3', name: "Mama Ama Kitchen", location: 'kumasi', whatsapp: '+233201000003' },
  { id: 'v4', name: "Accra Glow Beauty", location: 'accra', whatsapp: '+233201000004' },
  { id: 'v5', name: "TechZone GH", location: 'accra', whatsapp: '+233201000005' },
]

// ================================
// PRODUCTS
// ================================
const products = [

  // Afia's Treats — baked goods
  {
    id: 'p1',
    name: 'Cupcakes (box of 6)',
    category: 'food',
    tags: ['cupcake', 'cupcakes', 'cake', 'dessert', 'snacks'],
    price: 'GH₵ 45–60',
    location: 'accra',
    vendor_id: 'v1',
    image: null
  },
  {
    id: 'p2',
    name: 'Birthday Cake (custom)',
    category: 'food',
    tags: ['cake', 'birthday cake', 'dessert', 'custom cake'],
    price: 'GH₵ 150–400',
    location: 'accra',
    vendor_id: 'v1',
    image: null
  },
  {
    id: 'p3',
    name: 'Meat Pie (per piece)',
    category: 'food',
    tags: ['meat pie', 'snack', 'pastry', 'food'],
    price: 'GH₵ 8–12',
    location: 'accra',
    vendor_id: 'v1',
    image: null
  },
  {
    id: 'p4',
    name: 'Chin Chin (500g)',
    category: 'food',
    tags: ['chin chin', 'snack', 'crispy', 'dessert'],
    price: 'GH₵ 25–35',
    location: 'accra',
    vendor_id: 'v1',
    image: null
  },

  // Kofi Styles — fashion
  {
    id: 'p5',
    name: 'Kente Shirt (men)',
    category: 'fashion',
    tags: ['kente', 'shirt', 'clothing', 'fashion', 'men'],
    price: 'GH₵ 120–200',
    location: 'accra',
    vendor_id: 'v2',
    image: null
  },
  {
    id: 'p6',
    name: 'Ankara Dress (women)',
    category: 'fashion',
    tags: ['ankara', 'dress', 'clothing', 'fashion', 'women'],
    price: 'GH₵ 150–250',
    location: 'accra',
    vendor_id: 'v2',
    image: null
  },
  {
    id: 'p7',
    name: 'Custom Kaftan',
    category: 'fashion',
    tags: ['kaftan', 'custom wear', 'fashion', 'men'],
    price: 'GH₵ 200–350',
    location: 'accra',
    vendor_id: 'v2',
    image: null
  },
  {
    id: 'p8',
    name: 'Shorts & T-shirt set',
    category: 'fashion',
    tags: ['shorts', 'tshirt', 'casual wear', 'clothing'],
    price: 'GH₵ 80–130',
    location: 'accra',
    vendor_id: 'v2',
    image: null
  },

  // Mama Ama Kitchen — food
  {
    id: 'p9',
    name: 'Jollof Rice (portion)',
    category: 'food',
    tags: ['jollof', 'rice', 'meal', 'food', 'lunch'],
    price: 'GH₵ 30–50',
    location: 'kumasi',
    vendor_id: 'v3',
    image: null
  },
  {
    id: 'p10',
    name: 'Waakye (full plate)',
    category: 'food',
    tags: ['waakye', 'rice', 'beans', 'meal'],
    price: 'GH₵ 25–40',
    location: 'kumasi',
    vendor_id: 'v3',
    image: null
  },
  {
    id: 'p11',
    name: 'Light Soup + Fufu',
    category: 'food',
    tags: ['fufu', 'soup', 'meal', 'traditional food'],
    price: 'GH₵ 40–60',
    location: 'kumasi',
    vendor_id: 'v3',
    image: null
  },
  {
    id: 'p12',
    name: 'Fried Rice + Chicken',
    category: 'food',
    tags: ['fried rice', 'chicken', 'meal', 'food'],
    price: 'GH₵ 50–80',
    location: 'kumasi',
    vendor_id: 'v3',
    image: null
  },

  // Accra Glow Beauty — beauty
  {
    id: 'p13',
    name: 'Hair Braiding',
    category: 'beauty',
    tags: ['hair', 'braiding', 'salon', 'beauty'],
    price: 'GH₵ 80–200',
    location: 'accra',
    vendor_id: 'v4',
    image: null
  },
  {
    id: 'p14',
    name: 'Lace Wig (install)',
    category: 'beauty',
    tags: ['wig', 'lace wig', 'hair install', 'beauty'],
    price: 'GH₵ 150–400',
    location: 'accra',
    vendor_id: 'v4',
    image: null
  },
  {
    id: 'p15',
    name: 'Facial & Skincare',
    category: 'beauty',
    tags: ['facial', 'skincare', 'beauty treatment'],
    price: 'GH₵ 100–180',
    location: 'accra',
    vendor_id: 'v4',
    image: null
  },
  {
    id: 'p16',
    name: 'Nail Art (full set)',
    category: 'beauty',
    tags: ['nails', 'nail art', 'beauty'],
    price: 'GH₵ 60–120',
    location: 'accra',
    vendor_id: 'v4',
    image: null
  },

  // TechZone GH — electronics
  {
    id: 'p17',
    name: 'Phone Screen Repair',
    category: 'tech',
    tags: ['phone', 'repair', 'screen fix', 'electronics'],
    price: 'GH₵ 80–200',
    location: 'accra',
    vendor_id: 'v5',
    image: null
  },
  {
    id: 'p18',
    name: 'Bluetooth Earbuds',
    category: 'tech',
    tags: ['earbuds', 'bluetooth', 'audio', 'electronics'],
    price: 'GH₵ 60–150',
    location: 'accra',
    vendor_id: 'v5',
    image: null
  },
  {
    id: 'p19',
    name: 'Phone Charger (fast)',
    category: 'tech',
    tags: ['charger', 'phone charger', 'electronics'],
    price: 'GH₵ 30–70',
    location: 'accra',
    vendor_id: 'v5',
    image: null
  },
  {
    id: 'p20',
    name: 'Phone Case (custom)',
    category: 'tech',
    tags: ['phone case', 'custom case', 'accessory'],
    price: 'GH₵ 20–50',
    location: 'accra',
    vendor_id: 'v5',
    image: null
  },
]

// ================================
// ORDER LOG (in-memory for now)
// ================================
const orders = []

// ================================
// SEARCH FUNCTION
// ================================

const locations = ['accra', 'tema', 'circle', 'east legon', 'madina', 'achimota', 'dome']

function parseQuery(text) {
  let location = null
  let product = text

  locations.forEach(loc => {
    if (text.includes(loc)) {
      location = loc
      product = text.replace(loc, '').trim()
    }
  })

  return { product, location }
} 

function searchProducts(query) {
  const text = query.toLowerCase()

  const { product, location } = parseQuery(text)

  return products.filter(p => {
    const matchesProduct =
  p.name.toLowerCase().includes(product) ||
  p.category.toLowerCase().includes(product) ||
  p.tags.some(tag => tag.includes(product))
    const matchesLocation = location
      ? p.location.toLowerCase().includes(location)
      : true

    return matchesProduct && matchesLocation
  })
}

function getVendor(vendor_id) {
  return vendors.find(v => v.id === vendor_id)
}

// ================================
// FORMAT RESULT FOR WHATSAPP
// ================================
function formatResults(results) {
  if (results.length === 0) {
    return `😕 I couldn't find anything.

Try:
• cupcakes accra
• jollof
• phone repair
• ankara dress`
  }

  let msg = `Here are some options 👇\n\n`

  results.forEach((p, i) => {
    const vendor = getVendor(p.vendor_id)

    msg += `*${i + 1}. ${p.name}*\n`
    msg += `💰 ${p.price} • 📍 ${p.location}\n`
    msg += `🏪 ${vendor.name}\n\n`
  })

  msg += `Reply with the number (e.g. *1*) to order.`

  return msg
}
// ================================
// SESSION STORE (tracks order state)
// ================================
const sessions = {}

// ================================
// PROCESS INCOMING MESSAGE
// ================================

// ================================
// PROCESS INCOMING MESSAGE
// ================================

function processMessage(from, message) {
  const text = message.trim().toLowerCase()

  const yesWords = ['yes', 'y', 'ok', 'okay', 'confirm', 'go ahead', 'sure']
  const noWords = ['no', 'n', 'cancel', 'stop']

  // ================================
  // 1. HANDLE ORDER CONFIRMATION
  // ================================
  if (sessions[from] && sessions[from].pendingProduct) {

    if (yesWords.includes(text)) {
      const product = sessions[from].pendingProduct
      const vendor = getVendor(product.vendor_id)

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
      delete sessions[from]

      console.log(`\n🔔 VENDOR NOTIFICATION → ${vendor.name} (${vendor.whatsapp})`)
      console.log(`   New order: ${product.name} from ${from}`)
      console.log(`   Order ID: ${order.id}`)

      return `✅ *Order confirmed!*\n\nOrder ID: *${order.id}*\nProduct: ${product.name}\nVendor: ${vendor.name}\n\nThe vendor will contact you shortly on WhatsApp.\n\n_Thank you for using Orda_ 🙏`
    }

    if (noWords.includes(text)) {
      delete sessions[from]
      return `No problem 👍\n\nSend another search to find something else.`
    }
  }

  // ================================
  // 2. HANDLE NUMBER SELECTION
  // ================================
  if (sessions[from]?.lastResults) {
    const index = parseInt(text)

    if (!isNaN(index)) {
      const product = sessions[from].lastResults[index - 1]

      if (product) {
        const vendor = getVendor(product.vendor_id)

        sessions[from].pendingProduct = product

        return `🛒 *Order Summary*\n\n*${product.name}*\n💰 ${product.price}\n🏪 ${vendor.name}\n📍 ${product.location}\n\nReply *YES* to confirm or *NO* to cancel.`
      } else {
        return `Please choose a valid number from the list.`
      }
    }
  }

  // ================================
  // 3. GREETING
  // ================================
  if (['hi', 'hello', 'hey', 'orda', 'start'].includes(text)) {
    return `👋 Welcome to *Orda*\n\nTell me what you're looking for:\n\nExamples:\n• cupcakes accra\n• phone repair\n• ankara dress`
  }

  // ================================
  // 4. HELP
  // ================================
  if (text === 'help') {
    return `🆘 *How to use Orda*\n\n1. Search: type what you want\n   e.g. cupcakes, jollof, shoes\n\n2. Select: reply with the number (e.g. 1)\n\n3. Confirm: reply YES or NO`
  }

  // ================================
  // 5. SEARCH
  // ================================
  const results = searchProducts(text)

  // Handle no results
  if (!results || results.length === 0) {
    return `😕 I couldn't find anything.\n\nTry:\n• cupcakes accra\n• phone repair\n• jollof`
  }

  // Store results for selection
  sessions[from] = {
    ...sessions[from],
    lastResults: results
  }

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
